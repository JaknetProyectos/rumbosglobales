"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronLeft,
  CreditCard, User, MapPin, CheckCircle2, AlertTriangle, Loader2,
  Plane, Map as MapIcon, Camera, Compass, Palmtree, Ticket
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/hooks/use-cart";
import { processOctanoPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/format";
import { useTours } from "@/hooks/use-tours";

const VALID_COUPONS = [
  { code: "VEX10", discount: 0.1 },
  { code: "VEX15", discount: 0.15 },
  { code: "VEXPRO20", discount: 0.2 },
];

const BACK_CATALOG_LINK = "/tienda";
type Step = 1 | 2 | 3;

// Animaciones de fondo restauradas
const customStyles = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes float-medium {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-5deg); }
  }
  @keyframes float-fast {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(10deg); }
  }
  .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
  .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
  .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
`;

function FloatingIconsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex justify-center items-center">
      <Plane className="absolute top-[10%] left-[10%] text-white/5 h-24 w-24 animate-float-slow" />
      <MapIcon className="absolute top-[20%] right-[15%] text-white/5 h-32 w-32 animate-float-medium" />
      <Camera className="absolute bottom-[20%] left-[15%] text-white/5 h-20 w-20 animate-float-fast" />
      <Compass className="absolute top-[50%] left-[5%] text-white/5 h-28 w-28 animate-spin-slow" />
      <Ticket className="absolute bottom-[30%] right-[10%] text-white/5 h-24 w-24 animate-float-slow" />
      <Palmtree className="absolute top-[40%] right-[5%] text-white/5 h-40 w-40 animate-float-medium" />
    </div>
  );
}

export default function CarritoCheckoutPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();
  const { tours, loading } = useTours();
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "", apellido: "", email: "", telefono: "", empresa: "",
    direccion: "", direccion2: "", ciudad: "", estado: "", cp: "", pais: "MX",
    cardNumber: "", cardName: "", cardMonth: "", cardYear: "", cardCvv: "",
  });

  const discountAmount = appliedCoupon ? total * appliedCoupon.discount : 0;
  const totalWithDiscount = total - discountAmount;
  const iva = totalWithDiscount * 0.16;
  const grandTotal = totalWithDiscount + iva;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const found = VALID_COUPONS.find((c) => c.code === couponInput.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      setCouponInput("");
      return;
    }
    setCouponError(t("financial.couponInvalid"));
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    const uniqueOrderId = `MC-${Date.now()}`;
    const paymentPayload = {
      amount: Number(grandTotal.toFixed(2)),
      orderId: uniqueOrderId,
      cardData: {
        number: formData.cardNumber.replace(/\s/g, ""),
        name: formData.cardName.trim(),
        month: formData.cardMonth.padStart(2, "0"),
        year: formData.cardYear.trim(),
        cvv: formData.cardCvv.trim(),
      },
      customer: {
        nombre: formData.nombre.trim(), apellido: formData.apellido.trim(),
        email: formData.email.trim(), telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(), direccion2: formData.direccion2.trim() || undefined,
        ciudad: formData.ciudad.trim(), estado: formData.estado.trim(),
        pais: formData.pais, cp: formData.cp.trim(), empresa: formData.empresa.trim() || undefined,
      },
      metadata: {
        notes: appliedCoupon ? `${t("metadata.couponApplied")}: ${appliedCoupon.code}` : t("metadata.standardSale"),
      },
    };

    try {
      const response = await processOctanoPayment(paymentPayload);
      if (response.success) {
        setSuccessData(response.data);
        try {
          await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: uniqueOrderId, amount: paymentPayload.amount, customer: paymentPayload.customer,
              items, metadata: paymentPayload.metadata, locale,
            }),
          });
        } catch (emailError) {
          console.error("Error: Falló el despacho de correos informativos:", emailError);
        }
        clearCart();
        setStep(3);
      } else {
        setErrorMessage(response.error || t("errors.declined"));
      }
    } catch (err) {
      setErrorMessage(t("errors.connection"));
    } finally {
      setIsProcessing(false);
    }
  };

  // Función simplificada para inputs sin requerir componente externo
  const renderInput = (label: string, name: string, type = "text", req = false, extraClass = "", max?: number) => (
    <div className={extraClass}>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#031f3d]">{label}</label>
      <input
        type={type} name={name} required={req} maxLength={max}
        value={formData[name as keyof typeof formData]} onChange={handleInputChange}
        className="w-full rounded-xl border-2 border-[#0d5757]/10 bg-white/70 px-4 py-3 text-sm font-semibold text-[#031f3d] outline-none transition-colors focus:bg-white focus:border-[#0d5757]"
      />
    </div>
  );

  if (step === 3) {
    return (
      <div className="min-h-screen pt-20 bg-[#0d5757] relative overflow-hidden flex flex-col justify-center items-center px-4">
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />
        <FloatingIconsBackground />

        <div className="relative z-10 w-full max-w-xl rounded-[2rem] bg-[#fea43a] p-10 text-center shadow-2xl shadow-black/20 border-4 border-[#031f3d]">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#031f3d] text-[#fea43a] shadow-lg">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-black text-[#031f3d]">{t("success.title")}</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm font-medium text-[#031f3d]/80">{t("success.description")}</p>

          <div className="mt-8 rounded-2xl bg-white/50 p-5 text-left border-2 border-[#031f3d]/10">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-[#031f3d]">{t("success.transactionStatus")}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0d5757] px-3 py-1 text-xs font-extrabold text-white">
                <CheckCircle2 className="h-3.5 w-3.5" /> {t("success.approved")}
              </span>
            </div>
          </div>

          <Link href={BACK_CATALOG_LINK} className="mt-8 block">
            <button className="w-full flex justify-center items-center gap-2 rounded-2xl bg-[#031f3d] py-4 text-sm font-extrabold text-[#fea43a] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95">
              {t("success.backToCatalog")} <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-[#0d5757] relative overflow-hidden text-white pb-24 selection:bg-[#fea43a] selection:text-[#031f3d]">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <FloatingIconsBackground />

      {/* Breadcrumbs */}
      <div className="sticky top-0 z-40 bg-[#0d5757]/90 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <nav className="flex items-center gap-2 text-xs font-semibold text-white/60">
            <Link href="/" className="hover:text-white transition-colors">{t("breadcrumb.home")}</Link>
            <span>/</span>
            <span className={step === 1 ? "font-bold text-[#fea43a]" : "hover:text-white transition-colors"}>{t("breadcrumb.summary")}</span>
            <span>/</span>
            <span className={step === 2 ? "font-bold text-[#fea43a]" : ""}>{t("breadcrumb.shippingPayment")}</span>
          </nav>
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6">
        {items.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-[2rem] bg-[#fea43a] p-12 text-center text-[#031f3d] shadow-2xl border-4 border-[#031f3d]">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#031f3d]/10 text-[#031f3d]">
              <ShoppingBag className="h-12 w-12" />
            </div>
            <h2 className="text-2xl font-black">{t("empty.title")}</h2>
            <p className="mt-3 text-sm font-medium opacity-80">{t("empty.description")}</p>
            <Link href={BACK_CATALOG_LINK} className="mt-8 block">
              <button className="w-full rounded-2xl bg-[#031f3d] py-4 text-sm font-extrabold text-[#fea43a] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95">
                {t("empty.goToStore")}
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {errorMessage && (
              <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700 shadow-lg">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
              {/* Columna Izquierda: Carrito o Formulario */}
              {step === 1 ? (
                <div className="rounded-[2rem] bg-[#fea43a] p-6 sm:p-8 text-[#031f3d] shadow-2xl border-4 border-[#031f3d]">
                  <div className="flex items-center justify-between border-b border-[#031f3d]/20 pb-5">
                    <h2 className="text-sm font-extrabold uppercase tracking-widest">{t("order.title")}</h2>
                    <button onClick={clearCart} className="flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-200">
                      <Trash2 className="h-3.5 w-3.5" /> {t("order.clear")}
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    {!loading && items.map((item) => {
                      const displayProduct = tours.find((p) => p.id === item.product.id) || item.product;
                      return (
                        <div key={displayProduct.id} className="flex gap-5 rounded-2xl border-2 border-[#031f3d]/10 bg-white/60 p-4 transition-colors hover:bg-white">
                          <div className="relative aspect-square w-24 overflow-hidden rounded-xl border border-[#0d5757]/10 bg-white p-1">
                            <Image src={displayProduct.image || "/logo.png"} alt={displayProduct.title} fill className="object-cover rounded-lg" />
                          </div>

                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-extrabold text-[#031f3d] line-clamp-2">{displayProduct.title}</h3>
                              <button onClick={() => removeItem(displayProduct.id)} className="rounded-xl p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="flex items-end justify-between">
                              <div className="flex items-center rounded-lg border border-[#0d5757]/20 bg-white p-1 shadow-sm">
                                <button onClick={() => updateQuantity(displayProduct.id, item.quantity - 1)} className="rounded-md p-1.5 hover:bg-gray-100"><Minus className="h-3.5 w-3.5" /></button>
                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                <button onClick={() => updateQuantity(displayProduct.id, item.quantity + 1)} className="rounded-md p-1.5 hover:bg-gray-100"><Plus className="h-3.5 w-3.5" /></button>
                              </div>
                              <span className="text-lg font-black">{formatPrice(displayProduct.price * item.quantity)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-8">
                  <div className="rounded-[2rem] bg-[#fea43a] p-6 sm:p-8 text-[#031f3d] shadow-2xl border-4 border-[#031f3d]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#031f3d] text-[#fea43a] shadow-inner">
                        <User className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-extrabold uppercase tracking-widest">{t("form.buyerTitle")}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {renderInput(t("form.firstName"), "nombre", "text", true)}
                      {renderInput(t("form.lastName"), "apellido", "text", true)}
                      {renderInput(t("form.email"), "email", "email", true)}
                      {renderInput(t("form.phone"), "telefono", "tel", true)}
                      {renderInput(t("form.company"), "empresa", "text", false, "sm:col-span-2")}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#fea43a] p-6 sm:p-8 text-[#031f3d] shadow-2xl border-4 border-[#031f3d]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#031f3d] text-[#fea43a] shadow-inner">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-extrabold uppercase tracking-widest">{t("form.addressTitle")}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {renderInput(t("form.streetAddress"), "direccion", "text", true, "sm:col-span-2")}
                      {renderInput(t("form.neighborhood"), "direccion2", "text", false, "sm:col-span-2")}
                      {renderInput(t("form.city"), "ciudad", "text", true)}
                      {renderInput(t("form.state"), "estado", "text", true)}
                      {renderInput(t("form.postalCode"), "cp", "text", true)}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#fea43a] p-6 sm:p-8 text-[#031f3d] shadow-2xl border-4 border-[#031f3d]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#031f3d] text-[#fea43a] shadow-inner">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-extrabold uppercase tracking-widest">{t("form.paymentTitle")}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
                      {renderInput(t("form.cardNumber"), "cardNumber", "text", true, "sm:col-span-6", 16)}
                      {renderInput(t("form.cardHolderName"), "cardName", "text", true, "sm:col-span-6")}
                      {renderInput(t("form.expiryMonth"), "cardMonth", "text", true, "sm:col-span-2", 2)}
                      {renderInput(t("form.expiryYear"), "cardYear", "text", true, "sm:col-span-2", 2)}
                      {renderInput(t("form.cvv"), "cardCvv", "password", true, "sm:col-span-2", 4)}
                    </div>
                  </div>
                </form>
              )}

              {/* Columna Derecha: Sidebar Financiero */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="rounded-[2rem] bg-[#fea43a] p-6 sm:p-8 text-[#031f3d] shadow-2xl border-4 border-[#031f3d]">
                  <h2 className="text-sm font-extrabold uppercase tracking-widest border-b border-[#031f3d]/20 pb-5">
                    {t("financial.title")}
                  </h2>

                  {/* Plugin de Pago Restaurado */}
                  <div className="mt-6 flex items-center justify-center rounded-2xl border-2 border-[#031f3d]/10 bg-white/60 p-4">
                    <Image src="/octano.png" alt={t("images.securePaymentAlt")} width={140} height={20} className="object-contain" />
                  </div>

                  {step === 1 && (
                    <div className="mt-6">
                      {!appliedCoupon ? (
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                          <input type="text" placeholder={t("financial.couponPlaceholder")} value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="w-full rounded-xl border-2 border-[#0d5757]/10 bg-white/70 px-4 py-2 text-sm font-semibold uppercase outline-none focus:border-[#0d5757]" />
                          <button type="submit" className="rounded-xl bg-[#031f3d] px-5 text-xs font-bold text-[#fea43a] transition hover:bg-[#0d5757] active:scale-95">
                            Aplicar
                          </button>
                        </form>
                      ) : (
                        <div className="flex justify-between items-center rounded-xl bg-emerald-50 p-3 border-2 border-emerald-200">
                          <span className="text-xs font-bold text-emerald-700">{appliedCoupon.code} (-{appliedCoupon.discount * 100}%)</span>
                          <button onClick={() => setAppliedCoupon(null)} className="rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-red-600 shadow-sm hover:bg-red-50">
                            Eliminar
                          </button>
                        </div>
                      )}
                      {couponError && <p className="mt-2 text-[11px] font-bold text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">{couponError}</p>}
                    </div>
                  )}

                  <div className="mt-6 space-y-3 rounded-2xl border-2 border-[#031f3d]/10 bg-white/60 p-5 text-sm font-medium">
                    <div className="flex justify-between">
                      <span>{t("financial.subtotal")}</span>
                      <span className="font-bold">{formatPrice(total)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600">
                        <span>{t("financial.discount")}</span>
                        <span className="font-bold">-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 rounded-2xl bg-[#031f3d] p-6 text-white relative overflow-hidden shadow-lg border-2 border-[#0d5757]">
                    <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-[#fea43a]/20 blur-2xl"></div>
                    <div className="flex justify-between items-baseline relative z-10">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#fea43a]">{t("financial.netTotal")}</span>
                      <span className="text-3xl font-black text-[#fea43a]">{formatPrice(grandTotal)}</span>
                    </div>
                    <p className="mt-2 text-right text-[11px] font-semibold opacity-70 relative z-10">{t("financial.tax", { tax: formatPrice(iva) })}</p>
                  </div>

                  {step === 1 ? (
                    <button onClick={() => setStep(2)} className="mt-6 flex w-full justify-center items-center gap-2 rounded-2xl bg-[#031f3d] py-4 text-sm font-extrabold text-[#fea43a] shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
                      {t("actions.proceedToPayment")} <ArrowRight className="h-5 w-5" />
                    </button>
                  ) : (
                    <div className="mt-6 space-y-4">
                      <button type="submit" form="checkout-form" disabled={isProcessing} className="flex w-full justify-center items-center gap-2 rounded-2xl bg-[#031f3d] py-4 text-sm font-extrabold text-[#fea43a] shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0">
                        {isProcessing ? (
                          <span className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> {t("actions.processing")}</span>
                        ) : (
                          t("actions.payAmount", { amount: formatPrice(grandTotal) })
                        )}
                      </button>
                      <button type="button" disabled={isProcessing} onClick={() => setStep(1)} className="flex w-full justify-center items-center gap-1.5 py-3 text-xs font-bold text-[#031f3d]/70 transition-colors hover:bg-white/50 hover:text-[#031f3d] rounded-xl">
                        <ChevronLeft className="h-4 w-4" /> {t("actions.backToCart")}
                      </button>
                    </div>
                  )}

                  {/* Imagen de Pago Seguro Restaurada */}
                  <div className="mt-6 border-t border-[#031f3d]/20 pt-5 text-center">
                    <p className="text-[11px] font-semibold text-[#031f3d]/70">
                      {t("security.note")}
                    </p>
                    <div className="mt-3 flex items-center justify-center opacity-80 transition-opacity hover:opacity-100">
                      <Image src="/secure-payment.png" alt={t("images.securePaymentAlt")} width={100} height={20} className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}