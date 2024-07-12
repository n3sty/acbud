import { createClient } from "@/app/utils/supabase/server";
import { Erica_One } from "next/font/google";
import { useEffect, useState } from "react";

type story = {
  id: string,
  created_by_id: number,
  title: string,
  image_url?: string,
  description: JSON,
}

export default async function Feed() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("stories")
    .select();


  if ( error != null ) {
    console.log(`An error occured: ${error.message}`)
  }

  return (
    <main className="flex min-h-screen bg-base-200 flex-col text-center items-center justify-between p-24 ">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-8">Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data?.map((story: story) => (
            <div key={story.id} className="card shadow-lg">
              <h1>Card 1</h1>
              <figure>
                <img src={story.image_url} alt={story.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{story.title}</h2>
                <p>{JSON.stringify(story.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
