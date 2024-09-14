"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { User } from "@supabase/supabase-js";

function MiniProfile() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, user]);

  const handleSignOut = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // router.push("/");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    user && (
      <div className="flex items-center justify-between mt-14 ml-10 w-full">
        <Image
          className="rounded-full border p-[2px]"
          src={user?.user_metadata.picture}
          alt=""
          width={60}
          height={60}
        />

        <div className="flex-1 mx-4">
          <h2 className="font-bold">{user?.user_metadata.name}</h2>
          <h3 className="text-sm text-gray-400">Welcome to ACBUDS</h3>
        </div>
        {!loading ? (
          <button
            className="text-blue-400 text-sm font-semibold"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <span className="loading loading-spinner loading-sm text-blue-400 justify-end align-middle"></span>
        )}
      </div>
    )
  );
}

export default MiniProfile;
