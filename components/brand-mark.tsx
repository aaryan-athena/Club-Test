import Image from "next/image";
import type { ComponentProps } from "react";

export function BrandMark({ className = "", ...props }: ComponentProps<"span">) {
  return (
    <span className={`relative inline-block overflow-hidden bg-white ${className}`} {...props}>
      <Image
        src="/math-club-mark-original.png"
        alt=""
        fill
        sizes="48px"
        unoptimized
        className="scale-[1.28] object-contain"
      />
    </span>
  );
}
