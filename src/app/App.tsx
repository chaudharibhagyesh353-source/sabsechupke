import { useState, useEffect } from "react";
import {
  Search, ChevronDown, Eye, EyeOff, Play, Pause,
  Share2, Star, ArrowLeft, Volume2, Maximize2,
  TrendingUp, Zap, Clock, SkipForward, Settings,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  views: string;
  genre: string;
  duration: string;
  img: string;
  desc: string;
};

// ── Data ──────────────────────────────────────────────────────────────────

const ALL_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Neon Shadows",
    year: 2024,
    rating: 8.2,
    views: "2.4M",
    genre: "Thriller",
    duration: "2h 18m",
    img: "photo-1489599849927-2ee91cede3ba",
    desc: "A rogue intelligence operative uncovers a global surveillance conspiracy buried inside civilian streaming networks.",
  },
  {
    id: 2,
    title: "The Midnight Protocol",
    year: 2023,
    rating: 7.9,
    views: "1.8M",
    genre: "Action",
    duration: "1h 52m",
    img: "photo-1536440136628-849c177e76a1",
    desc: "When the world's most dangerous weapon vanishes, only one disgraced operative knows where it's hidden.",
  },
  {
    id: 3,
    title: "Ghost Frequency",
    year: 2024,
    rating: 8.5,
    views: "3.1M",
    genre: "Sci-Fi",
    duration: "2h 05m",
    img: "photo-1518770660439-4636190af475",
    desc: "Scientists detect an anomalous signal from deep space — one that has been broadcasting for 40,000 years.",
  },
  {
    id: 4,
    title: "Crimson Veil",
    year: 2023,
    rating: 7.6,
    views: "998K",
    genre: "Horror",
    duration: "1h 44m",
    img: "photo-1550745165-9bc0b252726f",
    desc: "A small-town detective investigates ritualistic crimes linked to an ancient cult hidden in plain sight.",
  },
  {
    id: 5,
    title: "Phantom Signal",
    year: 2024,
    rating: 8.8,
    views: "4.2M",
    genre: "Mystery",
    duration: "2h 31m",
    img: "photo-1574267432553-4b4628081c31",
    desc: "In a city where data is currency, one hacker holds the key to every person's deepest secret.",
  },
  {
    id: 6,
    title: "Dark Meridian",
    year: 2022,
    rating: 7.4,
    views: "756K",
    genre: "Drama",
    duration: "1h 58m",
    img: "photo-1562408590-e32931084e23",
    desc: "Two estranged siblings reunite after a decade to unravel the truth behind their father's disappearance.",
  },
  {
    id: 7,
    title: "Void Protocol",
    year: 2024,
    rating: 9.1,
    views: "5.7M",
    genre: "Action",
    duration: "2h 45m",
    img: "photo-1516571748831-5d81767b788d",
    desc: "A black-ops soldier discovers the mission she has been running for years has been erasing her own memories.",
  },
  {
    id: 8,
    title: "Obsidian Gate",
    year: 2023,
    rating: 7.8,
    views: "1.2M",
    genre: "Fantasy",
    duration: "2h 22m",
    img: "photo-1440404653325-ab127d49abc1",
    desc: "An ancient portal reopens beneath a modern city, tearing through the fabric between two worlds.",
  },
  {
    id: 9,
    title: "Static Silence",
    year: 2024,
    rating: 8.0,
    views: "2.9M",
    genre: "Thriller",
    duration: "1h 49m",
    img: "photo-1478720568477-152d9b164e26",
    desc: "A sound engineer recording a documentary discovers a hidden frequency that pushes people to madness.",
  },
  {
    id: 10,
    title: "The Last Cipher",
    year: 2022,
    rating: 7.7,
    views: "1.4M",
    genre: "Spy",
    duration: "2h 03m",
    img: "photo-1431608660976-4fe5bcc2112c",
    desc: "The most encrypted message in history surfaces after 50 years — and every intelligence agency wants it.",
  },
  {
    id: 11,
    title: "Apex Predator",
    year: 2024,
    rating: 8.3,
    views: "3.4M",
    genre: "Action",
    duration: "2h 11m",
    img: "photo-1523207911345-32501502db22",
    desc: "A marine biologist dives into uncharted ocean depths and discovers a creature that rewrites evolution.",
  },
  {
    id: 12,
    title: "Eclipse Rising",
    year: 2023,
    rating: 8.6,
    views: "2.1M",
    genre: "Sci-Fi",
    duration: "2h 38m",
    img: "photo-1545162677-4f70b0d14a51",
    desc: "Earth's last defense grid falls silent. Three people hold override codes — and only one is telling the truth.",
  },
];

