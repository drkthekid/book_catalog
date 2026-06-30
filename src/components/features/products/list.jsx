"use client";

import { useMemo, useRef, useState } from "react";
import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { CATEGORIES, PRODUCTS_LIST } from "@/lib/products";
import { cn } from "@/lib/utils";
import { BookOpenCheck, CheckCircle2, Search, SlidersHorizontal } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductList1 = ({ className }) => {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const sectionRefs = useRef({});

  const counts = useMemo(() => {
    const map = { todos: PRODUCTS_LIST.length };
    for (const item of PRODUCTS_LIST) {
      map[item.category] = (map[item.category] || 0) + 1;
    }
    return map;
  }, []);

  const categorySections = useMemo(
    () =>
      CATEGORIES.filter((c) => c.id !== "todos").map((category) => ({
        ...category,
        products: PRODUCTS_LIST.filter((item) => item.category === category.id),
      })),
    []
  );

  const filteredSections = useMemo(() => {
    const term = search.trim().toLowerCase();
    return categorySections
      .map((section) => ({
        ...section,
        products: section.products.filter((item) => {
          if (!term) return true;
          return (
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
          );
        }),
      }))
      .filter(
        (section) =>
          section.products.length > 0 &&
          (activeCategory === "todos" || activeCategory === section.id)
      );
  }, [activeCategory, categorySections, search]);

  const totalCount = useMemo(
    () => filteredSections.reduce((sum, s) => sum + s.products.length, 0),
    [filteredSections]
  );

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setSheetOpen(false);

    setTimeout(() => {
      if (id === "todos") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = sectionRefs.current[id];
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section className={cn("w-full bg-background py-8 sm:py-14", className)}>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* Painel de busca */}
        <div className="mb-8 rounded-2xl border border-ink/10 bg-background p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink">
                Buscar
              </p>
              <p className="mt-0.5 text-[11px] text-ink-soft">
                Pesquise por título ou descrição
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-terracotta/20 bg-terracotta/[0.06] px-3 py-1.5 font-display text-sm font-semibold text-terracotta-deep">
              {totalCount} {totalCount === 1 ? "livro" : "livros"}
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[15px] -translate-y-1/2 text-ink-soft/50" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar..."
                className="w-full rounded-xl border border-ink/10 bg-background py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-soft/50 focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              />
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button className="sm:hidden inline-flex items-center gap-1.5 rounded-xl border border-ink/10 bg-background px-3.5 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-terracotta/40 hover:text-terracotta">
                  <SlidersHorizontal className="size-4" />
                  Filtrar
                  {activeCategory !== "todos" && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[9px] font-bold text-paper">
                      1
                    </span>
                  )}
                </button>
              </SheetTrigger>

              <SheetContent side="bottom" className="rounded-t-2xl bg-background px-0 pb-8">
                <SheetHeader className="border-b border-ink/10 px-6 pb-4 pt-2">
                  <SheetTitle className="font-display text-base font-semibold text-ink">
                    Filtrar por categoria
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-2 flex flex-col gap-1 px-4 pt-2">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    const count = counts[cat.id] || 0;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-all",
                          isActive
                            ? "bg-terracotta/10 font-semibold text-terracotta-deep"
                            : "text-ink-soft hover:bg-paper-soft hover:text-ink"
                        )}
                      >
                        <span>{cat.label}</span>
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                            isActive
                              ? "bg-terracotta/20 text-terracotta-deep"
                              : "bg-ink/5 text-ink-soft"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Chips de categoria — só no desktop */}
          <div className="mt-4 hidden gap-2 sm:flex sm:flex-wrap">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = counts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all",
                    isActive
                      ? "border-terracotta bg-terracotta/10 font-semibold text-terracotta-deep"
                      : "border-ink/10 bg-paper text-ink-soft hover:border-ink/25 hover:text-ink"
                  )}
                >
                  {cat.label}
                  <span
                    className={cn(
                      "min-w-[18px] rounded-full px-1.5 py-0.5 text-center text-[10px] font-semibold leading-none",
                      isActive
                        ? "bg-terracotta/20 text-terracotta-deep"
                        : "bg-ink/5 text-ink-soft"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carrosséis por categoria */}
        <div className="space-y-10 sm:space-y-14">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <div
                key={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el; }}
                className="space-y-4 scroll-mt-24"
              >
                <div className="flex items-baseline justify-between border-b border-dashed border-ink/15 pb-2.5">
                  <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                    {section.label}
                  </h2>
                  <p className=" text-xs text-ink-soft">
                    {section.products.length}{" "}
                    {section.products.length === 1 ? "livro" : "livros"}
                  </p>
                </div>

                <div className="relative">
                  <Carousel
                    opts={{ align: "start", slidesToScroll: 1, dragFree: true }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-3 sm:-ml-4">
                      {section.products.map((item) => (
                        <CarouselItem
                          key={item.slug}
                          className="basis-[72%] pl-3 sm:basis-1/2 sm:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                        >
                          <ProductCard {...item} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious className="hidden sm:flex -left-4 size-9 rounded-full border border-ink/10 bg-background text-ink shadow-md hover:bg-background hover:text-terracotta lg:-left-5" />
                    <CarouselNext className="hidden sm:flex -right-4 size-9 rounded-full border border-ink/10 bg-background text-ink shadow-md hover:bg-background hover:text-terracotta lg:-right-5" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center sm:hidden">
                      <div className="flex h-full items-center bg-gradient-to-l from-paper-soft via-paper-soft/70 to-transparent pl-8 pr-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 bg-background text-ink-soft shadow-sm">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-3.5"><polyline points="9 18 15 12 9 6" /></svg>
                        </span>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
            ))
          ) : (
            <p className="py-20 text-center  text-sm text-ink-soft">
              Nenhum livro encontrado para essa busca.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({
  name,
  description,
  slug,
  image,
  badge,
  hardcover,
  noMarks,
  volumes,
  price,
}) => {
  const { regular, sale, currency } = price;
  const isCollection = !!volumes;

  return (
    <Link href={`/product/${slug}`} className="group block h-full w-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-background p-0 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-ink/10">

        {/* Imagem */}
        <CardHeader className="relative shrink-0 p-0">
          <div
            className="relative w-full overflow-hidden rounded-t-2xl"
            style={{
              paddingBottom: "100%",
              backgroundColor: isCollection ? "var(--color-paper-soft, #f5f0ea)" : undefined,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                "absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04]",
                isCollection
                  ? "object-contain object-center p-4"
                  : "object-cover object-top"
              )}
            />
            {/* Gradiente sutil na base para facilitar leitura do preço */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {badge && (
            <Badge
              style={{ backgroundColor: badge.color }}
              className="absolute left-3 top-3 rounded-sm border-0  text-[10px] font-semibold uppercase tracking-wide text-paper shadow"
            >
              {badge.text}
            </Badge>
          )}

          {/* Badge de coleção/box */}
          {volumes && (
            <div className="absolute right-2.5 top-2.5 flex flex-col items-center justify-center rounded-full border border-terracotta/30 bg-background px-2 py-1.5 shadow-md min-w-[40px]">
              <span className="font-display text-[11px] font-bold leading-none text-terracotta-deep">
                {volumes.from}–{volumes.to}
              </span>
              <span className="mt-0.5 text-[6px] font-bold uppercase tracking-widest text-ink-soft/60">
                vol
              </span>
            </div>
          )}
        </CardHeader>

        {/* Conteúdo */}
        <CardContent className="flex flex-1 flex-col gap-2 px-3.5 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-3.5">
          <CardTitle className="font-display text-[14px] font-semibold leading-snug text-ink sm:text-[15px] line-clamp-2">
            {name}
          </CardTitle>

          {(hardcover || noMarks) && (
            <div className="flex flex-wrap gap-1">
              {hardcover && (
                <span className="inline-flex items-center gap-1 rounded-full border border-terracotta/25 bg-terracotta/[0.06] px-2 py-0.5 text-[10px] font-semibold text-terracotta-deep">
                  <BookOpenCheck className="size-2.5" />
                  Capa dura
                </span>
              )}
              {noMarks && (
                <span className="inline-flex items-center gap-1 rounded-full border border-sage/30 bg-sage/[0.07] px-2 py-0.5 text-[10px] font-semibold text-sage">
                  <CheckCircle2 className="size-2.5" />
                  Sem rasuras
                </span>
              )}
            </div>
          )}

          <CardDescription className="line-clamp-2  text-[12px] leading-relaxed text-ink-soft sm:text-[13px]">
            {description}
          </CardDescription>

          <div className="mt-auto flex items-end justify-between gap-1 border-t border-dashed border-ink/12 pt-3">
            <Price onSale={sale != null} className="flex flex-col font-display">
              <PriceValue
                price={sale ?? regular}
                currency={currency}
                variant={sale != null ? "sale" : "regular"}
                locale="pt-BR"
                className="text-xl font-extrabold leading-none tracking-tight text-terracotta-deep sm:text-2xl"
              />
              {sale != null && (
                <PriceValue
                  price={regular}
                  currency={currency}
                  variant="regular"
                  locale="pt-BR"
                  className="mt-0.5  text-xs font-normal text-ink-soft line-through opacity-60"
                />
              )}
            </Price>
            <span className="mb-0.5 shrink-0  text-[11px] font-semibold text-terracotta">
              Ver →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { ProductList1 };