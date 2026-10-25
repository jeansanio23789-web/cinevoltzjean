import { useMemo, useState } from "react";
import { Search, House, Compass, Bookmark, UserRound, Play, Flame, Clock3, ChevronRight, X } from "lucide-react";
import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";
import poster5 from "@/assets/poster-5.jpg";
import poster6 from "@/assets/poster-6.jpg";
import poster7 from "@/assets/poster-7.jpg";
import poster8 from "@/assets/poster-8.jpg";

type Drama = { id: number; title: string; tagline: string; poster: string; category: string; episodes: number; badge?: string };
const dramas: Drama[] = [
  { id: 1, title: "Contrato com o CEO", tagline: "Um acordo falso. Sentimentos reais.", poster: poster1, category: "Romance", episodes: 62, badge: "🔥 Em alta" },
  { id: 2, title: "A Herdeira Secreta", tagline: "Ela voltou para recuperar tudo.", poster: poster2, category: "Drama", episodes: 48, badge: "Novo" },
  { id: 3, title: "Amor por Engano", tagline: "O destino mudou os planos dos dois.", poster: poster3, category: "Romance", episodes: 71 },
  { id: 4, title: "Minha Doce Vingança", tagline: "Subestimaram a mulher errada.", poster: poster4, category: "Vingança", episodes: 55, badge: "🔥 Popular" },
  { id: 5, title: "Casada com Meu Chefe", tagline: "Uma proposta impossível de recusar.", poster: poster5, category: "Romance", episodes: 64 },
  { id: 6, title: "O Segredo da Família", tagline: "Toda família esconde alguma coisa.", poster: poster6, category: "Drama", episodes: 43 },
  { id: 7, title: "A Rainha do Jogo", tagline: "Desta vez, ela dita as regras.", poster: poster7, category: "Vingança", episodes: 59, badge: "Mais visto" },
  { id: 8, title: "Entre Dois Amores", tagline: "Seu coração terá que escolher.", poster: poster8, category: "Romance", episodes: 50 },
];
const categories = ["Para você", "Romance", "Drama", "Vingança"];

