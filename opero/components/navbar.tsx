import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b bg-background">
      <div className="font-bold text-xl">Opero</div>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link href="/projects">
          <Button variant="ghost">Projects</Button>
        </Link>
        <Link href="/tasks">
          <Button variant="ghost">Tasks</Button>
        </Link>
      </div>
    </nav>
  );
}