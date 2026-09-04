"use client";

import Link from "next/link";
import { ASSETS, bgImg, img } from "@/lib/img";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Target,
  Award,
  BookOpenText,
  MapPin,
  Microscope,
  Palette,
  ShieldCheck,
  Sparkles,
  Zap,
  Map,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export default function QuienesSomosPage() {
  const t = useTranslations("aboutUs");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mapeo dinámico de Íconos para la sección de Misión, Visión y Objetivos
  const slideIcons = [Compass, Target, Award];
  const objectiveIcons = [Zap, Map, ShieldCheck, BookOpenText, MapPin, Sparkles];

  // Recuperación de la lista de Objetivos desde las traducciones
  const objectivesListTranslated = t.raw("slides.objectives.list") as string[];

  const SLIDES = [
    {
      id: "mision",
      category: t("slides.mission.category"),
      icon: slideIcons[0],
      quote: t("slides.mission.quote"),
      description: t("slides.mission.description"),
    },
    {
      id: "vision",
      category: t("slides.vision.category"),
      icon: slideIcons[1],
      quote: t("slides.vision.quote"),
      description: t("slides.vision.description"),
    },
    {
      id: "objetivos",
      category: t("slides.objectives.category"),
      icon: slideIcons[2],
      quote: t("slides.objectives.quote"),
      objectivesList: objectivesListTranslated.map((text, idx) => ({
        text,
        icon: objectiveIcons[idx % objectiveIcons.length],
      })),
    },
  ];

  // Mapeo dinámico de Valores/Pilares desde las traducciones
  const valueIcons = [Microscope, Map, Zap, Sparkles, ShieldCheck];
  const rawValues = t.raw("values.items") as Array<{ title: string; text: string }>;

  const VALUES = rawValues.map((v, idx) => ({
    icon: valueIcons[idx % valueIcons.length],
    title: v.title,
    text: v.text,
  }));

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-[#031f3d] text-white antialiased selection:bg-[#fea43a] selection:text-[#031f3d] font-sans">
      {/* SECCIÓN 1: HERO */}
      <section className="relative overflow-hidden bg-[#031f3d] py-24 text-white lg:py-32 border-b-2 border-[#fea43a]/20">
        <div
          className="absolute inset-0 opacity-[0.20] mix-blend-overlay bg-cover bg-center transition-transform duration-10000 hover:scale-110"
          style={{
            backgroundImage: bgImg(
              `https://images.unsplash.com/photo-1606971220186-e18b2425247b?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
              1500
            ),
          }}
        />

        {/* Íconos Flotantes decorativos */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Compass className="absolute top-12 left-[10%] h-10 w-10 text-[#fea43a] opacity-40 animate-pulse" />
          <MapPin className="absolute bottom-16 right-[15%] h-14 w-14 text-[#0d5757] opacity-60 animate-bounce duration-1000" />
          <Palette className="absolute top-1/4 right-[5%] h-12 w-12 text-[#fea43a] opacity-30 animate-spin-slow" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6 text-center animate-fadeUp">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#fea43a]/40 bg-[#fea43a] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#031f3d] shadow-lg">
              <Award className="h-4 w-4 text-[#031f3d]" /> {t("hero.badge")}
            </span>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl text-white">
              <span className="text-[#fea43a]">
                {t("hero.titleHighlight")}
              </span>{" "}
              <br className="hidden sm:inline" />
              {t("hero.titleRest")}
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: ARQUITECTOS */}
      <section className="relative bg-[#031f3d] py-20 lg:py-28 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr,minmax(0,1fr)] lg:items-center">
            
            {/* Tarjeta Amarilla de Texto */}
            <div className="space-y-6 animate-fadeRight rounded-3xl bg-[#fea43a] p-8 md:p-10 text-[#031f3d] border-4 border-[#031f3d] shadow-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#031f3d] px-3.5 py-1 text-xs font-black text-[#fea43a]">
                <MapPin className="h-4 w-4" /> {t("architects.badge")}
              </div>

              <h2 className="text-3xl font-black tracking-tight text-[#031f3d] sm:text-4xl lg:text-5xl">
                {t("architects.titleStart")}{" "}
                <br className="hidden sm:inline" />
                <span className="text-[#0d5757]">{t("architects.titleHighlight")}</span>
              </h2>

              <div className="space-y-4 text-base font-semibold leading-relaxed text-[#031f3d]">
                <p className="rounded-xl border-l-4 border-[#031f3d] bg-[#031f3d]/10 p-4">
                  {t("architects.paragraph1")}
                </p>
                <p>{t("architects.paragraph2")}</p>
                <p className="font-extrabold text-[#0d5757]">
                  {t("architects.paragraph3")}
                </p>
              </div>
            </div>

            {/* Imagen con Marco Amarillo */}
            <div className="relative animate-fadeUp">
              <div className="absolute -inset-1.5 rounded-3xl bg-[#fea43a] opacity-50 blur-lg transition duration-1000"></div>
              <img
                src={img(
                  `https://images.unsplash.com/photo-1531088908835-39526ed12409?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                  900
                )}
                alt={t("architects.imageAlt")}
                className="relative w-full rounded-3xl border-4 border-[#fea43a] object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: LO QUE NOS DEFINE (TARJETAS AMARILLAS) */}
      <section className="relative overflow-hidden bg-[#031f3d] py-20 text-white lg:py-28 border-t-2 border-[#fea43a]/20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Zap className="absolute top-10 right-10 h-16 w-16 text-[#fea43a] opacity-30 animate-pulse" />
          <Microscope className="absolute bottom-10 left-10 h-20 w-20 text-[#0d5757] opacity-40 animate-spin-slow" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 animate-fadeUp">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white">
              {t("values.titleStart")}{" "}
              <span className="text-[#fea43a]">{t("values.titleHighlight")}</span>
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-200 max-w-xl mx-auto">
              {t("values.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => {
              const ValueIcon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group relative rounded-3xl border-4 border-[#031f3d] bg-[#fea43a] p-8 text-[#031f3d] shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#031f3d] p-3 text-[#fea43a] shadow-md">
                      <ValueIcon className="h-full w-full object-contain text-[#fea43a]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black tracking-widest text-[#0d5757] uppercase">
                        0{i + 1}
                      </span>
                      <h3 className="text-xl font-black leading-tight text-[#031f3d]">
                        {v.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-6 text-sm font-semibold leading-relaxed text-[#031f3d]/90">
                    {v.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: FILOSOFÍA (SLIDER EN TARJETA AMARILLA) */}
      <section className="relative overflow-hidden bg-[#031f3d] py-20 text-white lg:py-28 border-t-2 border-[#fea43a]/20">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header del Carrusel */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-fadeLeft">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#fea43a] px-3.5 py-1 text-xs font-black text-[#031f3d]">
                <Compass className="h-4 w-4" /> {t("philosophy.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">
                {t("philosophy.title")}
              </h2>
            </div>

            {/* Controles del Slider */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#fea43a] mr-2">
                0{currentSlide + 1} / 0{SLIDES.length}
              </span>
              <button
                onClick={prevSlide}
                aria-label={t("philosophy.prevSlide")}
                className="p-3.5 rounded-full border-2 border-[#031f3d] bg-[#fea43a] text-[#031f3d] hover:bg-white transition-all shadow-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label={t("philosophy.nextSlide")}
                className="p-3.5 rounded-full border-2 border-[#031f3d] bg-[#fea43a] text-[#031f3d] hover:bg-white transition-all shadow-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Ventana Viewport del Carrusel (Tarjeta Amarilla Principal) */}
          <div className="relative overflow-hidden rounded-3xl border-4 border-[#031f3d] bg-[#fea43a] text-[#031f3d] shadow-2xl animate-fadeUp">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {SLIDES.map((slide) => {
                const IconComponent = slide.icon;
                return (
                  <div
                    key={slide.id}
                    className="w-full shrink-0 p-8 md:p-12 lg:p-16 min-h-[400px] flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#031f3d] p-3 text-[#fea43a]">
                          <IconComponent className="w-full h-full object-contain" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-[#031f3d] tracking-tight">
                          {slide.category}
                        </h3>
                      </div>

                      <blockquote className="text-lg md:text-xl font-bold italic text-[#031f3d] leading-relaxed border-l-4 border-[#031f3d] pl-6 bg-[#031f3d]/10 p-5 rounded-r-xl">
                        "{slide.quote}"
                      </blockquote>

                      {slide.description && (
                        <p className="text-sm md:text-base font-semibold text-[#031f3d]/90 leading-relaxed max-w-4xl">
                          {slide.description}
                        </p>
                      )}

                      {slide.objectivesList && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                          {slide.objectivesList.map((item, idx) => {
                            const ItemIcon = item.icon;
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-[#031f3d] bg-[#031f3d] text-white shadow-md transition-transform hover:-translate-y-1"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fea43a] text-[#031f3d] shadow-sm">
                                  <ItemIcon className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-bold text-white">
                                  {item.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Barra de Progreso Inferior */}
                    <div className="w-full bg-[#031f3d]/20 h-2 rounded-full mt-12 overflow-hidden">
                      <div
                        className="bg-[#031f3d] h-full transition-all duration-300 rounded-full"
                        style={{
                          width: `${((currentSlide + 1) / SLIDES.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: FORMULARIO (TARJETA AMARILLA) */}
      <section className="bg-[#031f3d] py-20 lg:py-28 text-white border-t-2 border-[#fea43a]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto rounded-3xl border-4 border-[#031f3d] bg-[#fea43a] p-8 md:p-12 text-[#031f3d] shadow-2xl relative animate-fadeUp">
            <Zap className="absolute -top-7 -left-7 h-14 w-14 text-[#031f3d] bg-[#fea43a] rounded-full p-2 border-4 border-[#031f3d] animate-bounce duration-1000" />

            <div className="text-center mb-10">
              <h2 className="text-3xl font-black tracking-tight text-[#031f3d] sm:text-4xl">
                {t("contactSection.titleStart")}{" "}
                <span className="text-[#0d5757]">{t("contactSection.titleHighlight")}</span>?
              </h2>
              <p className="mt-4 text-sm font-bold leading-relaxed text-[#031f3d]/80 max-w-lg mx-auto">
                {t("contactSection.subtitle")}
              </p>
            </div>

            <div className="pt-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}