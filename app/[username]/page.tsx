"use client";
import { supabase } from "@/supabase";
import Avvvatars from "avvvatars-react";
import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";

export default function Page({ params: { username } }: { params: { username: string } }) {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [profile, setProfile] = useState<ProfileT>();
   const [links, setLinks] = useState<LinkT[]>([]);

   const fetchData = async (username: string) => {
      const { error, data: profiles } = await supabase.from("profiles").select().eq("username", username);

      if (!profiles?.length) {
         setIsLoading(false);
         return <div className="h-full flex justify-center items-center text-white text-4xl">Not found</div>;
      }
      setProfile(profiles[0]);

      const { error: linksError, data } = await supabase.from("links").select().eq("email", profiles[0].email);

      setLinks(data || []);
      setIsLoading(false);
   };

   useEffect(() => {
      fetchData(username);
   }, [username]);

   if (isLoading) {
      return <div className="h-full flex justify-center items-center text-white text-4xl"></div>;
   }

   return (
      <div className="h-full flex items-center text-white flex-col gap-6 2xl:py-20 lg:py-20 py-10">
         <div className="flex flex-col justify-center items-center gap-4">
            <Avvvatars size={100} style="shape" value={profile?.username || ""} />
            <div className="text-center">
               {profile?.name ? (
                  <h3 className="text-2xl leading-4 font-semibold text-white">{profile.name}</h3>
               ) : (
                  <form className="flex items-center gap-1">
                     <input
                        name="name"
                        className="outline-none px-1.5 h-8 rounded-sm"
                        placeholder="isim girin"
                        type="text"
                     />
                     <button className="bg-green-500 text-white text-2xl rounded-sm w-8 h-8 flex justify-center items-center">
                        <BsCheck />
                     </button>
                  </form>
               )}

               <span className="leading-4 text-white/50 text-lg">{profile?.username}</span>
            </div>
         </div>
         <ul className="w-full flex flex-col items-center gap-2.5">
            {links?.map((link) => (
               <li className="max-w-xs w-full" key={link.id}>
                  <a
                     className="bg-white text-green-500 w-full flex items-center justify-center h-10 rounded-sm text-xl"
                     target="_blank"
                     href={link.url.includes("http") ? link.url : `http://${link.url}`}
                  >
                     {link.label}
                  </a>
               </li>
            ))}
         </ul>
      </div>
   );
}
