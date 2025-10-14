"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Barang {
  id: number;
  nama: string;
  stok: number;
}

interface RiwayatItem {
  id: number;
  peminjam: string;
  barang: string;
  jumlah: number;
  tanggal: string;
}

export default function InputPage() {
  const router = useRouter();

  const [barangList, setBarangList] = useState<Barang[]>([
    { id: 1, nama: "LCD", stok: 10 },
    { id: 2, nama: "Kabel Olor", stok: 20 },
    { id: 3, nama: "Sound System", stok: 7 },
    { id: 4, nama: "Laptop", stok: 10 },
    { id: 5, nama: "Proyektor", stok: 5 },
    { id: 6, nama: "Speaker Bluetooth", stok: 8 },
  ]);

  const [data, setData] = useState<{ peminjam: string; tanggal: string }>({
    peminjam: "",
    tanggal: "",
  });

  const [riwayat, setRiwayat] = useState<RiwayatItem[]>([]);
  const [selectedQty, setSelectedQty] = useState<Record<number, number>>({});

  useEffect(() => {
    const storedRiwayat = localStorage.getItem("riwayat");
    const storedBarang = localStorage.getItem("barangList");
    if (storedRiwayat) setRiwayat(JSON.parse(storedRiwayat));
    if (storedBarang) {
      setBarangList(JSON.parse(storedBarang));
    }

    setSelectedQty((prev) => {
      const init: Record<number, number> = {};
      (storedBarang ? JSON.parse(storedBarang) : barangList).forEach(
        (b: Barang) => {
          init[b.id] = prev[b.id] ?? 0;
        }
      );
      return init;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("riwayat", JSON.stringify(riwayat));
    localStorage.setItem("barangList", JSON.stringify(barangList));
  }, [riwayat, barangList]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // --- fungsi utama untuk card qty ---
  const incQty = (id: number) => {
    setSelectedQty((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decQty = (id: number) => {
    setSelectedQty((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  const setQty = (id: number, value: number) => {
    if (value < 0) value = 0;
    setSelectedQty((prev) => ({ ...prev, [id]: value }));
  };

  // manual stok adjustment
  const tambahStok = (id: number) => {
    setBarangList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, stok: b.stok + 1 } : b))
    );
  };

  const kurangStok = (id: number) => {
    setBarangList((prev) =>
      prev.map((b) =>
        b.id === id && b.stok > 0 ? { ...b, stok: b.stok - 1 } : b
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.peminjam.trim()) {
      alert("Isi nama peminjam dulu.");
      return;
    }
    if (!data.tanggal) {
      alert("Pilih tanggal dahulu.");
      return;
    }

    const requested = Object.entries(selectedQty)
      .map(([idStr, qty]) => ({ id: Number(idStr), qty }))
      .filter((x) => x.qty > 0);

    if (requested.length === 0) {
      alert("Pilih minimal 1 barang (isi jumlah di card).");
      return;
    }

    for (const r of requested) {
      const b = barangList.find((x) => x.id === r.id);
      if (!b) {
        alert("Barang tidak ditemukan.");
        return;
      }
      if (r.qty > b.stok) {
        alert(`Stok ${b.nama} tidak mencukupi (stok: ${b.stok}).`);
        return;
      }
    }

    const updatedBarang = barangList.map((b) => {
      const req = requested.find((r) => r.id === b.id);
      if (req) {
        return { ...b, stok: b.stok - req.qty };
      }
      return b;
    });
    setBarangList(updatedBarang);

    const newEntries: RiwayatItem[] = requested.map((r) => {
      const b = barangList.find((x) => x.id === r.id)!;
      return {
        id: Date.now() + Math.floor(Math.random() * 1000) + r.id,
        peminjam: data.peminjam,
        barang: b.nama,
        jumlah: r.qty,
        tanggal: data.tanggal,
      };
    });

    setRiwayat((prev) => [...prev, ...newEntries]);

    setData({ peminjam: "", tanggal: "" });
    setSelectedQty((prev) => {
      const next = { ...prev };
      requested.forEach((r) => (next[r.id] = 0));
      return next;
    });

    alert("Peminjaman tersimpan — stok sudah dikurangi.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center p-10 text-gray-100">
      {/* FORM INPUT */}
      <Card className="bg-gray-800 border border-gray-700 shadow-xl w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-pink-400">
            Input Data Peminjaman
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-200">Nama Peminjam</label>
              <Input
                name="peminjam"
                value={data.peminjam}
                onChange={handleFormChange}
                placeholder="Masukkan nama peminjam..."
                className="mt-1 bg-gray-900 text-white border border-gray-600"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-200">Tanggal</label>
              <Input
                name="tanggal"
                type="date"
                value={data.tanggal}
                onChange={handleFormChange}
                className="mt-1 bg-gray-900 text-white border border-gray-600"
                required
              />
            </div>

            <div className="text-sm text-gray-300">
              Isi jumlah untuk setiap barang yang ingin dipinjam pada kartu di
              bawah, lalu tekan{" "}
              <span className="font-semibold text-white">Tambah Data</span>.
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold"
            >
              Tambah Data
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* GRID CARD BARANG */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
        {barangList.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900/80 border border-gray-700 rounded-2xl p-5 flex flex-col items-center shadow-lg"
          >
            <h3 className="text-lg font-semibold text-pink-400">{item.nama}</h3>
            <p className="mt-2 text-gray-300 text-sm">
              Stok: <span className="text-white font-medium">{item.stok}</span>
            </p>

            {/* input jumlah pinjam */}
            <div className="flex items-center gap-3 mt-4">
              <Button
                onClick={() => decQty(item.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 text-white"
              >
                -
              </Button>
              <input
                type="number"
                min={0}
                value={selectedQty[item.id] ?? 0}
                onChange={(e) => setQty(item.id, Number(e.target.value))}
                className="w-16 text-center bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-white"
              />
              <Button
                onClick={() => incQty(item.id)}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 text-white"
              >
                +
              </Button>
            </div>

            {/* manual stok adjust */}
            <div className="flex gap-2 mt-3">
              <Button
                onClick={() => kurangStok(item.id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white text-sm"
              >
                Kurangi Stok
              </Button>
              <Button
                onClick={() => tambahStok(item.id)}
                className="bg-green-500 hover:bg-green-600 px-3 py-1 text-white text-sm"
              >
                Tambah Stok
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => router.push("/dashboard")}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Kembali ke Dashboard
      </Button>
    </div>
  );
}
