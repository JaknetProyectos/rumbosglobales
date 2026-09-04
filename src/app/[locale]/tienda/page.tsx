"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { UseToursFilters, useTours } from "@/hooks/use-tours";
import { STATES } from "@/data/tours";
import {
  Search,
  Filter,
  RotateCcw,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
  AlertCircle,
  ArrowUpDown,
  DollarSign,
  CalendarCheck,
  Zap,
} from "lucide-react";
import { getOptimizedUrl } from "@/lib/images";

export default function ToursPage() {
  const t = useTranslations("toursPage");
  const locale = useLocale();

  // Estados para paginación y filtros
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<"newest" | "price" | "duration" | "title">("newest");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const limit = 10; // Tours por página

  // Objeto de filtros memoizado para el hook
  const filters: UseToursFilters = {
    search: search || undefined,
    state: selectedState || undefined,
    minPrice: minPrice !== undefined && minPrice > 0 ? minPrice : undefined,
    sortBy,
    sortOrder,
  };

  // Consumo del Hook useTours enlazado dinámicamente con el idioma actual (es/en)
  const { tours, loading, error, totalCount, refetch } = useTours({
    lang: locale as "es" | "en",
    page,
    limit,
    filters,
  });

  const totalPages = Math.ceil(totalCount / limit);

  // Manejador para reiniciar filtros
  const handleResetFilters = () => {
    setSearch("");
    setSelectedState("");
    setMinPrice(undefined);
    setSortBy("title");
    setSortOrder("desc");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#fea43a] text-[#031f3d] antialiased selection:bg-[#031f3d] selection:text-[#fea43a]">
      {/* HEADER HERO CON VERDE DE MARCA (#0d5757) E ÍCONOS FLOTANTES */}
      <header className="relative overflow-hidden  bg-[#0d5757] py-32 text-white border-b-4 border-[#031f3d]">
        {/* Íconos Flotantes Animados */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Compass className="absolute top-10 left-[8%] h-12 w-12 text-[#fea43a] opacity-30 animate-spin-slow" />
          <Sparkles className="absolute top-1/3 right-[10%] h-10 w-10 text-[#fea43a] opacity-40 animate-pulse" />
          <MapPin className="absolute bottom-8 left-[18%] h-8 w-8 text-emerald-200 opacity-30 animate-bounce duration-1000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#031f3d] bg-[#fea43a] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#031f3d] shadow-md">
            <Sparkles className="h-4 w-4" /> {t("hero.badge")}
          </span>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white">
            {t("hero.titleStart")}{" "}
            <span className="text-[#fea43a] underline decoration-[#031f3d] decoration-wavy">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-emerald-100 font-bold">
            {t("hero.description")}
          </p>

          {/* BANNER DE ADVERTENCIA */}
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border-2 border-[#031f3d] bg-[#fea43a] p-4 text-left shadow-lg sm:flex sm:items-center sm:gap-4 text-[#031f3d]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#031f3d] text-[#fea43a] shadow-md mb-2 sm:mb-0">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold leading-relaxed">
              <strong>{t("hero.noticeTitle")}:</strong> {t("hero.noticeText")}{" "}
              <strong>{t("hero.noticeHighlight")}</strong>. {t("hero.noticeAction")}
            </p>
          </div>
        </div>
      </header>

      {/* DIVISOR AZUL MARINO DE LÍNEA NÍTIDA */}
      <div className="h-2 w-full bg-[#031f3d]"></div>

      {/* CONTENIDO PRINCIPAL SOBRE FONDO AMARILLO (#fea43a) */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* BARRA LATERAL DE FILTROS EN TARJETA BLANCA CON ACCIONES EN AZUL (#031f3d) */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl border-4 border-[#031f3d] h-fit space-y-6">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#031f3d]/20">
              <div className="flex items-center gap-2 text-[#031f3d] font-black text-lg uppercase tracking-wide">
                <Filter className="h-5 w-5 text-[#0d5757]" />
                <span>{t("filters.title")}</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#031f3d] hover:text-[#0d5757] font-black transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> {t("filters.reset")}
              </button>
            </div>

            {/* Búsqueda por palabra clave */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-[#031f3d]">
                {t("filters.searchLabel")}
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#031f3d]/60" />
                <input
                  type="text"
                  placeholder={t("filters.searchPlaceholder")}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-3 py-2.5 text-sm font-bold border-2 border-[#031f3d] rounded-xl bg-slate-50 text-[#031f3d] outline-none transition-all focus:border-[#0d5757] focus:bg-white focus:ring-2 focus:ring-[#0d5757]/20"
                />
              </div>
            </div>

            {/* Filtro por Estado */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-[#031f3d]">
                {t("filters.stateLabel")}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#031f3d]/60 pointer-events-none" />
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 text-sm font-bold border-2 border-[#031f3d] rounded-xl bg-slate-50 text-[#031f3d] outline-none transition-all focus:border-[#0d5757] focus:bg-white focus:ring-2 focus:ring-[#0d5757]/20 appearance-none cursor-pointer"
                >
                  <option value="">{t("filters.allStates")}</option>
                  {STATES.map((st) => (
                    <option key={st.slug} value={st.slug}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtro por Precio Mínimo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-[#031f3d]">
                {t("filters.minPriceLabel")}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#031f3d]/60" />
                <input
                  type="number"
                  min="0"
                  placeholder={t("filters.minPricePlaceholder")}
                  value={minPrice ?? ""}
                  onChange={(e) => {
                    const val = e.target.value ? Number(e.target.value) : undefined;
                    setMinPrice(val);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-3 py-2.5 text-sm font-bold border-2 border-[#031f3d] rounded-xl bg-slate-50 text-[#031f3d] outline-none transition-all focus:border-[#0d5757] focus:bg-white focus:ring-2 focus:ring-[#0d5757]/20"
                />
              </div>
            </div>

            {/* Ordenamiento */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-[#031f3d]">
                {t("filters.sortLabel")}
              </label>
              <div className="relative">
                <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#031f3d]/60 pointer-events-none" />
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split("-") as [
                      "newest" | "price" | "duration" | "title",
                      "asc" | "desc"
                    ];
                    setSortBy(field);
                    setSortOrder(order);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 text-sm font-bold border-2 border-[#031f3d] rounded-xl bg-slate-50 text-[#031f3d] outline-none transition-all focus:border-[#0d5757] focus:bg-white focus:ring-2 focus:ring-[#0d5757]/20 appearance-none cursor-pointer"
                >
                  <option value="newest-desc">{t("filters.sortOptions.newest")}</option>
                  <option value="price-asc">{t("filters.sortOptions.priceAsc")}</option>
                  <option value="price-desc">{t("filters.sortOptions.priceDesc")}</option>
                  <option value="duration-asc">{t("filters.sortOptions.durationAsc")}</option>
                  <option value="duration-desc">{t("filters.sortOptions.durationDesc")}</option>
                  <option value="title-asc">{t("filters.sortOptions.titleAsc")}</option>
                  <option value="title-desc">{t("filters.sortOptions.titleDesc")}</option>
                </select>
              </div>
            </div>
          </aside>

          {/* LISTA DE TOURS Y RESULTADOS */}
          <section className="lg:col-span-3 space-y-6">
            {/* BARRA SUPERIOR DE RESULTADOS (TARJETA BLANCA CON MARCO AZUL) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-6 py-4 rounded-2xl border-4 border-[#031f3d] shadow-md">
              <span className="text-sm font-black text-[#031f3d]">
                {t("results.showing")}{" "}
                <strong className="text-[#0d5757] font-black">{tours.length}</strong> {t("results.of")}{" "}
                <strong className="text-[#0d5757] font-black">{totalCount}</strong> {t("results.experiences")}
              </span>
              <span className="text-xs bg-[#031f3d] text-[#fea43a] font-black px-4 py-1.5 rounded-full border-2 border-[#031f3d]">
                {t("results.page")} {page} {t("results.ofPage")} {totalPages || 1}
              </span>
            </div>

            {/* ESTADO DE CARGA (SKELETON EN BLANCO CON BORDES AZULES) */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-3xl h-96 animate-pulse border-4 border-[#031f3d] shadow-md"
                  />
                ))}
              </div>
            )}

            {/* ESTADO DE ERROR */}
            {!loading && error && (
              <div className="bg-rose-100 border-4 border-[#031f3d] text-[#031f3d] p-8 rounded-3xl text-center space-y-4 shadow-md">
                <AlertCircle className="h-10 w-10 text-rose-600 mx-auto" />
                <div className="space-y-1">
                  <p className="font-black text-lg">{t("states.errorTitle")}</p>
                  <p className="text-sm font-bold text-rose-900">{error}</p>
                </div>
                <button
                  onClick={refetch}
                  className="px-6 py-2.5 bg-[#031f3d] text-white text-xs font-black uppercase tracking-wider rounded-full hover:bg-[#0d5757] transition-colors shadow-md border-2 border-[#031f3d]"
                >
                  {t("states.retry")}
                </button>
              </div>
            )}

            {/* RESULTADOS VACÍOS */}
            {!loading && !error && tours.length === 0 && (
              <div className="bg-white border-4 border-[#031f3d] rounded-3xl p-12 text-center space-y-4 shadow-md">
                <div className="w-16 h-16 bg-[#fea43a] text-[#031f3d] border-2 border-[#031f3d] rounded-2xl flex items-center justify-center mx-auto text-2xl">
                  <Search className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#031f3d]">{t("states.emptyTitle")}</h3>
                  <p className="text-sm font-bold text-slate-600">{t("states.emptySubtitle")}</p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#031f3d] text-[#fea43a] text-xs font-black uppercase tracking-wider rounded-full hover:bg-[#0d5757] hover:text-white transition-colors shadow-md border-2 border-[#031f3d]"
                >
                  {t("filters.reset")}
                </button>
              </div>
            )}

            {/* GRILLA DE TARJETAS BLANCAS CON BOTONES AZULES (#031f3d) */}
            {!loading && !error && tours.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tours.map((tour) => (
                  <Link
                    key={tour.id}
                    href={`/producto/${tour.slug}`}
                  >
                    <article
                      className="group relative bg-white rounded-3xl overflow-hidden border-4 border-[#031f3d] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                    >
                      {/* IMAGEN DEL TOUR */}
                      <div className="relative h-56 w-full bg-slate-200 overflow-hidden border-b-4 border-[#031f3d]">
                        <Image
                          src={getOptimizedUrl(tour.image)}
                          alt={tour.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#031f3d]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {tour.state.toUpperCase() !== "SIN-CATEGORIZAR" && (
                          <span className="absolute top-4 left-4 bg-white text-[#031f3d] text-xs font-black px-3 py-1 rounded-full border-2 border-[#031f3d] shadow-sm flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-[#0d5757]" />
                            {tour.state.toUpperCase()}
                          </span>
                        )}

                        {tour.featured && (
                          <span className="absolute top-4 right-4 bg-[#fea43a] text-[#031f3d] border-2 border-[#031f3d] text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Zap className="h-3.5 w-3.5" />
                            {t("card.featured")}
                          </span>
                        )}
                      </div>

                      {/* DETALLES DE LA TARJETA */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-black text-slate-500">
                            {tour.durationHours > 0 && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-[#0d5757]" />
                                {tour.durationHours} {t("card.hours")}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-black text-[#031f3d] group-hover:text-[#0d5757] transition-colors line-clamp-1">
                            {tour.title}
                          </h3>

                          <p className="text-xs font-bold text-slate-600 line-clamp-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            {tour.place}
                          </p>
                        </div>

                        {/* PRECIO Y ACCIÓN (BOTÓN AZUL MARINO #031f3d) */}
                        <div className="pt-4 border-t-2 border-[#031f3d]/10 flex items-center justify-between">
                          <div>
                            {tour.price > 0 && (
                              <>
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                                  {t("card.from")}
                                </span>

                                <span className="text-2xl font-black text-[#031f3d]">
                                  ${tour.price.toLocaleString(locale === "en" ? "en-US" : "es-MX")}{" "}
                                  <small className="text-xs font-bold text-slate-500">MXN</small>
                                </span>
                              </>
                            )}
                          </div>
                          
                          {/* BOTÓN AZUL */}
                          <button
                            className="px-5 py-2.5 bg-[#031f3d] hover:bg-[#0d5757] text-[#fea43a] hover:text-white text-xs font-black rounded-full shadow-md border-2 border-[#031f3d] transition-all duration-200"
                          >
                            {t("card.viewDetails")}
                          </button>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* CONTROLES DE PAGINACIÓN */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-2.5 rounded-full bg-white border-2 border-[#031f3d] text-[#031f3d] hover:bg-[#031f3d] hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#031f3d] shadow-sm"
                  aria-label={t("pagination.prev")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 text-xs rounded-full font-black transition-all border-2 border-[#031f3d] ${
                        page === pageNum
                          ? "bg-[#031f3d] text-[#fea43a] shadow-md scale-105"
                          : "bg-white text-[#031f3d] hover:bg-[#0d5757] hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2.5 rounded-full bg-white border-2 border-[#031f3d] text-[#031f3d] hover:bg-[#031f3d] hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#031f3d] shadow-sm"
                  aria-label={t("pagination.next")}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}