import { createClient } from "@/app/utils/supabase/server";
import { Session } from "@supabase/supabase-js";
import React from "react";

const SessionContext = React.createContext<Session | null>(null);

function SessionProvider({children}: {children: React.ReactNode}) {
  const supabase = createClient();
  const [session, setSession] = React.useState<Session | null>(null);

  const test = 0

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => { subscription.unsubscribe() }

  }, [test, supabase]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider;
export const useSession = () => React.useContext(SessionContext);
