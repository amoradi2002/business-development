"use client";

import { useState } from "react";
import QualifierModal from "./QualifierModal";

interface QualifierButtonProps {
  className?: string;
  label?: string;
}

export default function QualifierButton({
  className,
  label = "See If You Qualify",
}: QualifierButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-block rounded-md bg-[#d4af37] px-8 py-3.5 text-base font-bold text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#c29e2d] hover:shadow-xl sm:text-lg"
        }
      >
        {label}
      </button>
      <QualifierModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
