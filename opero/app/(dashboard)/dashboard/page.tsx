import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-full bg-secondary p-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard — Coming in Sprint 2
        </h1>
        <Button type="button" variant="outline">
          Logout
        </Button>
      </div>
    </div>
  );
}
