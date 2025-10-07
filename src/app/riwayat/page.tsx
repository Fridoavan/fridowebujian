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
import { useRouter } from "next/navigation";

export default function RiwayatPage() {
  const router = useRouter();
  const [riwayat, setRiwayat] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("riwayat");
    if (data) {
      setRiwayat(JSON.parse(data));
    }
  }, []);

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
    </div>
  );
}
