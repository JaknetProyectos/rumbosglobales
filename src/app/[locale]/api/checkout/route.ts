import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { formatPrice } from "@/lib/format-price";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUPPORT_EMAIL = "hello@rumbosglobales.com";
const BRAND_NAME = "Rumbos Globales";
const BRAND_URL = "https://rumbosglobales.com/es";
const BRAND_LOGO = "https://rumbosglobales.com/logo-title.png";

// 1. Interfaces para tipado estricto
interface Customer {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  direccion2?: string;
  ciudad: string;
  estado: string;
  cp: string;
  pais: string;
  empresa?: string;
}

interface OrderItem {
  product: {
    title: string;
    price: number | string;
  };
  people?: number;
}

interface CheckoutBody {
  locale: string;
  orderId: string;
  amount: number;
  customer: Customer;
  items: OrderItem[];
  metadata?: Record<string, any>;
}

interface TemplateProps {
  title: string;
  subtitle: string;
  orderId: string;
  amount: number;
  locale: string;
  customer: Customer;
  items: OrderItem[];
  metadata?: Record<string, any>;
  isBusiness: boolean;
  t: any; // Instancia de next-intl
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutBody;
    const { locale, orderId, amount, customer, items, metadata } = body;

    // Inicializamos traducciones dinámicas con el locale recibido
    const t = await getTranslations({ locale, namespace: "Emails.checkout" });

