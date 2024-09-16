"use server"
import { createClient } from "@/app/utils/supabase/server";
import { Profile } from "./types/profile";

export async function createProfile(profile: Profile) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile)
    .select();

  if (error) {
    console.error("Error creating profile:", error);
    throw error;
  }

  return data;
}

export async function fetchProfile(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }

  return data;
}

export async function checkIdAvailability(id: string) {
  const supabase = createClient();

  console.log("ID in queries:", id)

  if (id) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error checking id availability:", error);
      throw error;
    }

    return !data && !error;
  } else {
    throw new Error("ID not valid");
  }
}
