"use client";

import {
  ArrowRight,
  Award,
  Ban,
  Calendar,
  Camera,
  Check,
  Compass,
  HeartHandshake,
  Info,
  Layers,
  MapPin,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";

import {
  Landmark,
  Trees,
  Pyramid,
  Waves,
  Utensils,
  Palette
} from "lucide-react";

import {
  MessageSquare,
  PencilRuler,
  SlidersHorizontal,
  Plane,
} from "lucide-react";

import {
  Headphones,
  ShieldCheck,
  Clock,
  Sliders
} from "lucide-react";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact-form";
import { bgImg, img } from "@/lib/img";
import { getOptimizedUrl } from "@/lib/images";

export default function Home() {
  const t = useTranslations("home");

  const FEATURES = [
    {
      icon: Compass,
      title: t("features.items.strategicItineraries.title"),
      text: t("features.items.strategicItineraries.text")
    },
    {
      icon: Headphones,
      title: t("features.items.personalizedAttention.title"),
      text: t("features.items.personalizedAttention.text")
    },
    {
      icon: Sparkles,
      title: t("features.items.integralExperiences.title"),
      text: t("features.items.integralExperiences.text")
    },
    {
      icon: ShieldCheck,
      title: t("features.items.qualitySuppliers.title"),
      text: t("features.items.qualitySuppliers.text")
    },
    {
      icon: Clock,
      title: t("features.items.optimizedLogistics.title"),
      text: t("features.items.optimizedLogistics.text")
    },
    {
      icon: Sliders,
      title: t("features.items.adaptability.title"),
      text: t("features.items.adaptability.text")
    },
  ];

  const STEPS = [
    {
      icon: MessageSquare,
      title: t("steps.items.connection.title"),
      text: t("steps.items.connection.text"),
    },
    {
      icon: PencilRuler,
      title: t("steps.items.design.title"),
      text: t("steps.items.design.text"),
    },
    {
      icon: SlidersHorizontal,
      title: t("steps.items.adjustment.title"),
      text: t("steps.items.adjustment.text"),
    },
    {
      icon: Plane,
      title: t("steps.items.travel.title"),
      text: t("steps.items.travel.text"),
    },
  ];

  const CONDITIONS = [
    t("conditions.items.availability"),
    t("conditions.items.advanceBooking"),
    t("conditions.items.itineraryAdjustments"),
    t("conditions.items.priceVariations"),
    t("conditions.items.additionalCosts"),
  ];

  const NOT_INCLUDED = [
    t("conditions.notIncludedItems.transport"),
    t("conditions.notIncludedItems.foodAndDrinks"),
    t("conditions.notIncludedItems.tickets"),
    t("conditions.notIncludedItems.personalExpenses"),
    t("conditions.notIncludedItems.tips"),
    t("conditions.notIncludedItems.extraActivities"),
  ];

  const CATEGORIES = [
    {
      icon: Landmark,
      title: t("categories.items.heritage.title"),
      text: t("categories.items.heritage.text"),
      href: "/tienda?tipo=cultural",
    },
    {
      icon: Trees,
      title: t("categories.items.ecoAdventure.title"),
      text: t("categories.items.ecoAdventure.text"),
      href: "/tienda?tipo=naturaleza,aventura",
    },
    {
      icon: Pyramid,
      title: t("categories.items.pastTraces.title"),
      text: t("categories.items.pastTraces.text"),
      href: "/tienda?q=arqueol",
    },
    {
      icon: Waves,
      title: t("categories.items.horizons.title"),
      text: t("categories.items.horizons.text"),
      href: "/tienda?q=playa",
    },
    {
      icon: Utensils,
      title: t("categories.items.flavorRoutes.title"),
      text: t("categories.items.flavorRoutes.text"),
      href: "/tienda?tipo=gastronomia",
    },
    {
      icon: Palette,
      title: t("categories.items.urbanPulse.title"),
      text: t("categories.items.urbanPulse.text"),
      href: "/tienda?tipo=recreativo",
    },
  ];

  return (
    /* Contenedor principal con padding inferior para que la Bottom Bar no tape contenido */
    <div className="w-full bg-[#0d5757] pt-20 text-white antialiased selection:bg-[#fea43a] selection:text-[#031f3d] pb-24 md:pb-28">
      
      {/* SECCIÓN 1: HERO (Fondo Verde, Íconos Dorados) */}
      <section className="relative overflow-hidden bg-[#0d5757] py-20 lg:py-32">
        {/* Íconos Flotantes decorativos dorados */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Sparkles className="absolute top-12 left-[10%] h-8 w-8 text-[#fea43a] opacity-80 animate-bounce duration-1000" />
          <Compass className="absolute bottom-16 left-[5%] h-12 w-12 text-[#fea43a] opacity-40 animate-pulse" />
          <MapPin className="absolute top-20 right-[12%] h-10 w-10 text-[#fea43a] opacity-60 animate-bounce duration-700" />
          <Sun className="absolute bottom-10 right-[6%] h-16 w-16 text-[#fea43a] opacity-30 animate-spin-slow" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fea43a]/40 bg-[#031f3d]/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#fea43a] backdrop-blur-md">
                <Sparkles className="h-4 w-4" /> {t("hero.badge")}
              </span>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-tight">
                {t("hero.title1")} <br />
                <span className="text-[#fea43a]">
                  {t("hero.titleGradient")}
                </span>
              </h1>

              <p className="mx-auto max-w-lg text-base leading-relaxed text-white/90 lg:mx-0 sm:text-lg font-medium">
                {t("hero.description")}
              </p>

              <div className="pt-4">
                <Link
                  href="/tienda"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#fea43a] px-8 py-4 text-base font-extrabold text-[#031f3d] shadow-xl shadow-[#fea43a]/20 transition-all duration-300 ease-out hover:scale-105 hover:bg-[#ffb65e] active:scale-90"
                >
                  <span>{t("hero.cta")}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 rounded-[2.5rem] bg-[#fea43a] opacity-20 blur-2xl transition duration-1000 group-hover:opacity-40"></div>
              <img
                src={getOptimizedUrl("https://images.unsplash.com/photo-1726295255398-b830f0bfdc1a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("hero.imgAlt")}
                className="relative w-full rounded-[2rem] object-cover shadow-2xl border-4 border-[#fea43a]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: CREAMOS EXPERIENCIAS (Fondo Amarillo, Imágenes a la izquierda) */}
      <section className="relative bg-[#fea43a] py-20 lg:py-28 text-[#031f3d] rounded-t-[3rem] -mt-8 shadow-[0_-15px_40px_rgba(0,0,0,0.1)] z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Imágenes en la izquierda */}
            <div className="grid gap-4 sm:grid-cols-2 order-last lg:order-first">
              <div
                className="group relative h-64 overflow-hidden rounded-[2rem] bg-cover bg-center shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl sm:mt-8 border-4 border-[#031f3d]"
                style={{
                  backgroundImage: bgImg(
                    `https://images.unsplash.com/photo-1616036740257-9449ea1f6605?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                    700,
                  ),
                }}
              >
                <div className="absolute inset-0 bg-[#0d5757]/20 transition-colors group-hover:bg-transparent" />
              </div>

              <div
                className="group relative h-64 overflow-hidden rounded-[2rem] bg-cover bg-center shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl border-4 border-[#0d5757]"
                style={{ backgroundImage: bgImg(`https://images.unsplash.com/photo-1562095241-8c6714fd4178?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`, 700) }}
              >
                <div className="absolute inset-0 bg-[#031f3d]/20 transition-colors group-hover:bg-transparent" />
              </div>
            </div>

            {/* Texto en la derecha */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#031f3d] px-4 py-1.5 text-xs font-bold text-[#fea43a]">
                <HeartHandshake className="h-4 w-4" /> {t("about.badge")}
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                {t("about.titleLine1")} <br className="hidden sm:inline" />
                <span className="text-[#0d5757]">{t("about.titleHighlight")}</span>
              </h2>

              <div className="space-y-4 text-base leading-relaxed font-medium">
                <p className="rounded-3xl border-l-8 border-[#0d5757] bg-[#031f3d]/5 p-5">
                  {t("about.p1")}
                </p>
                <p>
                  {t("about.p2")}
                </p>
                <p className="font-bold text-[#0d5757]">
                  {t("about.p3")}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 3: FEATURES (Fondo Azul, Cards en Círculos Amarillos) */}
      <section className="relative overflow-hidden bg-[#031f3d] py-20 lg:py-32 rounded-t-[3rem] -mt-8 shadow-[0_-15px_40px_rgba(0,0,0,0.2)] z-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Camera className="absolute top-8 right-[8%] h-14 w-14 text-[#fea43a] opacity-20 animate-pulse" />
          <Zap className="absolute bottom-12 left-[10%] h-10 w-10 text-[#0d5757] opacity-40 animate-bounce duration-1000" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("features.titleLine1")} <br />
              <span className="text-[#fea43a]">{t("features.titleHighlight")}</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
            {FEATURES.map((f) => {
              const IconComponent = f.icon;

              return (
                <div
                  key={f.title}
                  className="group relative flex flex-col items-center justify-center text-center rounded-full aspect-square w-full max-w-[320px] border-8 border-[#0d5757] bg-[#fea43a] p-8 shadow-2xl transition-transform duration-500 ease-out hover:scale-105"
                >
                  <div className="mb-4 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#031f3d] shadow-inner transition-transform duration-300 group-hover:-translate-y-2">
                    <IconComponent className="h-10 w-10 text-[#fea43a]" />
                  </div>
                  <h3 className="text-xl font-black leading-snug text-[#031f3d]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#031f3d]/80">
                    {f.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: POR QUÉ CONFIAR (Fondo Amarillo, Botones Azules) */}
      <section className="relative bg-[#fea43a] py-20 lg:py-28 rounded-t-[3rem] -mt-8 shadow-[0_-15px_40px_rgba(0,0,0,0.1)] z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#031f3d] px-4 py-1.5 text-xs font-bold text-white">
                <Award className="h-4 w-4 text-[#fea43a]" /> {t("whyTrust.badge")}
              </span>

              <h2 className="text-3xl font-black tracking-tight text-[#031f3d] sm:text-4xl lg:text-5xl">
                {t("whyTrust.titleLine1")} <br />
                <span className="text-[#0d5757]">{t("whyTrust.titleHighlight")}</span>
              </h2>

              <p className="max-w-lg text-base leading-relaxed text-[#031f3d]/80 sm:text-lg font-medium">
                {t("whyTrust.description")}
              </p>

              <div className="pt-4">
                <Link
                  href="/quienes-somos"
                  className="inline-flex items-center gap-3 rounded-full bg-[#031f3d] px-8 py-4 text-sm font-extrabold text-[#fea43a] shadow-xl transition-all duration-300 ease-out hover:bg-[#0d5757] active:scale-90"
                >
                  {t("whyTrust.cta")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[3rem] bg-[#0d5757]  shadow-2xl border-4 border-[#031f3d]">
              <img
                src={img(`https://images.unsplash.com/photo-1777759957133-96c48973df30?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`, 900)}
                alt={t("whyTrust.imgAlt")}
                className="w-full object-contain rounded-[2rem] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: PROCESO (Fondo Verde, Contenido Azul/Amarillo) */}
      <section className="relative overflow-hidden bg-[#0d5757] py-20 text-white lg:py-32 rounded-t-[3rem] -mt-8 shadow-[0_-15px_40px_rgba(0,0,0,0.2)] z-40">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Layers className="absolute top-10 right-10 h-32 w-32 text-[#fea43a] animate-pulse" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fea43a] px-4 py-1.5 text-xs font-bold text-[#031f3d]">
              <Calendar className="h-4 w-4" /> {t("steps.badge")}
            </span>
            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {t("steps.titleLine1")} <span className="text-[#fea43a]">{t("steps.titleHighlight")}</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base font-medium">
              {t("steps.description")}
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const IconComponent = s.icon;

              return (
                <div
                  key={s.title}
                  className="group relative flex flex-col justify-between rounded-[2rem] border-4 border-[#031f3d] bg-[#031f3d] p-8 transition-transform duration-500 ease-out hover:-translate-y-3 shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fea43a] text-sm font-black text-[#031f3d] shadow-md">
                        0{i + 1}
                      </span>
                      <Sparkles className="h-5 w-5 text-[#fea43a] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    <div className="my-8 flex h-20 items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#0d5757] text-[#fea43a] transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="h-10 w-10" strokeWidth={2} />
                      </div>
                    </div>

                    <h3 className="text-center text-xl font-black text-white">{s.title}</h3>
                    <p className="mt-3 text-center text-sm font-medium leading-relaxed text-white/70">
                      {s.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/cotiza-tu-experiencia"
              className="inline-flex items-center gap-3 rounded-full bg-[#fea43a] px-8 py-4 text-base font-extrabold text-[#031f3d] shadow-xl transition-all duration-300 ease-out hover:scale-105 active:scale-90"
            >
              <span>{t("steps.cta")}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: CONDICIONES (Fondo Azul) */}
      <section className="bg-[#031f3d] py-20 lg:py-28 rounded-t-[3rem] -mt-8 shadow-[0_-15px_40px_rgba(0,0,0,0.2)] z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Condiciones Positivas (Verde) */}
            <div className="rounded-[2.5rem] border-4 border-[#0d5757] bg-[#0d5757] p-8 sm:p-10 shadow-2xl">
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {t("conditions.titleLine1")} <br />
                <span className="text-[#fea43a]">{t("conditions.titleHighlight")}</span>
              </h2>
              <p className="mt-4 text-sm font-medium text-white/80">
                {t("conditions.subtitle")}
              </p>

              <ul className="mt-8 space-y-5">
                {CONDITIONS.map((c) => (
                  <li key={c} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fea43a] text-[#031f3d] shadow-md">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-base font-bold leading-relaxed text-white">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* No Incluido (Amarillo) */}
            <div className="rounded-[2.5rem] border-4 border-[#fea43a] bg-[#fea43a] p-8 sm:p-10 shadow-2xl">
              <h2 className="text-2xl font-black tracking-tight text-[#031f3d] sm:text-3xl">
                {t("conditions.notIncludedTitleLine1")} <span className="text-[#0d5757]">{t("conditions.notIncludedTitleHighlight")}</span>
              </h2>
              <p className="mt-4 text-sm font-medium text-[#031f3d]/80">
                {t("conditions.notIncludedSubtitle")}
              </p>

              <ul className="mt-8 space-y-5">
                {NOT_INCLUDED.map((c) => (
                  <li key={c} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#031f3d] text-white">
                      <Ban className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-base font-bold leading-relaxed text-[#031f3d]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 7: CATEGORÍAS (Fondo Verde, Cards Amarillas/Blancas) */}
      <section className="relative bg-[#0d5757] py-20 lg:py-28 rounded-t-[3rem] -mt-8 shadow-[0_-15px_40px_rgba(0,0,0,0.2)] z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("categories.titleLine1")} <span className="text-[#fea43a]">{t("categories.titleHighlight")}</span>
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-white/80">
              {t("categories.description")}
            </p>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="hidden rounded-[3rem]  shadow-2xl lg:block">
              <img
                src={img(`https://images.unsplash.com/photo-1584208632776-bc16f862b0b4?q=80&w=612&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`, 680)}
                alt={t("categories.imgAlt")}
                className="w-full rounded-[2rem] object-contain border-4 border-[#031f3d]"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {CATEGORIES.map((c) => {
                const IconComponent = c.icon;

                return (
                  <Link
                    key={c.title}
                    href={c.href}
                    className="group flex flex-col gap-4 rounded-[2rem] border-4 border-[#031f3d] bg-white p-6 shadow-xl transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-[#fea43a]"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.2rem] bg-[#0d5757] text-[#fea43a] transition-colors duration-300 group-hover:bg-[#fea43a] group-hover:text-[#031f3d]">
                      <IconComponent className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#031f3d]">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-[#031f3d]/70">{c.text}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: AVISO + CONTACTO (Fondo Amarillo) */}
      <section className="bg-[#fea43a] pt-20 pb-10 rounded-t-[3rem] -mt-8 shadow-[0_-15px_40px_rgba(0,0,0,0.2)] z-[60]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-[#031f3d] p-8 sm:p-10 text-center shadow-2xl">
            <Info className="mx-auto h-12 w-12 text-[#fea43a]" />
            <p className="mt-6 text-base font-black leading-relaxed text-white sm:text-lg">
              {t("notice.p1")}
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-white/70">
              {t("notice.p2")}
            </p>
          </div>

          <div className="mt-16 shadow-2xl  mx-auto">
            {/* El formulario asume heredar estilos o puedes estilizar internamente el componente */}
            <ContactForm />
          </div>
          
        </div>
      </section>
    </div>
  );
}