"use client";
import { useState } from "react";
import { Profile } from "@/lib/types/profile";
import { fetchProfile } from "@/lib/queries";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile data based on the id from the URL
  const getProfile = async () => {
    try {
      const profile = await fetchProfile(id);
      setProfileData(profile);
    } finally {
      setLoading(false);
    }
  };

  getProfile();

  if (loading) return <p>Loading profile...</p>;

  if (!profileData) return <p>Profile not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{profileData.name}'s Profile</h1>
      <p>Email: {profileData.email}</p>
      <p>Id: {profileData.id}</p>
    </div>
  );
};

export default ProfilePage;