const Index = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Para você");
  const [activeDrama, setActiveDrama] = useState<Drama | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const filtered = useMemo(() => dramas.filter((d) =>
    (category === "Para você" || d.category === category) &&
    (d.title.toLowerCase().includes(query.toLowerCase()) || d.tagline.toLowerCase().includes(query.toLowerCase()))
  ), [query, category]);

  const toggleSaved = (id: number) => setSaved((current) =>
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  );

  return (
    <main className="min-h-screen bg-[#09090b] text-white pb-24 md:pb-10">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090b]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
          <a href="/" className="shrink-0 text-xl font-black tracking-tight text-rose-500 md:text-2xl">CINE<span className="text-white">VOLTZ</span></a>
          <nav className="hidden items-center gap-6 pl-6 text-sm font-semibold text-white/65 md:flex">
            <a className="text-white" href="#inicio">Início</a>
            <a href="#catalogo" className="transition hover:text-white">Curtas</a>
            <a href="#catalogo" className="transition hover:text-white">Novidades</a>
            <a href="#minha-lista" className="transition hover:text-white">Minha lista</a>
          </nav>
          <div className="ml-auto flex w-full max-w-xs items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 focus-within:border-rose-500/70">
            <Search size={17} className="shrink-0 text-white/45" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar minissérie..." aria-label="Buscar minissérie" className="w-full bg-transparent text-sm outline-none placeholder:text-white/40" />
            {query && <button aria-label="Limpar busca" onClick={() => setQuery("")}><X size={15} /></button>}
          </div>
          <a href="/login" aria-label="Minha conta" className="hidden h-9 w-9 items-center justify-center rounded-full bg-white/10 md:flex"><UserRound size={18} /></a>
        </div>
      </header>

      <section id="inicio" className="relative mx-auto max-w-7xl overflow-hidden px-4 pt-7 md:px-8 md:pt-10">
        <div className="relative min-h-[390px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-rose-950 via-[#24101b] to-[#111114] md:min-h-[430px]">
          <img src={poster1} alt="" className="absolute inset-y-0 right-0 h-full w-[65%] object-cover opacity-55 [mask-image:linear-gradient(to_right,transparent,black_40%)] md:w-[55%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#130a10] via-[#130a10]/90 to-transparent" />
          <div className="relative z-10 flex min-h-[390px] max-w-2xl flex-col justify-end p-6 pb-8 md:min-h-[430px] md:p-12">
            <span className="mb-4 flex w-fit items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-200"><Flame size={14} /> HISTÓRIAS QUE PRENDEM</span>
            <h1 className="max-w-xl text-4xl font-black leading-[1.04] md:text-6xl">Só mais um episódio.<br/><span className="text-rose-400">Você vai ver.</span></h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65 md:text-base">Romances intensos, reviravoltas e histórias curtas para assistir quando quiser.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setActiveDrama(dramas[0])} className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-extrabold transition hover:bg-rose-500"><Play size={17} fill="currentColor" /> Começar a assistir</button>
              <button onClick={() => toggleSaved(dramas[0].id)} className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/15">{saved.includes(dramas[0].id) ? "✓ Na minha lista" : "+ Minha lista"}</button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-4 pt-8 md:px-8 md:pt-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-rose-400">Seu próximo vício</p><h2 className="text-2xl font-black md:text-3xl">{query ? "Resultados da busca" : "Minisséries para você"}</h2></div>
          <span className="text-sm text-white/45">{filtered.length} histórias</span>
        </div>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? "bg-white text-black" : "border border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/10"}`}>{item}</button>)}
        </div>
        {filtered.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((drama, index) => <article key={drama.id} className="group min-w-0">
            <button onClick={() => setActiveDrama(drama)} className="relative block w-full overflow-hidden rounded-2xl bg-white/5 text-left ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-rose-500/70">
              <div className="aspect-[3/4.2] overflow-hidden"><img src={drama.poster} alt={drama.title} loading={index > 3 ? "lazy" : "eager"} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/15" />
              {drama.badge && <span className="absolute left-2 top-2 rounded-md bg-rose-600 px-2 py-1 text-[10px] font-extrabold">{drama.badge}</span>}
              <span className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-xs font-bold"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black"><Play size={14} fill="currentColor" /></span><span>Ver história</span></span>
            </button>
            <div className="flex items-start justify-between gap-2 pt-3">
              <div className="min-w-0"><h3 className="truncate text-sm font-extrabold">{drama.title}</h3><p className="mt-1 text-xs text-white/45">{drama.category} · {drama.episodes} episódios</p></div>
              <button id={drama.id === 1 ? "minha-lista" : undefined} aria-label={saved.includes(drama.id) ? "Remover da minha lista" : "Adicionar à minha lista"} onClick={() => toggleSaved(drama.id)} className={`rounded-lg p-1.5 transition ${saved.includes(drama.id) ? "text-rose-400" : "text-white/45 hover:text-white"}`}><Bookmark size={17} fill={saved.includes(drama.id) ? "currentColor" : "none"} /></button>
            </div>
          </article>)}
        </div> : <div className="rounded-2xl border border-white/10 p-10 text-center text-white/55">Nenhuma minissérie encontrada. Tente outro título.</div>}
      </section>

      {saved.length > 0 && <section className="mx-auto max-w-7xl px-4 pt-10 md:px-8"><h2 className="mb-4 text-xl font-black">Minha lista <span className="text-sm font-medium text-white/40">({saved.length})</span></h2><div className="flex flex-wrap gap-2">{dramas.filter(d => saved.includes(d.id)).map(d => <button key={d.id} onClick={() => setActiveDrama(d)} className="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-bold">{d.title}</button>)}</div></section>}

      <footer className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-white/10 px-4 py-7 text-xs text-white/35 md:px-8"><span className="font-black tracking-wide text-white/60">CINEVOLTZ</span><span>Suas histórias favoritas, em um só lugar.</span></footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-white/10 bg-[#09090b]/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
        <a href="#inicio" className="flex flex-col items-center gap-1 text-rose-400"><House size={20}/><span className="text-[10px] font-bold">Início</span></a>
        <a href="#catalogo" className="flex flex-col items-center gap-1 text-white/55"><Compass size={20}/><span className="text-[10px]">Explorar</span></a>
        <a href="#minha-lista" className="flex flex-col items-center gap-1 text-white/55"><Bookmark size={20}/><span className="text-[10px]">Minha lista</span></a>
        <a href="/login" className="flex flex-col items-center gap-1 text-white/55"><UserRound size={20}/><span className="text-[10px]">Perfil</span></a>
      </nav>

      {activeDrama && <div role="dialog" aria-modal="true" aria-label={activeDrama.title} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setActiveDrama(null)}>
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#151518] shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setActiveDrama(null)} aria-label="Fechar" className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2"><X size={18}/></button>
          <img src={activeDrama.poster} alt={activeDrama.title} className="h-56 w-full object-cover opacity-85"/>
          <div className="p-6"><p className="text-xs font-bold uppercase tracking-widest text-rose-400">{activeDrama.category} · {activeDrama.episodes} episódios</p><h2 className="mt-2 text-2xl font-black">{activeDrama.title}</h2><p className="mt-2 text-sm text-white/60">{activeDrama.tagline}</p><div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/65"><Clock3 size={17} className="mb-2 text-rose-400"/>Página de detalhes pronta para receber os episódios e os links de vídeo autorizados desta minissérie.</div><button onClick={() => toggleSaved(activeDrama.id)} className="mt-4 w-full rounded-full bg-rose-600 py-3 font-extrabold hover:bg-rose-500">{saved.includes(activeDrama.id) ? "✓ Salva na minha lista" : "+ Adicionar à minha lista"}</button></div>
        </div>
      </div>}
    </main>
  );
};

export default Index;
