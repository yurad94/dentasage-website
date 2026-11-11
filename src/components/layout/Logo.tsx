import Link from "next/link";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/images/brand/logo-arrow.png"
        alt="DENTASAGE"
        width={40}
        height={29}
        className="h-7 w-auto"
        priority
      />
      <span className="text-lg font-semibold tracking-[0.15em] text-foreground">
        DENTASAGE
      </span>
    </Link>
  );
}
