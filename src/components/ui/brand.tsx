import Image from "next/image";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Image src="/logo.png" alt="" width={28} height={28} className="size-7" />
      <span className="display text-xl tracking-wide">FitLog</span>
    </span>
  );
}
