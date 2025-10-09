"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface RiwayatItem {
  peminjam: string;
  barang: string;
  jumlah: string;
  tanggal: string;
}

export default function InputPage() {
  const router = useRouter();
  const [data, setData] = useState<RiwayatItem>({
    peminjam: "",
    barang: "",
    jumlah: "",
    tanggal: "",
  });

  const [riwayat, setRiwayat] = useState<RiwayatItem[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("riwayat");
    if (stored) setRiwayat(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.peminjam || !data.barang || !data.jumlah || !data.tanggal) {
      alert("Isi semua field dulu bro 😤");
      return;
    }

    const updated = [...riwayat, data];
    setRiwayat(updated);
    localStorage.setItem("riwayat", JSON.stringify(updated));
    setData({ peminjam: "", barang: "", jumlah: "", tanggal: "" });

    // Tampilkan popup
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hilang otomatis setelah 3 detik
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center p-10 text-white relative">
      <Card className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 shadow-2xl w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-pink-400">
            Input Data Peminjaman
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300">Nama Peminjam</label>
              <Input
                type="text"
                name="peminjam"
                value={data.peminjam}
                onChange={handleChange}
                placeholder="Masukkan nama peminjam... (Nama Kamu)"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Nama Barang</label>
              <Input
                type="text"
                name="barang"
                value={data.barang}
                onChange={handleChange}
                placeholder="Masukkan nama barang... (contoh : Proyektor, Kabel Olor, dll)"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Jumlah</label>
              <Input
                type="number"
                name="jumlah"
                value={data.jumlah}
                onChange={handleChange}
                placeholder="Masukkan jumlah..."
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Tanggal</label>
              <Input
                type="date"
                name="tanggal"
                value={data.tanggal}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold"
            >
              Tambah Data
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Tombol Back */}
      <Button
        onClick={() => router.push("/dashboard")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Back
      </Button>

      {/* Popup Notifikasi */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-white text-gray-900 rounded-lg shadow-xl p-6 max-w-sm text-center">
            <p className="text-lg font-semibold mb-2">
              ✅ Data sudah tersimpan!
            </p>
            <p className="text-sm">
              Selesai menggunakan barang yang dipinjam harap dikembalikan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
