"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, ClipboardList } from "lucide-react"; // icon fitur

export default function Home() {
  const [items, setItems] = useState(0);
  const [loans, setLoans] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const animate = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      target: number,
      dur = 1000
    ) => {
      const start = Date.now();
      const tick = () => {
        const t = Math.min(1, (Date.now() - start) / dur);
        setter(Math.floor(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(tick);
      };
      tick();
    };

    animate(setItems, 50, 1200);
    animate(setLoans, 20, 1200);
    animate(setUsers, 35, 1200);
  }, []);

  // Fungsi smooth scroll
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = document.querySelector("#features");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0f172a] via-[#0b1020] to-[#0b1228] text-white overflow-x-hidden scroll-smooth">
      {/* NAVBAR */}
      <header className="w-full px-8 py-6 flex justify-between items-center">
        <h1 className="font-semibold text-lg leading-tight">
          Inventaris Sarpras
        </h1>
        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-blue-800 rounded-md font-semibold text-sm hover:scale-105 transition shadow-md"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="w-full px-6 sm:px-10 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Inventaris Sarpras —{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]">
              Smart Inventory
            </span>
          </h2>
          <p className="text-white/80 max-w-full">
            Kelola sarana & prasarana sekolah dengan cepat: input barang, catat
            peminjaman, pantau kondisi, dan generate laporan.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="px-5 py-3 bg-white text-blue-800 rounded-md font-semibold shadow-lg hover:-translate-y-1 transition"
            >
              Masuk Sekarang
            </Link>
            <a
              href="#features"
              onClick={handleScroll}
              className="px-5 py-3 border border-white/10 rounded-md text-white/90 hover:bg-white/5 transition"
            >
              Lihat Fitur
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Stat label="Items" value={items} />
            <Stat label="Peminjaman" value={loans} />
            <Stat label="Pengguna" value={users} />
          </div>
        </div>

        {/* Photo Card */}
        <div className="ml-0 md:ml-8">
          <PhotoCard
            src="/orgmikir.jpeg"
            name="Lagi Butuh Sesuatu, Tapi Gatau Pinjam Dimana?"
            desc="HANYA DI SARPRAS, barang super Lengkap, dan Kondisi Sangat BAIK"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="w-full px-6 sm:px-10 py-16 bg-white/5 rounded-3xl mx-auto max-w-6xl"
      >
        <h3 className="text-3xl font-bold mb-10 text-center">Fitur Unggulan</h3>
        <div className="grid sm:grid-cols-2 gap-8 place-items-center">
          <Feature
            icon={<Box size={30} />}
            title="Input & Management"
            desc="Tambah, edit, hapus data barang dengan mudah."
          />
          <Feature
            icon={<ClipboardList size={30} />}
            title="Pencatatan Peminjaman"
            desc="Catat peminjaman dan pengembalian dengan riwayat otomatis."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-4 sm:px-6 py-10 text-white/70 text-center">
        © 2025 Frido Avan Almuzaki, All Right Reserved
      </footer>
    </main>
  );
}

// Components
const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-white/10 rounded-lg p-4 min-w-[120px] text-center backdrop-blur-md">
    <div className="text-sm text-white/80">{label}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
  </div>
);

const Feature = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="p-6 w-[280px] h-[200px] flex flex-col items-center justify-center text-center rounded-2xl bg-gradient-to-br from-[#1e1b4b]/70 to-[#0f172a]/70 hover:scale-105 hover:shadow-lg transition">
    <div className="text-[#7c3aed] mb-4">{icon}</div>
    <h4 className="font-semibold mb-2 text-lg">{title}</h4>
    <p className="text-sm text-white/70">{desc}</p>
  </div>
);

const PhotoCard = ({
  src,
  name,
  desc,
}: {
  src: string;
  name: string;
  desc: string;
}) => (
  <div className="w-full max-w-sm relative rounded-3xl overflow-hidden border-4 border-transparent bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] p-[2px] shadow-2xl transition-transform hover:scale-105 hover:rotate-1">
    <div className="rounded-3xl overflow-hidden bg-[#0b1020]">
      <Image
        src={src}
        alt={name}
        width={400}
        height={400}
        className="w-full h-auto object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center">
        <h3 className="text-white font-bold text-lg">{name}</h3>
        <p className="text-sm text-white/70">{desc}</p>
      </div>
    </div>
  </div>
);