    if (!orderId || !amount || !customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: t("errorMissingFields") },
        { status: 400 }
      );
    }

    const formattedAmount = amount.toFixed(2);

    // 1. EMAIL PARA EL CLIENTE (TICKET DE COMPRA - FONDO VERDE)
    const clientReceiptHtml = renderReceiptTemplate({
      title: t("client.title"),
      subtitle: t("client.subtitle", { orderId }),
      orderId,
      amount,
      customer,
      items,
      metadata,
      isBusiness: false,
      t,
      locale
    });

    await resend.emails.send({
      from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
      to: customer.email,
      subject: t("client.subject", { orderId, brandName: BRAND_NAME }),
      html: clientReceiptHtml,
    });

    // 2. EMAIL PARA EL NEGOCIO (NOTIFICACIÓN DE VENTA - FONDO AMARILLO)
    const businessNotificationHtml = renderReceiptTemplate({
      title: t("business.title"),
      subtitle: t("business.subtitle", { amount: formattedAmount }),
      orderId,
      amount,
      customer,
      items,
      metadata,
      isBusiness: true,
      t,
      locale
    });

    await resend.emails.send({
      from: `${BRAND_NAME} Sales <${SUPPORT_EMAIL}>`,
      to: SUPPORT_EMAIL,
      subject: t("business.subject", { orderId }),
      html: businessNotificationHtml,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} Sales <${SUPPORT_EMAIL}>`,
      to: "gretomin@gmail.com",
      subject: t("business.subject", { orderId }),
      html: businessNotificationHtml,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} Sales <${SUPPORT_EMAIL}>`,
      to: "redireccion973@gmail.com",
      subject: t("business.subject", { orderId }),
      html: businessNotificationHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[CHECKOUT_EMAIL_ERROR]:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Función helper para generar el HTML del ticket
function renderReceiptTemplate({
  title,
  subtitle,
  orderId,
  amount,
  customer,
  items,
  metadata,
  isBusiness,
  locale,
  t,
}: TemplateProps): string {
  // Configuración de paletas de color alineadas con la identidad del sitio
  // Negocio (isBusiness: true)  -> Fondo amarillo vibrante (#fea43a)
  // Cliente (isBusiness: false) -> Fondo verde corporativo (#0d5757)
  const theme = isBusiness
    ? {
      bodyBg: "#fea43a",         // Fondo general amarillo principal
      containerBg: "#f99827",    // Contenedor principal amarillo enriquecido
      containerBorder: "#031f3d", // Borde azul marino profundo
      headerBg: "#ffffff",       // Cabecera limpia
      textColor: "#031f3d",      // Texto principal azul marino oscuro
      textMuted: "#263f59",      // Texto secundario contrastado
      cardBg: "#ffffff",         // Tarjeta interna blanca para destacar contenido
      cardBorder: "#031f3d",     // Borde de tarjeta marino
      dashedBorder: "#031f3d",

      labelColor: "#0d5757",     // Verde de la marca para etiquetas
      accentColor: "#0d5757",    // Verde acento

      totalLabelColor: "#031f3d",
      totalAmountColor: "#0d5757",

      badgeBg: "#fea43a",
      badgeText: "#031f3d",

      footerBg: "#fea43a",
      footerLink: "#031f3d",
      btnBg: "#031f3d"
    }
    : {
      bodyBg: "#0d5757",         // Fondo verde principal de la web
      containerBg: "#0b4848",    // Contenedor verde profundo
      containerBorder: "#031f3d", // Borde azul marino profundo
      headerBg: "#ffffff",       // Cabecera limpia
      textColor: "#ffffff",      // Texto principal blanco
      textMuted: "#b2dfdb",      // Texto secundario verde claro
      cardBg: "#fea43a",         // Tarjetas amarillas destacadas dentro del fondo verde
      cardBorder: "#031f3d",     // Borde estructurado
      dashedBorder: "#031f3d",

      labelColor: "#031f3d",     // Texto azul marino dentro de las tarjetas amarillas
      accentColor: "#031f3d",

      totalLabelColor: "#031f3d",
      totalAmountColor: "#031f3d",

      badgeBg: "#031f3d",
      badgeText: "#fea43a",

      footerBg: "#0d5757",
      footerLink: "#fea43a",
      btnBg: "#fea43a"
    };

  const currentYear = new Date().getFullYear();
  const localeFormat = locale === "en" ? "en-US" : "es-MX";
  const formattedDate = new Date().toLocaleDateString(localeFormat, {
    timeZone: "America/Mexico_City"
  });

  return `
    <!DOCTYPE html>
    <html lang="${locale || "es"}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { 
          font-family: 'Courier New', Courier, monospace; 
          background-color: ${theme.bodyBg}; 
          color: ${theme.textColor}; 
          margin: 0; 
          padding: 0; 
          -webkit-font-smoothing: antialiased; 
        }
        .wrapper { max-width: 640px; margin: 32px auto; padding: 16px; }
        .container { 
          background-color: ${theme.containerBg}; 
          border: 4px solid ${theme.containerBorder}; 
          border-radius: 2rem; 
          overflow: hidden; 
          box-shadow: 0 20px 25px -5px rgba(3, 31, 61, 0.25); 
        }
        .header { 
          padding: 28px 24px 20px 24px; 
          text-align: center; 
          border-bottom: 2px solid ${theme.containerBorder}; 
          background-color: ${theme.headerBg}; 
        }
        .logo { 
          height: 40px; 
          width: auto; 
          object-fit: contain; 
        }
        .content { padding: 40px 32px; }
        .title { font-size: 26px; font-weight: 900; color: ${theme.textColor}; margin: 0 0 10px 0; letter-spacing: -0.01em; }
        .subtitle { font-size: 15px; color: ${theme.textMuted}; margin: 0 0 32px 0; line-height: 1.5; font-weight: 600; }
        .section-label { 
          font-size: 12px; 
          font-weight: 900; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          color: ${isBusiness ? theme.labelColor : '#fea43a'}; 
          margin-bottom: 14px; 
        }
        
        .info-card {
          background-color: ${theme.cardBg};
          border: 2px solid ${theme.cardBorder};
          border-radius: 1rem;
          padding: 24px;
          margin-bottom: 28px;
        }

        .ticket-box { 
          background-color: ${theme.cardBg}; 
          border-radius: 1rem; 
          border: 2px solid ${theme.cardBorder}; 
          padding: 24px; 
          margin-bottom: 32px; 
        }
        .ticket-row { 
          display: table; 
          width: 100%; 
          margin-bottom: 14px; 
          padding-bottom: 14px; 
          border-bottom: 1px dashed ${theme.dashedBorder}; 
        }
        .ticket-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .item-name { display: table-cell; font-size: 15px; color: ${isBusiness ? theme.textColor : '#031f3d'}; font-weight: 700; }
        .item-qty { 
          display: inline-block;
          font-size: 11px; 
          font-weight: 900;
          color: ${theme.badgeText}; 
          background-color: ${theme.badgeBg};
          padding: 3px 10px;
          border-radius: 999px;
          margin-left: 8px; 
          border: 1px solid ${theme.cardBorder};
        }
        .item-price { display: table-cell; text-align: right; font-size: 15px; color: ${isBusiness ? theme.textColor : '#031f3d'}; font-weight: 800; }
        
        .total-box { 
          margin-top: 20px; 
          padding-top: 18px; 
          border-top: 2px solid ${theme.containerBorder}; 
        }
        .total-label { font-size: 15px; font-weight: 900; color: ${theme.totalLabelColor}; text-transform: uppercase; letter-spacing: 0.05em; }
        .total-amount { font-size: 24px; font-weight: 900; color: ${theme.totalAmountColor}; text-align: right; }
        
        .grid { display: table; width: 100%; table-layout: fixed; }
        .col { display: table-cell; width: 50%; vertical-align: top; }
        .info-label { 
          font-size: 11px; 
          font-weight: 800; 
          text-transform: uppercase; 
          color: ${theme.labelColor}; 
          letter-spacing: 0.05em; 
          margin-bottom: 6px; 
        }
        .info-value { font-size: 14px; color: ${isBusiness ? theme.textColor : '#031f3d'}; line-height: 1.5; padding-right: 12px; font-weight: 600; }
        
        .meta-box { 
          font-size: 14px; 
          font-weight: 600;
          color: ${isBusiness ? theme.textColor : '#031f3d'}; 
          background-color: ${theme.cardBg}; 
          padding: 20px 24px; 
          border-radius: 1rem; 
          border: 2px solid ${theme.cardBorder};
          margin-bottom: 32px; 
        }
        .footer { 
          text-align: center; 
          padding: 36px 24px; 
          font-size: 13px; 
          font-weight: 700;
          color: ${theme.textColor}; 
          border-top: 2px solid ${theme.containerBorder}; 
          background-color: ${theme.footerBg}; 
        }
        .footer a { 
          display: inline-block;
          background-color: ${theme.btnBg}; 
          color: ${theme.footerLink} !important; 
          text-decoration: none; 
          font-weight: 900; 
          padding: 12px 24px;
          border-radius: 1rem;
          margin-top: 16px;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
          box-shadow: 0 10px 15px -3px rgba(3, 31, 61, 0.3);
          border: 2px solid ${theme.containerBorder};
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          
          <div class="header">
            <img src="${BRAND_LOGO}" alt="${BRAND_NAME}" class="logo" />
          </div>

          <div class="content">
            <h1 class="title">${title}</h1>
            <p class="subtitle">${subtitle}</p>

            <div class="info-card">
              <div class="grid">
                <div class="col">
                  <div class="info-label">${t("labels.orderId")}</div>
                  <div class="info-value" style="font-size: 15px; font-weight: 900; color: ${theme.accentColor};">${orderId}</div>
                </div>
                <div class="col">
                  <div class="info-label">${t("labels.paymentDate")}</div>
                  <div class="info-value">${formattedDate}</div>
                </div>
              </div>
            </div>

            <div class="section-label">${isBusiness ? t("labels.buyerInfo") : t("labels.billingDetails")}</div>
            <div class="info-card">
              <div class="grid">
                <div class="col">
                  <div class="info-label">${t("labels.customer")}</div>
                  <div class="info-value">
                    <strong>${customer.nombre} ${customer.apellido}</strong><br/>
                    ${customer.email}<br/>
                    ${customer.telefono}
                  </div>
                </div>
                <div class="col">
                  <div class="info-label">${t("labels.address")}</div>
                  <div class="info-value">
                    ${customer.direccion}<br/>
                    ${customer.direccion2 ? customer.direccion2 + '<br/>' : ''}
                    ${customer.ciudad}, ${customer.estado}<br/>
                    CP: ${customer.cp}, ${customer.pais}
                    ${customer.empresa ? `<br/><strong>${t("labels.company")}:</strong> ` + customer.empresa : ''}
                  </div>
                </div>
              </div>
            </div>

            ${metadata && Object.keys(metadata).length > 0 ? `
              <div class="section-label">${t("labels.operationDetails")}</div>
              <div class="meta-box">
                ${metadata.notes || JSON.stringify(metadata)}
              </div>
            ` : ''}

            <div class="section-label">${t("labels.modulesSummary")}</div>
            <div class="ticket-box">
              ${items.map((item) => {
    const itemPrice = Number(item.product.price) || 0;
    const qty = item.people || 1;
    const totalLine = (itemPrice * qty);

    return `
                <div class="ticket-row">
                  <div class="item-name">
                    ${item.product.title}
                    <span class="item-qty">x${qty}</span>
                  </div>
                  <div class="item-price">
                    $${formatPrice(Number(totalLine))} MXN
                  </div>
                </div>
              `}).join('')}
              
              <div class="ticket-row total-box">
                <div class="item-name total-label">${t("labels.totalPaid")}</div>
                <div class="item-price total-amount">$${formatPrice(amount)} MXN</div>
              </div>
            </div>

          </div>

          <div class="footer">
            ${t("footer.specialty")}<br/>
            ${t("footer.copyright", { year: currentYear, brandName: BRAND_NAME }).replace(BRAND_NAME, `<a href="${BRAND_URL}">${BRAND_NAME}</a>`)}
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}