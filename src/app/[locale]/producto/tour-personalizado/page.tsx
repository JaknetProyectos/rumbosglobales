"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import {
  ArrowRight,
  AlertCircle,
  Loader2,
  DollarSign,
  FileText,
  Compass,
  MapPin,
  Sparkles,
  Ticket,
  Calendar,
  Plane,
  Receipt,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { useTour } from "@/hooks/use-tour";

// Configuración de los íconos flotantes de fondo
const FLOATING_ICONS = [
  { Icon: Compass, top: "10%", left: "8%", size: 42, duration: 6, delay: 0 },
  { Icon: MapPin, top: "22%", right: "12%", size: 36, duration: 7, delay: 1 },
  { Icon: Sparkles, top: "45%", left: "5%", size: 48, duration: 8, delay: 0.5 },
  { Icon: Ticket, top: "65%", right: "8%", size: 40, duration: 6.5, delay: 1.5 },
  { Icon: Calendar, top: "80%", left: "12%", size: 38, duration: 7.5, delay: 2 },
  { Icon: Plane, top: "15%", right: "35%", size: 44, duration: 9, delay: 0.8 },
  { Icon: Receipt, top: "85%", right: "25%", size: 36, duration: 7, delay: 1.2 },
  { Icon: ShieldCheck, top: "50%", right: "3%", size: 32, duration: 6, delay: 2.2 },
];

export default function CustomProductPage() {
  const t = useTranslations("customPlan");
  const router = useRouter();
  const { addItem } = useCart();

  const [quoteNumber, setQuoteNumber] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const { loading, tour } = useTour("tour-personalizado");

  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#031f3d]">
        <Loader2 className="h-10 w-10 animate-spin text-[#fea43a]" />
      </div>
    );
  }

  if (!tour) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalPrice = Number(totalPrice) || 0;

    if (!quoteNumber.trim()) {
      setError(t("errors.quoteRequired"));
      return;
    }

    if (finalPrice <= 0) {
      setError(t("errors.invalidAmount"));
      return;
    }

    setIsAdding(true);

    const folioUpper = quoteNumber.trim().toUpperCase();

    // Nombre del producto concatenado con todos los datos
    const customProductName = `Custom - ${folioUpper}`;
    const customProductDescription = `Custom - ${folioUpper}`;

    addItem(
      {
        ...tour,
        price: Number(finalPrice),
        image: "/logo.png",
        title: customProductName,
        includes: [customProductDescription],
      },
      new Date(),
      1
    );

    setTimeout(() => {
      setIsAdding(false);
      router.push("/carrito");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031f3d] pb-32 text-white selection:bg-[#fea43a]/30 selection:text-white">
      {/* Halos radiales decorativos de fondo */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#0d5757]/40 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-[600px] w-[600px] rounded-full bg-[#fea43a]/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#0d5757]/30 blur-[100px]" />

      {/* Íconos Flotantes Animados */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {FLOATING_ICONS.map((item, index) => {
          const IconComponent = item.Icon;
          return (
            <motion.div
              key={index}
              className="absolute text-white/15"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 8, -8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
            >
              <IconComponent size={item.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      <main className="relative z-10 mx-auto max-w-4xl px-4 pt-28 lg:pt-36">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border-2 border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md lg:p-12"
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-sm">
                {t("hero.titleHighlight")}{" "}
                <span className="text-[#fea43a]">{t("hero.titleMain")}</span>
              </h1>

              <h2 className="pt-2 font-display text-lg font-medium text-sky-100 sm:text-xl">
                {t("hero.subtitle")}
              </h2>

              <p className="mx-auto max-w-xl text-sm leading-relaxed text-sky-100/90 sm:text-base">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Sección del Formulario (Fondo Amarillo #fea43a) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8"
        >
          <div className="relative overflow-hidden rounded-3xl bg-[#fea43a] p-6 text-[#031f3d] shadow-2xl sm:p-10 lg:p-12">
            

            <div className="relative z-10 w-full">
              <div className="mb-8 text-center sm:text-left">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#0d5757]">
                  {t("form.badge")}
                </span>

                <h2 className="font-display text-2xl font-black tracking-tight text-[#031f3d] sm:text-3xl">
                  {t("form.title")}
                </h2>

                <p className="mt-2 text-sm leading-relaxed font-semibold text-[#031f3d]/80">
                  {t("authorized.description")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 rounded-2xl border-2 border-red-600 bg-red-100 p-4 text-sm font-bold text-red-900 shadow-md"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Input Folio/Cotización */}
                <div className="space-y-2">
                  <label
                    htmlFor="quoteNumber"
                    className="flex items-center gap-2 pl-1 text-[11px] font-black uppercase tracking-widest text-[#031f3d]"
                  >
                    <FileText className="h-4 w-4 text-[#0d5757]" />
                    {t("form.quoteLabel")}
                  </label>
                  <input
                    id="quoteNumber"
                    type="text"
                    required
                    placeholder={t("form.quotePlaceholder")}
                    value={quoteNumber}
                    onChange={(e) => setQuoteNumber(e.target.value)}
                    className="h-14 w-full rounded-2xl border-2 border-[#031f3d] bg-white px-5 text-sm font-bold uppercase tracking-wider text-[#031f3d] outline-none transition-all placeholder:text-zinc-400 focus:border-[#0d5757] focus:ring-2 focus:ring-[#0d5757]/30"
                  />
                </div>

                {/* Input Monto total */}
                <div className="space-y-2">
                  <label
                    htmlFor="totalPrice"
                    className="flex items-center gap-2 pl-1 text-[11px] font-black uppercase tracking-widest text-[#031f3d]"
                  >
                    <DollarSign className="h-4 w-4 text-[#0d5757]" />
                    {t("form.amountLabel")}
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-[#031f3d]">
                      <DollarSign className="h-5 w-5 stroke-[2.5]" />
                    </div>

                    <input
                      id="totalPrice"
                      type="number"
                      required
                      step="0.01"
                      min="0.01"
                      placeholder={t("form.amountPlaceholder")}
                      value={totalPrice}
                      onChange={(e) =>
                        setTotalPrice(
                          e.target.value !== "" ? Number(e.target.value) : ""
                        )
                      }
                      className="h-14 w-full rounded-2xl border-2 border-[#031f3d] bg-white pl-12 pr-16 text-base font-bold text-[#031f3d] outline-none transition-all placeholder:text-zinc-400 focus:border-[#0d5757] focus:ring-2 focus:ring-[#0d5757]/30"
                    />

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                      <span className="text-xs font-black tracking-wider text-[#031f3d]/70">
                        MXN
                      </span>
                    </div>
                  </div>

                  <p className="pl-1 text-[11px] font-semibold text-[#031f3d]/80">
                    {t("form.taxNote")}
                  </p>
                </div>

                {/* Botón de envío */}
                <div className="pt-4">
                  <motion.button
                    whileTap={!isAdding ? { scale: 0.98 } : {}}
                    whileHover={!isAdding ? { scale: 1.01 } : {}}
                    type="submit"
                    disabled={isAdding}
                    className={[
                      "group flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-xs font-black uppercase tracking-wider text-white transition-all duration-300 shadow-xl border-2 border-[#031f3d]",
                      isAdding
                        ? "cursor-not-allowed bg-[#031f3d]/60 text-white/50"
                        : "bg-[#031f3d] hover:bg-[#083361] shadow-[#031f3d]/30",
                    ].join(" ")}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#fea43a]" />
                        <span>{t("buttons.adding")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t("buttons.addToCart")}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}