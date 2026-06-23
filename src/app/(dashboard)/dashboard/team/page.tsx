import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { requireAuth } from "@/lib/supabase/require-auth";

export default async function TeamPage() {
  await requireAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Team</h1>
      <Card>
        <CardHeader><CardTitle>Coming Soon</CardTitle></CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Users className="mx-auto h-12 w-12 mb-3 opacity-20" />
            <p>Team management is under development.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
