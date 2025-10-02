import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link
        href="/articles"
        className="rounded-full bg-foreground text-background px-6 py-3 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium transition-colors"
      >
        Voir articles
      </Link>
    </div>
  );
}
