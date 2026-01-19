"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className=" border border-lima shadow-lg rounded-xl p-8 max-w-md w-full">
        <CheckCircle className="w-16 h-16 text-lima mx-auto mb-4" />

        <h1 className="text-2xl font-semibold mb-2 text-white">
          Pago realizado con éxito
        </h1>

        <p className="text-white mb-6">
          Gracias por tu compra. Tu pago fue procesado correctamente.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/formulas"
            className="w-full py-3 rounded-lg bg-lima text-black font-medium hover:bg-lima/70 transition"
          >
            Ir al fórmulas
          </Link>
        </div>
      </div>
    </main>
  );
}
