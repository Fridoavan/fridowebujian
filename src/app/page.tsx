/* src/app/page.tsx */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // simple animated counters
  const [itemsCount, setItemsCount] = useState(0);
  const [loansCount, setLoansCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    // animate counters up to target
    const animate = (
      setter: (n: number) => void,
      target: number,
      duration = 1000
    ) => {
      const start = Date.now();
      const from = 0;
      const tick = () => {
        const now = Date.now();
        const t = Math.min(1, (now - start) / duration);
        setter(Math.floor(from + (target - from) * easeOutCubic(t)));
        if (t < 1) requestAnimationFrame(tick);
      };
      tick();
    };

    animate(setItemsCount, 1248, 1200);
    animate(setLoansCount, 312, 1200);
    animate(setUsersCount, 89, 1200);

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
  }, []);

  // simple testimonials data
  const testimonials = [
    {
      name: "Pak Joko - TU",
      text: "Mencatat peminjaman jadi super gampang, tidak ada lagi barang 'ilang'.",
    },
    {
      name: "Bu Rina - Kepala Sekolah",
      text: "Laporan rapih dan cepat, sangat membantu monitoring sarpras sekolah.",
    },
    {
      name: "Andi - Petugas IT",
      text: "UI-nya ringan, responsive, dan mudah dioperasikan oleh staf non-teknis.",
    },
  ];

  // carousel state
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % testimonials.length),
      4500
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#0b1020] to-[#0b1228] text-white overflow-x-hidden">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg
          className="absolute -left-64 -top-40 opacity-40 blur-3xl"
          width="700"
          height="700"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(300,300)">
            <path
              d="M120,-160C151,-132,171,-90,176,-42C181,7,172,55,145,93C119,131,76,159,30,183C-15,206,-62,225,-104,208C-146,191,-183,138,-197,83C-211,28,-203,-29,-174,-71C-145,-113,-95,-139,-47,-162C1,-184,50,-203,96,-186C143,-169,88,-188,120,-160Z"
              fill="#7c3aed"
            />
          </g>
        </svg>
        <svg
          className="absolute -right-64 -bottom-48 opacity-30 blur-2xl"
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(300,300)">
            <path
              d="M100,-150C140,-130,180,-90,190,-40C200,10,180,55,150,93C120,131,70,165,20,185C-30,205,-85,210,-120,190C-155,170,-170,110,-190,60C-210,10,-240,-30,-220,-80C-200,-130,-140,-170,-80,-190C-20,-210,40,-210,100,-150Z"
              fill="#06b6d4"
            />
          </g>
        </svg>
      </div>

      {/* NAVBAR */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center ring-1 ring-white/10">
            {/* simple logo mark */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="4"
                fill="white"
                opacity="0.12"
              />
              <path
                d="M6 12h12M12 6v12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Inventaris Sarpras</h1>
            <p className="text-xs text-white/60 -mt-0.5">
              Smart Inventory System
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="#features"
            className="text-sm hover:text-white/90 text-white/80 transition"
          >
            Features
          </Link>
          <Link
            href="#stats"
            className="text-sm hover:text-white/90 text-white/80 transition"
          >
            Stats
          </Link>
          <Link
            href="#testi"
            className="text-sm hover:text-white/90 text-white/80 transition"
          >
            Testimonials
          </Link>
          <Link
            href="/login"
            className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-blue-800 font-semibold hover:scale-105 transition shadow-md"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Inventaris Sarpras —{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]">
              Smart Inventory
            </span>
          </h2>
          <p className="text-white/80 max-w-xl">
            Kelola sarana & prasarana sekolah dengan cepat: input barang, catat
            peminjaman, pantau kondisi, dan generate laporan. Ringan, responsif,
            & siap dipakai.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-blue-800 font-semibold shadow-lg hover:translate-y-[-2px] transition"
            >
              Masuk Sekarang
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/10 text-white/90 hover:bg-white/5 transition"
            >
              Lihat Fitur
            </a>
          </div>

          <div id="stats" className="mt-8 flex flex-wrap gap-6">
            <Stat label="Items" value={itemsCount} />
            <Stat label="Peminjaman" value={loansCount} />
            <Stat label="Pengguna" value={usersCount} />
          </div>
        </div>

        {/* Demo panel */}
        <div className="relative">
          <div className="mx-auto w-[520px] max-w-full transform hover:-translate-y-2 transition">
            <div className="rounded-2xl border border-white/8 bg-white/6 backdrop-blur p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm text-white/90 font-semibold">
                    Dashboard Preview
                  </h3>
                  <p className="text-xs text-white/60">
                    Ringkasan inventaris & peminjaman
                  </p>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400/90" />
                  <span className="text-xs text-white/70">Connected</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/2 rounded-lg p-3">
                <div className="flex items-center justify-between text-sm text-white/80 mb-3">
                  <span>Proyektor</span>
                  <span>Qty: 4</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 rounded-md bg-white/4">Kondisi: Baik</div>
                  <div className="p-2 rounded-md bg-white/4">
                    Lokasi: Ruang Multimedia
                  </div>
                  <div className="p-2 rounded-md bg-white/4">
                    Terakhir Pinjam: 2025-10-05
                  </div>
                  <div className="p-2 rounded-md bg-white/4">
                    Status: Tersedia
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-md bg-[#7c3aed] text-white font-medium hover:opacity-95 transition">
                  Tambah Barang
                </button>
                <button className="flex-1 px-3 py-2 rounded-md border border-white/8 text-white/90 hover:bg-white/3 transition">
                  Lihat Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-6">Fitur Unggulan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            title="Input & Management"
            desc="Tambah, edit, dan hapus data barang dengan field lengkap: nama, kode, jumlah, kondisi, lokasi."
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="text-white"
                fill="none"
              >
                <path
                  d="M4 7h16M4 12h10M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <Feature
            title="Pencatatan Peminjaman"
            desc="Catat peminjaman & pengembalian. Riwayat tersimpan untuk audit dan laporan."
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="text-white"
                fill="none"
              >
                <path
                  d="M3 7h18M8 3v4M16 3v4M5 21h14a2 2 0 0 0 2-2V8H3v11a2 2 0 0 0 2 2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <Feature
            title="Laporan & Export"
            desc="Generate laporan ringkasan inventaris & ekspor ke CSV/PDF untuk kebutuhan administrasi."
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="text-white"
                fill="none"
              >
                <path
                  d="M12 2v12M8 6h8M4 20h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testi" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-6">Apa kata mereka</h3>

        <div className="relative bg-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-white/80">Dipakai di banyak sekolah</p>
              <p className="text-xs text-white/60">
                Dari staf sampai kepala sekolah
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setIdx(
                    (i) => (i - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="p-2 rounded-md bg-white/6 hover:bg-white/8 transition"
              >
                ◀
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                className="p-2 rounded-md bg-white/6 hover:bg-white/8 transition"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="min-h-[120px] flex items-center">
            {/* simple crossfade */}
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className={`transition-all duration-700 ease-in-out opacity-${
                  i === idx ? 100 : 0
                } ${
                  i === idx ? "translate-y-0" : "translate-y-4"
                } absolute left-6 right-6`}
                style={{ opacity: i === idx ? 1 : 0 }}
              >
                <p className="text-lg text-white/90 mb-3">“{t.text}”</p>
                <cite className="text-sm text-white/60">— {t.name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-10 text-white/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="font-semibold">Inventaris Sarpras</h4>
            <p className="text-sm text-white/60">
              Smart Inventory System • Untuk administrasi sarana & prasarana
            </p>
            <p className="text-xs text-white/50 mt-3">
              © 2025 Frido — PT Grow Smart Indonesia
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-white">
              Dokumentasi
            </a>
            <a href="#" className="text-sm hover:text-white">
              Kontak
            </a>
            <a href="#" className="text-sm hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* Small presentational components inside same file so copy-paste gampang */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/6 rounded-lg p-4 min-w-[120px]">
      <div className="text-sm text-white/80">{label}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-xl bg-white/5 hover:scale-[1.02] transition transform">
      <div className="w-12 h-12 rounded-lg bg-white/6 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  );
}
