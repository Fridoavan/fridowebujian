"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Instagram, Github } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-center tracking-wide">
        Tentang Aplikasi
      </h1>

      <Card className="w-full max-w-3xl bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold tracking-wide">
            Aplikasi Inventaris Sarpras
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-gray-200">
          <section>
            <p className="text-lg leading-relaxed text-center">
              Aplikasi ini dibuat untuk membantu pengelolaan{" "}
              <span className="text-blue-400 font-semibold">
                data inventaris sarana dan prasarana
              </span>{" "}
              di lingkungan sekolah. Fungsinya meliputi pencatatan barang, input
              data baru, dan menampilkan riwayat peminjaman secara efisien dan
              mudah digunakan.
            </p>
          </section>

          <div className="border-t border-white/20 pt-6">
            <h2 className="text-center text-xl font-bold mb-4">
              {" "}
              Created By :{" "}
            </h2>
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-white">
                Frido Avan Almuzaki
              </p>
              <p className="text-gray-400">Kelas XI RPL B | Absen 11</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6">
            <h2 className="text-center text-xl font-bold mb-4">
              Kontak & Media
            </h2>

            <div className="flex flex-col items-center gap-3">
              <a
                href="mailto:fridoavanalmuzaki@gmail.com"
                target="_blank"
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <Mail size={20} /> fridoavanalmuzaki@gmail.com
              </a>
              <a
                href="https://www.instagram.com/fridoavann?igsh=eHVwODR0M3o4MmQ1"
                target="_blank"
                className="flex items-center gap-2 hover:text-pink-400 transition"
              >
                <Instagram size={20} /> Instagram
              </a>
              <a
                href="https://github.com/Fridoavan"
                target="_blank"
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                <Github size={20} /> GitHub
              </a>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 text-center space-y-4">
            {/* Tombol Kembali di atas footer */}
            <button
              onClick={() => router.push("/dashboard")}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold text-white shadow-lg"
            >
              Back
            </button>

            {/* Footer copyright */}
            <p className="text-sm text-gray-400">
              © 2025 Frido Avan Almuzaki. All Rights Reserved.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
