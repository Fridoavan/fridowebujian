"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-black">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold tracking-wide">
            Inventaris Sarpras
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            {/* Nickname */}
            <div>
              <label className="block text-sm font-medium mb-2">Nickname</label>
              <Input
                type="text"
                placeholder="Masukkan nickname..."
                className="bg-transparent border-white/30 focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password..."
                  className="bg-transparent border-white/30 focus:ring-2 focus:ring-blue-500 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-300 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold rounded-lg shadow-md transition"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