const FRESHLY_UPLOADED = ALL_MOVIES.slice(0, 6);
const TOP_HIDDEN_GEMS = ALL_MOVIES.slice(6, 12);
const TRENDING_NOW = [ALL_MOVIES[4], ALL_MOVIES[6], ALL_MOVIES[2], ALL_MOVIES[0], ALL_MOVIES[10], ALL_MOVIES[11]];
const CATEGORIES = ["Action", "Thriller", "Sci-Fi", "Horror", "Drama", "Mystery", "Fantasy", "Spy", "Romance", "Documentary"];

function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

// ── Navbar ────────────────────────────────────────────────────────────────

function Navbar({
  incognito,
  onToggle,
  onHome,
}: {
  incognito: boolean;
  onToggle: () => void;
  onHome: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_2px_32px_rgba(0,0,0,0.7)]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3 sm:gap-5">

        {/* Logo */}
        <button
          onClick={onHome}
          className="flex-shrink-0 flex items-center gap-0.5 group select-none"
        >
          <span className="text-[#39FF14] text-xl sm:text-[22px] font-rajdhani font-bold tracking-[0.1em] group-hover:opacity-80 transition-opacity">
            SABSE
          </span>
          <span className="text-white text-xl sm:text-[22px] font-rajdhani font-bold tracking-[0.1em] group-hover:opacity-80 transition-opacity">
            CHUPKE
          </span>
          <span className="ml-1.5 w-[7px] h-[7px] rounded-full bg-[#39FF14] animate-pulse flex-shrink-0" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-[260px] hidden sm:block">
          {searchOpen ? (
            <input
              autoFocus
              onBlur={() => setSearchOpen(false)}
              placeholder="Search movies, genres..."
              className="w-full bg-[#1F1F2E] border border-[#39FF14]/25 rounded-full px-4 py-1.5 text-sm text-white placeholder-[#7A7A8C] outline-none focus:border-[#39FF14]/55 transition-colors font-dm-sans"
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-[#7A7A8C] hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm font-dm-sans">Search</span>
            </button>
          )}
        </div>

        {/* Mobile search */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="sm:hidden text-[#7A7A8C] hover:text-white transition-colors"
        >
          <Search className="w-4.5 h-4.5" />
        </button>

        <div className="flex items-center gap-2 ml-auto">
          {/* Categories */}
          <div className="relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-sm text-[#7A7A8C] hover:text-white transition-all font-dm-sans"
            >
              <span className="hidden sm:inline">Browse</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
              />
            </button>
            {catOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#1A1A28]/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                <p className="px-4 py-1.5 text-[10px] font-mono text-[#7A7A8C] tracking-widest uppercase">
                  Genres
                </p>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCatOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-[#E4E4EC] hover:text-[#39FF14] hover:bg-white/5 transition-colors font-dm-sans"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Incognito */}
          <button
            onClick={onToggle}
            title={incognito ? "Disable Incognito" : "Enable Incognito Mode"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-mono transition-all ${
              incognito
                ? "border-[#9D4EDD]/60 bg-[#9D4EDD]/15 text-[#9D4EDD] shadow-[0_0_16px_rgba(157,78,221,0.2)]"
                : "border-white/10 bg-white/[0.04] text-[#7A7A8C] hover:text-white hover:border-white/20"
            }`}
          >
            {incognito ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-xs tracking-wide">
              {incognito ? "Incognito" : "Normal"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── Ad slots ──────────────────────────────────────────────────────────────

function AdLabel({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-mono tracking-[0.18em] text-[#39FF14]/35 uppercase">
        Advertisement
      </span>
      <span className="text-[10px] font-mono text-[#7A7A8C]/40">{label}</span>
    </div>
  );
}

function LeaderboardAd() {
  return (
    <div className="w-full max-w-[728px] mx-auto h-[90px] flex items-center justify-center border border-dashed border-[#39FF14]/18 rounded-lg bg-[#1F1F2E]/40 relative overflow-hidden">
      <AdLabel label="728 × 90 — Leaderboard" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#9D4EDD]/5 via-transparent to-[#39FF14]/5 pointer-events-none" />
    </div>
  );
}

function MidPageAd() {
  return (
    <div className="w-full max-w-[970px] mx-auto h-[120px] sm:h-[250px] flex items-center justify-center border border-dashed border-[#9D4EDD]/25 rounded-2xl bg-[#1F1F2E]/40 relative overflow-hidden">
      <AdLabel label="970 × 250 — Billboard" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#9D4EDD]/8 via-transparent to-[#39FF14]/4 pointer-events-none" />
    </div>
  );
}

function SidebarAd() {
  return (
    <div className="w-full xl:w-[300px] flex-shrink-0 h-[250px] flex items-center justify-center border border-dashed border-[#9D4EDD]/25 rounded-2xl bg-[#1F1F2E]/40 relative overflow-hidden">
      <AdLabel label="300 × 250 — Rectangle" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#9D4EDD]/8 to-transparent pointer-events-none" />
    </div>
  );
}

// ── Movie Card ────────────────────────────────────────────────────────────

function MovieCard({ movie, onClick }: { movie: Movie; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex-shrink-0 w-[148px] sm:w-[168px] rounded-xl overflow-hidden bg-[#1F1F2E] cursor-pointer transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(57,255,20,0.18)] text-left focus:outline-none"
    >
      <div className="relative w-full aspect-[2/3] bg-[#1A1A28]">
        <img
          src={unsplash(movie.img, 336, 504)}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* hover overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-[#39FF14] flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.6)]">
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
          </div>
        </div>
        {/* genre badge */}
        <span className="absolute top-2 left-2 text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-[#9D4EDD]/85 text-white tracking-wider">
          {movie.genre}
        </span>
        {/* rating */}
        <span className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/65 px-1.5 py-0.5 rounded-md">
          <Star className="w-2.5 h-2.5 text-[#39FF14] fill-[#39FF14]" />
          <span className="text-[10px] font-mono text-white">{movie.rating}</span>
        </span>
        {/* bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#1F1F2E] to-transparent" />
      </div>
      <div className="px-3 pb-3 pt-1.5">
        <p className="text-white text-xs font-rajdhani font-semibold leading-snug truncate">
          {movie.title}
        </p>
        <p className="text-[#7A7A8C] text-[10px] mt-0.5 font-mono">
          {movie.year} · {movie.duration}
        </p>
      </div>
    </button>
  );
}

// ── Movie Row ─────────────────────────────────────────────────────────────

function MovieRow({
  title,
  icon,
  movies,
  onSelect,
}: {
  title: string;
  icon: React.ReactNode;
  movies: Movie[];
  onSelect: (m: Movie) => void;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4 px-4 sm:px-6">
        <span className="text-[#39FF14]">{icon}</span>
        <h2 className="text-lg sm:text-xl font-rajdhani font-semibold text-white tracking-wide">
          {title}
        </h2>
        <div className="flex-1 h-px bg-[#39FF14]/8 ml-3" />
        <button className="text-[#39FF14]/50 text-[11px] font-mono hover:text-[#39FF14] transition-colors flex-shrink-0">
          See All →
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 sm:px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} onClick={() => onSelect(m)} />
        ))}
      </div>
    </section>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────

function HeroSection({ movie, onWatch }: { movie: Movie; onWatch: () => void }) {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[620px] flex flex-col overflow-hidden bg-[#0B0B0F]">
      {/* Backdrop */}
      <img
        src={unsplash("photo-1536440136628-849c177e76a1", 1600, 800)}
        alt="Featured backdrop"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-[#0B0B0F]/25" />

      {/* Leaderboard ad */}
      <div className="relative z-10 pt-5 px-4 sm:px-8 flex justify-center">
        <LeaderboardAd />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-end px-6 sm:px-12 lg:px-16 pb-12 sm:pb-20 pt-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#39FF14]/15 border border-[#39FF14]/30 text-[#39FF14] tracking-[0.15em] uppercase">
              {movie.genre}
            </span>
            <span className="text-[11px] font-mono text-[#7A7A8C] tracking-widest uppercase">
              Free Streaming
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-rajdhani font-bold text-white leading-[0.95] tracking-[-0.01em] mb-4">
            {movie.title}
          </h1>

          <p className="text-[#7A7A8C] text-sm sm:text-[15px] leading-relaxed mb-4 font-dm-sans max-w-md">
            {movie.desc}
          </p>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 mb-7 text-[11px] font-mono text-[#7A7A8C]">
            <span className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-[#39FF14] fill-[#39FF14]" />
              {movie.rating}/10
            </span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {movie.views} views
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onWatch}
              className="group flex items-center gap-3 px-7 py-3.5 bg-[#39FF14] hover:bg-[#39FF14]/90 text-black font-rajdhani font-bold text-[17px] tracking-wide rounded-full transition-all duration-200 hover:shadow-[0_0_36px_rgba(57,255,20,0.5)] active:scale-95"
            >
              <Play className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
              Watch Now (Free)
            </button>
            <button className="flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/10 text-white font-dm-sans text-sm transition-all">
              + Watchlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Video Player ──────────────────────────────────────────────────────────

function VideoPlayer({ movie }: { movie: Movie }) {
  const [adPlaying, setAdPlaying] = useState(true);
  const [adSeconds, setAdSeconds] = useState(5);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (!adPlaying || adSeconds <= 0) return;
    const t = setTimeout(() => setAdSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [adPlaying, adSeconds]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress((p) => Math.min(p + 0.05, 100)), 200);
    return () => clearInterval(t);
  }, [playing]);

  const skipAd = () => {
    setAdPlaying(false);
    setPlaying(true);
  };

  const elapsed = (() => {
    const totalSec = Math.floor((progress / 100) * 138 * 60);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  })();

  return (
    <div
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] group cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={() => !adPlaying && setPlaying((p) => !p)}
    >
      {/* Poster / frame */}
      <img
        src={unsplash(movie.img, 1280, 720)}
        alt={movie.title}
        className={`w-full h-full object-cover transition-all duration-700 ${
          adPlaying ? "blur-sm scale-105 brightness-50" : "blur-0 scale-100 brightness-75"
        }`}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* ── AD OVERLAY ── */}
      {adPlaying && (
        <div className="absolute inset-0 flex flex-col">
          {/* Top ad label bar */}
          <div className="flex items-center gap-2 px-4 pt-3">
            <span className="bg-[#39FF14] text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded tracking-wider">
              AD
            </span>
            <span className="text-white/80 text-xs font-dm-sans">
              Your ad will end soon
            </span>
          </div>

          {/* Bottom bar */}
          <div className="mt-auto flex items-end justify-between px-4 pb-4 sm:px-6 sm:pb-6 bg-gradient-to-t from-black/80 to-transparent pt-16">
            <div className="flex flex-col gap-1">
              <p className="text-white text-sm sm:text-base font-dm-sans font-medium">
                Ad playing — Movie starts in{" "}
                <span className="text-[#39FF14] font-mono font-bold">
                  {adSeconds > 0 ? `${adSeconds}s` : "now"}
                </span>
              </p>
              <p className="text-white/40 text-[11px] font-mono">
                {movie.title} · {movie.duration}
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); if (adSeconds <= 0) skipAd(); }}
              className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-lg font-mono text-xs transition-all ${
                adSeconds <= 0
                  ? "border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14]/10 cursor-pointer shadow-[0_0_12px_rgba(57,255,20,0.3)]"
                  : "border-[#7A7A8C]/40 text-[#7A7A8C]/60 cursor-not-allowed"
              }`}
            >
              <SkipForward className="w-3.5 h-3.5" />
              {adSeconds > 0 ? `Skip in ${adSeconds}s` : "Skip Ad"}
            </button>
          </div>
        </div>
      )}

      {/* ── PLAYBACK OVERLAY ── */}
      {!adPlaying && (
        <>
          {/* Big center play/pause */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              showControls || !playing ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:border-white/40 transition-colors">
              {playing ? (
                <Pause className="w-6 h-6 text-white fill-white" />
              ) : (
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              )}
            </div>
          </div>

          {/* Controls bar */}
          <div
            className={`absolute bottom-0 inset-x-0 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-gradient-to-t from-black/95 to-transparent px-4 pb-4 pt-8">
              {/* Progress */}
              <div
                className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  setProgress(((e.clientX - rect.left) / rect.width) * 100);
                }}
              >
                <div
                  className="h-full bg-[#39FF14] rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg" />
                </div>
              </div>
              {/* Controls row */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p); }}
                  className="text-white hover:text-[#39FF14] transition-colors"
                >
                  {playing ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-px" />
                  )}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                  className="text-white hover:text-[#39FF14] transition-colors"
                >
                  <Volume2 className="w-4.5 h-4.5" />
                </button>
                <div className="w-20 h-1 bg-white/20 rounded-full">
                  <div
                    className="h-full bg-white/80 rounded-full"
                    style={{ width: muted ? "0%" : "75%" }}
                  />
                </div>
                <span className="text-[#7A7A8C] text-[11px] font-mono ml-auto">
                  {elapsed} / 2:18:00
                </span>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-white hover:text-[#39FF14] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-white hover:text-[#39FF14] transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Watch Page ────────────────────────────────────────────────────────────

function WatchPage({
  movie,
  onBack,
  onSelect,
}: {
  movie: Movie;
  onBack: () => void;
  onSelect: (m: Movie) => void;
}) {
  const nextUp = ALL_MOVIES.filter((m) => m.id !== movie.id).slice(0, 7);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#7A7A8C] hover:text-[#39FF14] transition-colors mb-5 font-dm-sans text-sm group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Browse
      </button>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* ── Main column ── */}
        <div className="flex-1 min-w-0">
          <VideoPlayer movie={movie} />

          {/* Movie meta */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-rajdhani font-bold text-white mb-1.5">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-[#7A7A8C] mb-3">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#39FF14] fill-[#39FF14]" />
                  {movie.rating}/10
                </span>
                <span>{movie.year}</span>
                <span>{movie.genre}</span>
                <span>{movie.duration}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {movie.views} views
                </span>
              </div>
              <p className="text-[#7A7A8C] text-sm leading-relaxed font-dm-sans max-w-xl">
                {movie.desc}
              </p>
            </div>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#9D4EDD]/15 border border-[#9D4EDD]/40 text-[#9D4EDD] rounded-full text-sm font-mono hover:bg-[#9D4EDD]/25 transition-all hover:shadow-[0_0_18px_rgba(157,78,221,0.2)]">
              <Share2 className="w-3.5 h-3.5" />
              Share Secretly
            </button>
          </div>

          {/* In-content ad */}
          <div className="mt-7">
            <div className="w-full h-[76px] flex items-center justify-center border border-dashed border-[#39FF14]/15 rounded-xl bg-[#1F1F2E]/30 relative overflow-hidden">
              <AdLabel label="728 × 90 — In-Content" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/4 via-transparent to-[#9D4EDD]/4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="w-full xl:w-[320px] flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-rajdhani font-semibold text-white tracking-wide">
              Next Up
            </h2>
            <span className="text-[#39FF14]/50 text-[11px] font-mono">Autoplay On</span>
          </div>

          <div className="space-y-1">
            {nextUp.map((m, i) => (
              <button
                key={m.id}
                onClick={() => onSelect(m)}
                className="w-full flex gap-3 p-2 rounded-xl hover:bg-[#1F1F2E] transition-colors group text-left"
              >
                <div className="relative w-[108px] flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-[#1A1A28]">
                  <img
                    src={unsplash(m.img, 216, 122)}
                    alt={m.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <Play className="w-4 h-4 text-[#39FF14] fill-[#39FF14]" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-[#E4E4EC] text-xs font-rajdhani font-semibold truncate group-hover:text-[#39FF14] transition-colors leading-snug">
                    {m.title}
                  </p>
                  <p className="text-[#7A7A8C] text-[10px] font-mono mt-0.5">
                    {m.genre} · {m.duration}
                  </p>
                  <p className="text-[#7A7A8C]/60 text-[10px] font-mono">{m.views} views</p>
                </div>
                <span className="text-[#7A7A8C]/40 font-mono text-[11px] pt-0.5 flex-shrink-0">
                  {i + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Sidebar ad */}
          <div className="mt-5">
            <SidebarAd />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────

function HomePage({ onWatch }: { onWatch: (m: Movie) => void }) {
  return (
    <div>
      <HeroSection movie={ALL_MOVIES[4]} onWatch={() => onWatch(ALL_MOVIES[4])} />

      <div className="pt-8">
        <MovieRow
          title="Freshly Uploaded"
          icon={<Zap className="w-4 h-4" />}
          movies={FRESHLY_UPLOADED}
          onSelect={onWatch}
        />

        <div className="px-4 sm:px-6 mb-10">
          <MidPageAd />
        </div>

        <MovieRow
          title="Top Hidden Gems"
          icon={<Star className="w-4 h-4" />}
          movies={TOP_HIDDEN_GEMS}
          onSelect={onWatch}
        />

        <MovieRow
          title="Trending Now"
          icon={<TrendingUp className="w-4 h-4" />}
          movies={TRENDING_NOW}
          onSelect={onWatch}
        />

        {/* Bottom stripe with sidebar ad */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-16 flex flex-col xl:flex-row gap-8 items-start mt-2">
          <div className="flex-1">
            <div className="p-7 rounded-2xl border border-[#39FF14]/10 bg-[#1F1F2E]/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#39FF14]/60 rounded-l-2xl" />
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                <span className="font-mono text-[11px] text-[#39FF14]/70 tracking-[0.16em] uppercase">
                  Why SabseChupke?
                </span>
              </div>
              <h3 className="font-rajdhani text-2xl text-white font-bold mb-2 tracking-wide">
                Stream Without a Trace
              </h3>
              <p className="text-[#7A7A8C] text-sm font-dm-sans leading-relaxed max-w-lg">
                No sign-ups. No subscriptions. No surveillance. Just pure, unfiltered cinema delivered
                directly to your screen. SabseChupke keeps your viewing habits strictly between you
                and the movie.
              </p>
              <div className="flex flex-wrap gap-6 mt-5">
                {[
                  ["10,000+", "Movies"],
                  ["4K Ultra", "Quality"],
                  ["Zero", "Sign-up"],
                  ["100%", "Free"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-[#39FF14] font-rajdhani font-bold text-xl">{val}</p>
                    <p className="text-[#7A7A8C] text-xs font-mono">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SidebarAd />
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────

function Footer({ onHome }: { onHome: () => void }) {
  return (
    <footer className="border-t border-white/[0.05] py-8 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onHome}
          className="flex items-center gap-0.5 group"
        >
          <span className="text-[#39FF14] font-rajdhani font-bold text-base tracking-[0.1em] group-hover:opacity-70 transition-opacity">
            SABSE
          </span>
          <span className="text-white font-rajdhani font-bold text-base tracking-[0.1em] group-hover:opacity-70 transition-opacity">
            CHUPKE
          </span>
          <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-[#39FF14] flex-shrink-0" />
        </button>
        <p className="text-[#7A7A8C]/50 text-[11px] font-mono tracking-wider text-center">
          FREE MOVIES · NO SIGNUP · STREAM ANYTIME · STAY HIDDEN
        </p>
        <p className="text-[#7A7A8C]/30 text-[10px] font-mono">
          © 2024 SabseChupke
        </p>
      </div>
    </footer>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<"home" | "watch">("home");
  const [movie, setMovie] = useState<Movie>(ALL_MOVIES[4]);
  const [incognito, setIncognito] = useState(false);

  const goWatch = (m: Movie) => {
    setMovie(m);
    setPage("watch");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-dm-sans [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Incognito banner */}
      {incognito && (
        <div className="w-full py-2 bg-[#9D4EDD]/15 border-b border-[#9D4EDD]/25 text-center">
          <span className="text-[#9D4EDD] text-[11px] font-mono tracking-[0.14em] uppercase">
            ● Incognito Mode Active — Browsing history is not being saved
          </span>
        </div>
      )}

      <Navbar
        incognito={incognito}
        onToggle={() => setIncognito((v) => !v)}
        onHome={goHome}
      />

      {page === "home" ? (
        <HomePage onWatch={goWatch} />
      ) : (
        <WatchPage movie={movie} onBack={goHome} onSelect={goWatch} />
      )}

      <Footer onHome={goHome} />
    </div>
  );
}
