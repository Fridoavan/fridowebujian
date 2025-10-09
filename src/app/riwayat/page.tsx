"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface RiwayatItem {
  peminjam: string;
  barang: string;
  jumlah: string;
  tanggal: string;
}

export default function RiwayatPage() {
  const router = useRouter();
  const [riwayat, setRiwayat] = useState<RiwayatItem[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<RiwayatItem>({
    peminjam: "",
    barang: "",
    jumlah: "",
    tanggal: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("riwayat");
    if (data) {
      setRiwayat(JSON.parse(data));
    }
  }, []);

  // Simpan ke localStorage tiap kali diupdate
  const saveToLocalStorage = (newData: RiwayatItem[]) => {
    localStorage.setItem("riwayat", JSON.stringify(newData));
    setRiwayat(newData);
  };

  // Hapus item
  const handleDelete = (index: number) => {
    const updated = riwayat.filter((_, i) => i !== index);
    saveToLocalStorage(updated);
  };

  // Buka modal edit
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData(riwayat[index]);
    setShowModal(true);
  };

  // Simpan perubahan edit
  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updated = [...riwayat];
      updated[editIndex] = editData;
      saveToLocalStorage(updated);
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center p-10 text-white">
      <Card className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 shadow-2xl w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-pink-400">
            Riwayat Peminjaman Barang
          </CardTitle>
        </CardHeader>
        <CardContent>
          {riwayat.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              Belum ada data peminjaman 😢
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Peminjam</TableHead>
                  <TableHead>Nama Barang</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riwayat.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.peminjam}</TableCell>
                    <TableCell>{item.barang}</TableCell>
                    <TableCell>{item.jumlah}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm"
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Tombol Back */}
      <Button
        onClick={() => router.push("/dashboard")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Back
      </Button>

      {/* Modal Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-md border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-semibold text-center mb-4 text-pink-400">
              Edit Data Peminjaman
            </h2>
            <div className="space-y-3">
              <Input
                value={editData.peminjam}
                onChange={(e) =>
                  setEditData({ ...editData, peminjam: e.target.value })
                }
                placeholder="Nama Peminjam"
                className="bg-transparent text-white border-gray-500"
              />
              <Input
                value={editData.barang}
                onChange={(e) =>
                  setEditData({ ...editData, barang: e.target.value })
                }
                placeholder="Nama Barang"
                className="bg-transparent text-white border-gray-500"
              />
              <Input
                value={editData.jumlah}
                onChange={(e) =>
                  setEditData({ ...editData, jumlah: e.target.value })
                }
                placeholder="Jumlah"
                className="bg-transparent text-white border-gray-500"
              />
              <Input
                value={editData.tanggal}
                onChange={(e) =>
                  setEditData({ ...editData, tanggal: e.target.value })
                }
                placeholder="Tanggal"
                className="bg-transparent text-white border-gray-500"
              />
            </div>
            <div className="flex justify-between mt-6">
              <Button
                onClick={handleSaveEdit}
                className="bg-green-600 hover:bg-green-700"
              >
                Simpan
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 hover:bg-gray-800"
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
