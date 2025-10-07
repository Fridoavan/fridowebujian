"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClipboardList, FilePlus, Info } from "lucide-react";

export default function DashboardPage() {
  {
    /* NAVIGASI ROUTER */
  }
  const router = useRouter();
  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white p-8">
      {/* JUDUL DASHBOARD */}
      <h1 className="text-4xl font-bold mb-10 text-center tracking-wide">
        Dashboard Inventaris Sarpras
      </h1>

      {/* GRID KARTU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Card Riwayat */}
        <Card
          onClick={() => navigate("/riwayat")}
          className="cursor-pointer bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-105 hover:shadow-blue-500/40 transition-all duration-300"
        >
          <CardHeader className="flex flex-col items-center">
            <ClipboardList size={50} className="text-blue-400 mb-4" />
            <CardTitle className="text-xl font-semibold text-center text-white">
              Riwayat Peminjaman
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-300">
            Lihat catatan lengkap barang yang telah dipinjam dan dikembalikan.
          </CardContent>
        </Card>

        {/* Card Input Data */}
        <Card
          onClick={() => navigate("/input")}
          className="cursor-pointer bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-105 hover:shadow-green-500/40 transition-all duration-300"
        >
          <CardHeader className="flex flex-col items-center">
            <FilePlus size={50} className="text-green-400 mb-4" />
            <CardTitle className="text-xl font-semibold text-center text-white">
              Input Data Barang
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-300">
            Tambahkan data barang baru ke dalam sistem inventaris dengan mudah.
          </CardContent>
        </Card>

        {/* Card About */}
        <Card
          onClick={() => navigate("/about")}
          className="cursor-pointer bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300"
        >
          <CardHeader className="flex flex-col items-center">
            <Info size={50} className="text-purple-400 mb-4" />
            <CardTitle className="text-xl font-semibold text-center text-white">
              Tentang Aplikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-300">
            Ketahui informasi singkat tentang sistem inventaris dan
            developernya.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
