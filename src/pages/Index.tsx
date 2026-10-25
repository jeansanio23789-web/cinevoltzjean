import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, ChevronRight, Flame, Home, Search, Sparkles, UserRound, Play } from "lucide-react";
import { movies, featuredMovie } from "@/data/movies";

const genres = ["Para você", "Romance", "Bilionários", "Vingança", "Turco", "Dublados"];

const Index = () => {
  const [activeGenre, setActiveGenre] = useState("Para você");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const visibleMovies = useMemo(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")) ||
      movie.genre.some((genre) => genre.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")))
    );
    return activeGenre === "Para você" ? filtered : filtered.filter((movie) =>
      movie.genre.some((genre) => genre.toLocaleLowerCase("pt-BR").includes(activeGenre.toLocaleLowerCase("pt-BR"))) ||
      (activeGenre === "Dublados" && true) ||
      (activeGenre === "Turco" && true) ||
      (activeGenre === "Bilionários" && /neon|sombras/i.test(movie.title)) ||
      (activeGenre === "Vingança" && /sombras|tempestade/i.test(movie.title)) ||
      (activeGenre === "Romance" && /maré|aurora/i.test(movie.title))
    );
  }, [activeGenre, query]);

  return (
    <main className="min-h-screen bg-[#0b0b0d] pb-24 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0b0d]/95 px-4 py-3 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f04452] text-sm">CJ</span>
            <span>Cinevoltz <span className="text-[#f04452]">Jean</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <button aria-label="Pesquisar dramas" onClick={() => setSearchOpen(!searchOpen)} className="rounded-full p-2 text-white/75 hover:bg-white/10 hover:text-white">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/login" aria-label="Minha conta" className="rounded-full border border-white/15 p-2 text-white/80 hover:bg-white/10">
              <UserRound className="h-5 w-5" />
            </Link>
          </div>
        </div>
        {searchOpen && (
          <div className="mx-auto mt-3 max-w-7xl">
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar uma minissérie..." className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[#f04452]" />
          </div>
        )}
      </header>

      <div className="mx-auto max-w-7xl">
        <section className="px-4 pt-5 md:px-10 md:pt-8">
          <div className="relative isolate min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[#1b1116] md:min-h-[390px]">
            <img src={featuredMovie.poster} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-45" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0b0d] via-[#0b0b0d]/75 to-transparent" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b0b0d]/80 via-transparent to-transparent" />
            <div className="flex min-h-[300px] max-w-2xl flex-col justify-end p-5 sm:p-8 md:min-h-[390px] md:justify-center md:p-12">
              <span className="mb-3 flex w-fit items-center gap-1.5 rounded-full bg-[#f04452]/15 px-3 py-1.5 text-xs font-bold text-[#ff7b85]">
                <Flame className="h-3.5 w-3.5" /> DRAMA EM DESTAQUE
              </span>
              <h1 className="max-w-lg text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{featuredMovie.title}</h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/70 md:text-base">{featuredMovie.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/60">
                <span className="rounded border border-white/25 px-2 py-1">{featuredMovie.rating}</span>
                <span>{featuredMovie.genre.join(" · ")}</span>
                <span>Minissérie</span>
              </div>
              <Link to="/login" className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#f04452] px-5 py-3 text-sm font-extrabold shadow-lg shadow-red-950/30 transition hover:bg-[#ff5966]">
                <Play className="h-4 w-4 fill-current" /> Começar a assistir
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 pt-7 md:px-10">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#f04452]" />
            <h2 className="text-lg font-extrabold md:text-xl">Escolha seu próximo drama</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {genres.map((genre) => (
              <button key={genre} onClick={() => setActiveGenre(genre)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition sm:text-sm ${activeGenre === genre ? "border-[#f04452] bg-[#f04452] text-white" : "border-white/10 bg-white/[0.04] text-white/65 hover:border-white/30 hover:text-white"}`}>
                {genre}
              </button>
            ))}
          </div>
        </section>

        <section className="px-4 pt-6 md:px-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f04452]">Feitos para maratonar</p>
              <h2 className="mt-1 text-xl font-black">{query ? "Resultados da busca" : activeGenre === "Para você" ? "Populares agora" : activeGenre}</h2>
            </div>
            <span className="text-xs text-white/45">{visibleMovies.length} títulos</span>
          </div>
          {visibleMovies.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {visibleMovies.map((movie, index) => (
                <article key={movie.id} className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#141417] transition duration-300 hover:-translate-y-1 hover:border-white/25">
                  <div className="relative aspect-[3/4.2] overflow-hidden bg-white/5">
                    <img src={movie.poster} alt={movie.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />
                    <span className="absolute left-2 top-2 rounded-md bg-[#f04452] px-2 py-1 text-[10px] font-black uppercase tracking-wide">EP. {index + 1} grátis</span>
                    <span className="absolute bottom-3 left-3 right-3 line-clamp-2 text-base font-extrabold leading-tight">{movie.title}</span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 p-2 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"><Play className="h-4 w-4 fill-current" /></span>
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-1 text-xs text-white/55">{movie.genre.join(" · ")}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-[#ff7b85]">Comece grátis</span>
                      <button aria-label={`Adicionar ${movie.title} à lista`} className="rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"><Bookmark className="h-4 w-4" /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-12 text-center text-sm text-white/55">Nenhum drama encontrado. Tente outro título ou categoria.</div>
          )}
        </section>

        <section className="mx-4 mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-[#211015] to-[#151519] p-5 md:mx-10 md:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff7b85]">Sua próxima maratona</p>
            <h2 className="mt-1 text-lg font-black">Novos episódios, novas emoções.</h2>
            <p className="mt-1 text-sm text-white/55">Entre na sua conta para acompanhar sua lista.</p>
          </div>
          <Link to="/login" className="shrink-0 rounded-xl bg-white px-4 py-3 text-xs font-extrabold text-black transition hover:bg-white/85">Entrar <ChevronRight className="ml-1 inline h-4 w-4" /></Link>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b0b0d]/95 px-4 pb-[max(env(safe-area-inset-bottom),10px)] pt-2 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around">
          <Link to="/" className="flex flex-col items-center gap-1 px-4 py-1 text-[#ff5966]"><Home className="h-5 w-5" /><span className="text-[10px] font-bold">Início</span></Link>
          <button onClick={() => { setSearchOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex flex-col items-center gap-1 px-4 py-1 text-white/55"><Search className="h-5 w-5" /><span className="text-[10px]">Buscar</span></button>
          <Link to="/planos" className="flex flex-col items-center gap-1 px-4 py-1 text-white/55"><Sparkles className="h-5 w-5" /><span className="text-[10px]">VIP</span></Link>
          <Link to="/login" className="flex flex-col items-center gap-1 px-4 py-1 text-white/55"><UserRound className="h-5 w-5" /><span className="text-[10px]">Minha conta</span></Link>
        </div>
      </nav>
    </main>
  );
};

export default Index;
