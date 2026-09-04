import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUPPORT_EMAIL = "hello@rumbosglobales.com";
const BRAND_NAME = "Rumbos Globales";
const BRAND_URL = "https://rumbosglobales.com/es";
const BRAND_LOGO = "https://rumbosglobales.com/logo-title.png";

// Campos estándar para filtrarlos en la sección de "Campos adicionales"
const STANDARD_FIELDS = ["nombre", "email", "mensaje", "asunto", "locale"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { locale, nombre, email, mensaje, asunto = "Nuevo mensaje de contacto" } = body;

    // Inicializamos traducciones dinámicas con el locale recibido
    const t = await getTranslations({ locale, namespace: "Emails.contact" });

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: t("errorMissingFields") },
        { status: 400 }
      );
    }

    // Extraer de forma dinámica cualquier propiedad extra enviada en el lead
    const extraFields = Object.entries(body).filter(
      ([key, val]) => !STANDARD_FIELDS.includes(key) && val !== undefined && val !== null && val !== ""
    );

    // 1. EMAIL PARA EL NEGOCIO (LEAD DE CONTACTO - FONDO AMARILLO VIVO)
    const businessEmailHtml = renderEmailTemplate({
      title: t("business.title"),
      subtitle: t("business.subtitle"),
      sectionLabel: t("business.sectionLabel"),
      nombre,
      email,
      mensaje,
      extraFields,
      isBusiness: true,
      t,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} Leads <${SUPPORT_EMAIL}>`,
      to: SUPPORT_EMAIL,
      subject: t("business.subject", { asunto, nombre }),
      html: businessEmailHtml,
    });
    await resend.emails.send({
      from: `${BRAND_NAME} Leads <${SUPPORT_EMAIL}>`,
      to: "gretomin@gmail.com",
      subject: t("business.subject", { asunto, nombre }),
      html: businessEmailHtml,
    });
    await resend.emails.send({
      from: `${BRAND_NAME} Leads <${SUPPORT_EMAIL}>`,
      to: "redireccion973@gmail.com",
      subject: t("business.subject", { asunto, nombre }),
      html: businessEmailHtml,
    });

    // 2. EMAIL PARA EL CLIENTE (CONFIRMACIÓN DE RECEPCIÓN - FONDO AMARILLO CÁLIDO)
    const clientEmailHtml = renderEmailTemplate({
      title: t("client.title"),
      subtitle: t("client.subtitle"),
      sectionLabel: t("client.sectionLabel"),
      nombre,
      email,
      mensaje,
      extraFields,
      isBusiness: false,
      t,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
      to: email,
      subject: t("client.subject", { brandName: BRAND_NAME }),
      html: clientEmailHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Error" },
      { status: 500 }
    );
  }
}

function renderEmailTemplate({
  title,
  subtitle,
  sectionLabel,
  nombre,
  email,
  mensaje,
  extraFields,
  isBusiness,
  t,
}: {
  title: string;
  subtitle: string;
  sectionLabel: string;
  nombre: string;
  email: string;
  mensaje: string;
  extraFields: [string, any][];
  isBusiness: boolean;
  t: any;
}) {
  // Configuración de paletas de color con fondo AMARILLO, textos OSCUROS corporativos y detalles en tono profundo
  // Negocio (isBusiness: true)  -> Fondo amarillo vibrante de la web (#fea43a)
  // Cliente (isBusiness: false) -> Fondo amarillo complementario y cálido
  const theme = isBusiness
    ? {
        bodyBg: "#fea43a",         // Fondo general amarillo principal de la marca
        containerBg: "#f99827",    // Contenedor principal amarillo enriquecido
        containerBorder: "#031f3d", // Borde azul marino profundo característico
        headerBg: "#FFFFFF",       // Cabecera limpia
        textColor: "#031f3d",      // Azul marino oscuro para máxima legibilidad
        textMuted: "#263f59",      // Texto secundario contrastado
        cardBg: "#ffffff",         // Tarjeta interna blanca para destacar contenido
        cardBorder: "#031f3d",     // Borde de tarjeta marino
        labelColor: "#0d5757",     // Verde oscuro/azulado de identidad para etiquetas
        accentColor: "#0d5757",    // Acento de contraste
        msgBg: "#ffffff",
        footerBg: "#fea43a",
        footerLink: "#fea43a",
        btnBg: "#031f3d",          // Botón azul marino profundo con texto amarillo
        btnHover: "#0d5757"
      }
    : {
        bodyBg: "#f59e0b",         // Fondo amarillo cálido alternativo
        containerBg: "#fbbf24",    // Contenedor amarillo claro
        containerBorder: "#031f3d", // Borde azul marino profundo
        headerBg: "#FFFFFF",
        textColor: "#031f3d",      // Texto principal azul marino
        textMuted: "#334155",      // Texto secundario legible
        cardBg: "#fffbeb",         // Fondo tarjeta interno crema/amarillo muy suave
        cardBorder: "#031f3d",     // Borde corporativo
        labelColor: "#0d5757",     // Verde oscuro/azulado
        accentColor: "#0d5757",    // Acento enfático
        msgBg: "#fffbeb",
        footerBg: "#f59e0b",
        footerLink: "#fea43a",
        btnBg: "#031f3d",          // Botón azul marino contrastante
        btnHover: "#0d5757"
      };

  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html lang="es">
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
          color: ${theme.labelColor}; 
          margin-bottom: 14px; 
        }
        .card { 
          background-color: ${theme.cardBg}; 
          border-radius: 1rem; 
          border: 2px solid ${theme.cardBorder}; 
          padding: 24px; 
          margin-bottom: 32px; 
        }
        .field { 
          margin-bottom: 18px; 
          border-bottom: 1px dashed ${theme.cardBorder}; 
          padding-bottom: 14px; 
        }
        .field:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
        .label { 
          font-size: 11px; 
          font-weight: 800; 
          text-transform: uppercase; 
          color: ${theme.labelColor}; 
          letter-spacing: 0.05em; 
          margin-bottom: 6px; 
        }
        .value { font-size: 15px; color: ${theme.textColor}; font-weight: 700; }
        .msg-box { 
          font-size: 15px; 
          color: ${theme.textColor}; 
          line-height: 1.6; 
          white-space: pre-wrap; 
          background-color: ${theme.msgBg}; 
          padding: 24px; 
          border-radius: 1rem; 
          border: 2px solid ${theme.cardBorder}; 
          font-weight: 600;
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
        /* Estilos de botones actualizados para la nueva identidad visual */
        .btn-orange { 
          display: inline-block;
          background-color: ${theme.btnBg}; 
          color: ${theme.footerLink} !important; 
          text-decoration: none; 
          font-weight: 900; 
          padding: 14px 28px;
          border-radius: 1rem;
          margin-top: 20px;
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
          
          <!-- Header Logo -->
          <div class="header">
            <img src="${BRAND_LOGO}" alt="${BRAND_NAME}" class="logo" />
          </div>

          <!-- Body Content -->
          <div class="content">
            <h1 class="title">${title}</h1>
            <p class="subtitle">${subtitle}</p>

            <div class="section-label">${sectionLabel}</div>
            
            <div class="card">
              <div class="field">
                <div class="label">${t("fields.name")}</div>
                <div class="value">${nombre}</div>
              </div>
              <div class="field">
                <div class="label">${t("fields.email")}</div>
                <div class="value" style="color: ${theme.accentColor}; font-weight: 900;">${email}</div>
              </div>
              
              <!-- Render Dinámico de Cualquier Campo Adicional (Telefono, Presupuesto, etc.) -->
              ${extraFields.map(([key, value]) => `
                <div class="field">
                  <div class="label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div class="value">${value}</div>
                </div>
              `).join('')}
            </div>

            <div class="section-label">${t("fields.message")}</div>
            <div class="msg-box">${mensaje}</div>

            ${!isBusiness ? `
              <p style="font-size: 13px; color: ${theme.textMuted}; margin-top: 32px; line-height: 1.6; font-style: italic; font-weight: 700;">
                ${t("client.automatedNotice")}
              </p>
            ` : ''}
          </div>

          <!-- Footer Legal -->
          <div class="footer">
            ${t("footer.specialty")}<br/>
            ${t("footer.copyright", { year: currentYear, brandName: BRAND_NAME })
      .replace(BRAND_NAME, `<br/><a href="https://${BRAND_URL}" class="btn-orange">Visitar ${BRAND_NAME}</a>`)}
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}