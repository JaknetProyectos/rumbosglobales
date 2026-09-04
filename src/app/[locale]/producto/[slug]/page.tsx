"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  Calendar,
  Users,
  ShoppingCart,
  Check,
  ArrowLeft,
  Compass,
  AlertTriangle,
  RefreshCw,
  Minus,
  Plus,
  Info,
  ChevronRight
} from "lucide-react";

import { useTour } from "@/hooks/use-tour";
import { useTours } from "@/hooks/use-tours";
import { useCart } from "@/hooks/use-cart";

export default function TourDetailPage() {
  const t = useTranslations("tourDetailPage");
  const locale = useLocale();
  const params = useParams();
  const slug = params?.slug as string;

  // 1. Hook para obtener el tour actual dinámicamente según el idioma
  const { tour, loading, error, notFound, refetch } = useTour(slug, locale as "es" | "en");

  // 2. Hook de carrito
  const { addItem } = useCart();

  // 3. Estados locales para la reservación
  const todayISO = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);
  const [people, setPeople] = useState<number>(2);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // 4. Hook para obtener tours relacionados
  const { tours: relatedCandidates, loading: loadingRelated } = useTours({
    lang: locale as "es" | "en",
    limit: 4,
    filters: {
      state: tour?.state,
    },
  });

  // Filtramos el tour actual si aparece entre los relacionados
  const relatedTours = relatedCandidates
    .filter((item) => item.id !== tour?.id)
    .slice(0, 3);

  // Manejador para agregar al carrito
  const handleAddToCart = () => {
    if (!tour || !selectedDate) return;

    // Corrección de zona horaria para evitar que la fecha cambie de día
    const [year, month, day] = selectedDate.split("-").map(Number);
    const reservationDate = new Date(year, month - 1, day, 12, 0, 0);

    addItem(tour, reservationDate, people, 1);

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3500);
  };

  // ESTADO DE CARGA PRINCIPAL
  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-[#fea43a] flex flex-col justify-center items-center gap-4 p-6">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-4 border-[#031f3d]/20 border-t-[#0d5757] animate-spin" />
          <Compass className="h-7 w-7 text-[#031f3d] absolute animate-pulse" />
        </div>
        <p className="text-sm font-black text-[#031f3d] tracking-wide animate-pulse">{t("states.loading")}</p>
      </div>
    );
  }

  // ESTADO DE ERROR: NO ENCONTRADO
  if (notFound) {
    return (
      <div className="min-h-screen  pt-24 bg-[#fea43a] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-white p-8 md:p-12 rounded-[2rem] border-2 border-[#031f3d] shadow-2xl max-w-md w-full flex flex-col items-center space-y-5">
          <div className="h-20 w-20 rounded-2xl bg-[#0d5757] flex items-center justify-center text-[#fea43a] border-2 border-[#031f3d]">
            <Compass className="h-10 w-10 animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-black text-[#031f3d] tracking-tight">{t("states.notFoundTitle")}</h1>
          <p className="text-sm font-semibold text-[#031f3d]/80 leading-relaxed">
            {t("states.notFoundDescription")}
          </p>
          <Link
            className="w-full py-4 bg-[#0d5757] hover:bg-[#0b4848] text-white font-extrabold rounded-2xl shadow-xl transition-all active:scale-95 text-center text-sm border-2 border-[#031f3d]"
            href="/producto"
          >
            {t("states.exploreOtherTours")}
          </Link>
        </div>
      </div>
    );
  }

  // ESTADO DE ERROR TÉCNICO
  if (error || !tour) {
    return (
      <div className="min-h-screen pt-24 bg-[#fea43a] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-white border-2 border-[#031f3d] p-8 rounded-[2rem] max-w-md w-full space-y-4 shadow-2xl">
          <div className="h-14 w-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto border-2 border-[#031f3d]">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="text-lg font-black text-[#031f3d]">{t("states.errorTitle")}</h1>
          <p className="text-xs font-semibold text-rose-700">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#031f3d] hover:bg-[#0d5757] text-white text-xs font-black rounded-xl transition-all shadow-lg active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            {t("states.retry")}
          </button>
        </div>
      </div>
    );
  }

  // Cálculo de subtotal dinámico
  const calculatedTotal = tour.price * people;

  return (
    <div className="min-h-screen pt-24 bg-[#fea43a] text-[#031f3d] font-sans pb-24">

      {/* NAVEGACIÓN BREADCRUMB */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#031f3d] hover:text-[#0d5757] bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border-2 border-[#031f3d] shadow-md transition-all hover:-translate-x-0.5 active:scale-95"
          href="/producto"
        >
          <ArrowLeft className="h-4 w-4 text-[#0d5757]" />
          {t("breadcrumb.backToTours")}
        </Link>
      </nav>

      {/* HERO / PORTADA */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#031f3d] group">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031f3d]/90 via-[#031f3d]/30 to-transparent" />

          {tour.featured && (
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-[#fea43a] text-[#031f3d] text-xs font-black px-4 py-2 rounded-full shadow-lg border-2 border-[#031f3d]">
              <Sparkles className="h-4 w-4 fill-current" />
              {t("hero.featuredBadge")}
            </div>
          )}

          {/* Información rápida sobrepuesta en Hero */}
          <div className="absolute bottom-8 left-6 right-6 text-white space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black">
              <span className="bg-[#0d5757] text-[#fea43a] px-3.5 py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
                {tour.state}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
              {tour.title}
            </h1>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* COLUMNA IZQUIERDA: DETALLES */}
          <div className="lg:col-span-2 space-y-8">

            {/* Datos principales */}
            <section className="bg-white p-6 sm:p-8 rounded-[2rem] border-2 border-[#031f3d] shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#031f3d]/10 pb-6">
                <div className="flex items-center gap-3 text-sm text-[#031f3d]">
                  <div className="h-10 w-10 rounded-2xl bg-[#fea43a]/20 border border-[#031f3d]/20 flex items-center justify-center text-[#0d5757]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#031f3d]/60 block tracking-wider">{t("details.location")}</span>
                    <strong className="text-[#031f3d] font-extrabold">{tour.place}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#031f3d]">
                  <div className="h-10 w-10 rounded-2xl bg-[#fea43a]/20 border border-[#031f3d]/20 flex items-center justify-center text-[#0d5757]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#031f3d]/60 block tracking-wider">{t("details.duration")}</span>
                    <strong className="text-[#031f3d] font-extrabold">{tour.durationHours} {t("details.hours")}</strong>
                  </div>
                </div>
              </div>

              {/* Lo que vivirás */}
              {tour.highlights && tour.highlights.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-[#031f3d] flex items-center gap-2 tracking-tight">
                    <Sparkles className="h-5 w-5 text-[#0d5757]" />
                    {t("details.highlightsTitle")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tour.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-[#fea43a]/15 border-2 border-[#031f3d]/20 transition-all hover:bg-[#fea43a]/25"
                      >
                        <div className="h-6 w-6 rounded-full bg-[#0d5757] text-[#fea43a] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black border border-[#031f3d]">
                          ✓
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[#031f3d] leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Itinerario */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section className="bg-white p-6 sm:p-8 rounded-[2rem] border-2 border-[#031f3d] shadow-xl space-y-6">
                <h2 className="text-xl font-black text-[#031f3d] flex items-center gap-2 tracking-tight">
                  <Compass className="h-5 w-5 text-[#0d5757]" />
                  {t("itinerary.title")}
                </h2>

                <div className="relative border-l-2 border-[#031f3d] ml-4 pl-6 space-y-8">
                  {tour.itinerary.map((step, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full bg-[#0d5757] border-2 border-[#031f3d] shadow-md group-hover:scale-125 transition-transform" />

                      <div className="bg-[#fea43a]/10 p-5 rounded-2xl border-2 border-[#031f3d]/20 transition-all hover:bg-white hover:shadow-md">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <h3 className="text-base font-black text-[#031f3d]">{step.title}</h3>
                          <span className="inline-flex items-center gap-1 text-xs font-black text-[#031f3d] bg-[#fea43a] px-3 py-1 rounded-full border border-[#031f3d]">
                            <Clock className="h-3 w-3" />
                            {step.time}
                          </span>
                        </div>

                        {step.details && step.details.length > 0 && (
                          <ul className="space-y-1.5 mb-3">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="text-xs sm:text-sm text-[#031f3d]/80 font-semibold flex items-start gap-2">
                                <span className="text-[#0d5757] font-black">•</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}

                        {step.note && (
                          <div className="flex items-start gap-2 text-xs text-[#031f3d] bg-[#0d5757]/10 p-3 rounded-xl border border-[#0d5757]/30 font-semibold">
                            <Info className="h-4 w-4 text-[#0d5757] shrink-0 mt-0.5" />
                            <span><strong>{t("itinerary.noteLabel")}:</strong> {step.note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Incluye / No Incluye */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[2rem] border-2 border-[#031f3d] shadow-xl space-y-4">
                <h3 className="text-base font-black text-[#031f3d] flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#0d5757]" />
                  {t("includesExcludes.includesTitle")}
                </h3>
                <ul className="space-y-2.5">
                  {tour.includes && tour.includes.length > 0 ? (
                    tour.includes.map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-[#031f3d] font-bold flex items-start gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-[#0d5757] text-[#fea43a] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">✓</div>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-[#031f3d]/50 font-semibold italic">{t("includesExcludes.notSpecified")}</li>
                  )}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-[2rem] border-2 border-[#031f3d] shadow-xl space-y-4">
                <h3 className="text-base font-black text-[#031f3d] flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-rose-600" />
                  {t("includesExcludes.excludesTitle")}
                </h3>
                <ul className="space-y-2.5">
                  {tour.excludes && tour.excludes.length > 0 ? (
                    tour.excludes.map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-[#031f3d] font-bold flex items-start gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black border border-rose-300">✕</div>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-[#031f3d]/50 font-semibold italic">{t("includesExcludes.notSpecified")}</li>
                  )}
                </ul>
              </div>
            </section>
          </div>

          {/* COLUMNA DERECHA: SIDEBAR DE RESERVA */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 bg-white p-6 sm:p-8 rounded-[2rem] shadow-2xl border-2 border-[#031f3d] space-y-6">

              {/* Precio base */}
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#031f3d]/60">
                  {t("booking.pricePerPerson")}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#031f3d]">
                    ${tour.price.toLocaleString(locale === "en" ? "en-US" : "es-MX")}
                  </span>
                  <span className="text-xs font-black text-[#0d5757]">MXN</span>
                </div>
              </div>

              <hr className="border-t-2 border-[#031f3d]/10" />

              {/* FORMULARIO DE RESERVA */}
              <div className="space-y-5">
                {/* Selector de Fecha */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-[#031f3d] flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[#0d5757]" />
                    {t("booking.dateLabel")}
                  </label>
                  <input
                    type="date"
                    min={todayISO}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm font-bold border-2 border-[#031f3d] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#fea43a]/40 bg-[#fea43a]/10 text-[#031f3d] transition-all"
                  />
                </div>

                {/* Selector de Personas */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-[#031f3d] flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#0d5757]" />
                    {t("booking.peopleLabel")}
                  </label>
                  <div className="flex items-center justify-between border-2 border-[#031f3d] rounded-2xl p-2 bg-[#fea43a]/10">
                    <button
                      type="button"
                      onClick={() => setPeople((prev) => Math.max(1, prev - 1))}
                      className="h-10 w-10 rounded-xl bg-white border-2 border-[#031f3d] flex items-center justify-center font-black text-[#031f3d] hover:bg-[#0d5757] hover:text-white transition-all active:scale-95 shadow-sm"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-black text-[#031f3d] text-sm">
                      {people} {people === 1 ? t("booking.personSingular") : t("booking.personPlural")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPeople((prev) => prev + 1)}
                      className="h-10 w-10 rounded-xl bg-white border-2 border-[#031f3d] flex items-center justify-center font-black text-[#031f3d] hover:bg-[#0d5757] hover:text-white transition-all active:scale-95 shadow-sm"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total estimado */}
              <div className="bg-[#031f3d] p-5 rounded-2xl text-white space-y-1 relative overflow-hidden border-2 border-[#031f3d]">
                <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-[#fea43a]/20 blur-xl" />
                <span className="text-[11px] font-black text-[#fea43a] uppercase tracking-wider block">{t("booking.estimatedTotal")}</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    ${calculatedTotal.toLocaleString(locale === "en" ? "en-US" : "es-MX")}
                  </span>
                  <span className="text-xs font-black text-[#fea43a]">MXN</span>
                </div>
              </div>

              {/* Botón de Agregar al Carrito */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedSuccess}
                className="w-full py-4 bg-[#0d5757] hover:bg-[#0b4848] text-white font-black rounded-2xl text-base shadow-xl border-2 border-[#031f3d] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-90"
              >
                {addedSuccess ? (
                  <>
                    <Check className="h-5 w-5 text-[#fea43a]" strokeWidth={3} />
                    <span>{t("booking.addedSuccess")}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>{t("booking.addToCart")}</span>
                  </>
                )}
              </button>

              {/* Info Logística rápida */}
              <div className="space-y-3 pt-2 text-xs text-[#031f3d] font-semibold border-t-2 border-[#031f3d]/10">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-[#0d5757] shrink-0" />
                  <span>{t("logistics.startTime")}: <strong className="text-[#031f3d] font-black">{tour.startTime}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#0d5757] shrink-0" />
                  <span className="line-clamp-1" title={tour.meetingPoint}>
                    {t("logistics.meetingPoint")}: <strong className="text-[#031f3d] font-black">{tour.meetingPoint}</strong>
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* SECCIÓN DE TOURS RELACIONADOS (Fondo Verde) */}
        {relatedTours.length > 0 && (
          <section className="mt-20 p-8 sm:p-10 rounded-[2.5rem] bg-[#0d5757] border-4 border-[#031f3d] shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#fea43a]">
                  {t("related.subheading")}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mt-1 tracking-tight">
                  {t("related.heading")} {tour.state.toUpperCase()}
                </h2>
              </div>
              <Link
                href="/tienda"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#fea43a] hover:text-white bg-[#031f3d] px-4 py-2 rounded-full border border-[#fea43a]/30 transition-all active:scale-95"
              >
                {t("related.viewAll")} <ChevronRight className="h-4 w-4 text-[#fea43a]" />
              </Link>
            </div>

            {loadingRelated ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white/10 rounded-[2rem] h-80 animate-pulse border-2 border-white/20" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTours.map((item) => (
                  <Link
                    key={item.id}
                    href={`/producto/${item.slug}`}
                  >
                    <article
                      className="group bg-white rounded-[2rem] overflow-hidden border-2 border-[#031f3d] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative h-48 w-full bg-[#031f3d]/10 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <span className="absolute top-3 left-3 bg-[#031f3d] text-[#fea43a] text-[10px] font-black px-3 py-1 rounded-full border border-[#fea43a]/40">
                          {item.state.toUpperCase()}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs text-[#031f3d]/70 font-bold">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-[#0d5757]" />
                              {item.durationHours} {t("details.hours")}
                            </span>
                          </div>
                          <h3 className="font-black text-[#031f3d] text-base line-clamp-1 group-hover:text-[#0d5757] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#031f3d]/70 font-semibold line-clamp-1 flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-[#0d5757] shrink-0" />
                            {item.place}
                          </p>
                        </div>

                        <div className="pt-3 border-t-2 border-[#031f3d]/10 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#031f3d]/60 font-black block uppercase">{t("related.from")}</span>
                            <span className="text-base font-black text-[#031f3d]">
                              ${item.price.toLocaleString(locale === "en" ? "en-US" : "es-MX")}{" "}
                              <small className="text-[10px] text-[#0d5757] font-black">MXN</small>
                            </span>
                          </div>
                          <button
                            className="px-4 py-2 bg-[#fea43a] text-[#031f3d] hover:bg-[#031f3d] hover:text-[#fea43a] border-2 border-[#031f3d] text-xs font-black rounded-xl transition-all shadow-md active:scale-95"
                          >
                            {t("related.viewDetails")}
                          </button>
                        </div>
                      </div>
                    </article>
                  </Link>

                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}