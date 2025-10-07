"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-semibold text-gray-100 
                 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl 
                 hover:from-purple-500 hover:to-blue-500 
                 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]"
    >
      <ArrowLeft size={18} />
      Kembali
    </button>
  );
}
