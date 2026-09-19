import { createClient } from "@/lib/supabase/server";

export default async function SupabaseConnectionCheckPage() {
  const supabase = await createClient();
  const { error } = await supabase.auth.getSession();

  if (error) {
    return (
      <p data-connection="fail">
        Supabase connection failed: {error.message}
      </p>
    );
  }

  return <p data-connection="ok">Supabase connection confirmed</p>;
}
