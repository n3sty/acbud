import { useSession } from "@/lib/supabase/SessionProvider";


function Onboarding() {
  const session = useSession();
  // const user = session?.user ?? null;

  return (
    <div>
      <div>Onboarding</div>
    </div>
  );
}

export default Onboarding;
