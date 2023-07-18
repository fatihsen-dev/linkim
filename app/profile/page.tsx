"use client";
import Avvvatars from "avvvatars-react";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import Button from "@/components/Button";
import { useLinksStore } from "@/store/links";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useModalStore } from "@/store/modal";
import { linksIconAndLabel } from "@/components/forms/NewLinkForm";
import { FaPencilAlt } from "react-icons/fa";
import { notFound } from "next/navigation";

export default function Page() {
   const { setLinks, links } = useLinksStore();
   const { open } = useModalStore();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const { profile, user } = useAuthStore();

   const fetchData = async () => {
      const { error: linksError, data } = await supabase.from("links").select().eq("email", profile?.email);

      setLinks(data || []);
      setIsLoading(false);
   };

   useEffect(() => {
      if (profile) {
         fetchData();
      } else {
         notFound();
      }
   }, [profile]);

   return (
      <div className="flex h-full 2xl:gap-10 xl:gap-10 gap-5 pb-10 2xl:flex-row xl:flex-row flex-col">
         <div className="p-2 w-full flex flex-col rounded-md border border-white/10 items-center gap-1 bg-white/5 backdrop-blur-md 2xl:max-w-[300px] xl:max-w-[300px] 2xl:h-full xl:h-full ">
            <div className="flex justify-end items-center w-full py-3 pr-3.5">
               <button onClick={() => open("edit_profile")} className="text-green-500/80 hover:text-green-500/70">
                  <FaPencilAlt />
               </button>
            </div>
            <div className="flex flex-col items-center gap-3 flex-1 w-full p-3 py-0 pb-5">
               <Avvvatars size={70} style="shape" value={profile?.username || ""} />
               <div className="text-center">
                  <h3 className="text-xl leading-4 text-white">
                     {profile?.name ? profile.name : "Linkim kullanıcısı"}
                  </h3>
                  <span className="leading-4 text-white/50">{profile?.username}</span>
                  <p className="text-left text-sm leading-4 text-green-500/90 p-1.5 mt-2 bg-white/10 border border-white/10 rounded-sm">
                     {profile?.desc}
                  </p>
               </div>
            </div>
         </div>
         <div className="h-full px-5 p-5 flex-1 flex flex-col rounded-md border border-white/10 bg-white/5 backdrop-blur-md gap-6">
            <div className="flex items-center justify-end">
               <button
                  onClick={() => open("create_new_link")}
                  className="text-green-500 flex 2xl:w-[180px] lg:w-[180px] w-full items-center gap-1.5 bg-white/40 border border-white/40 justify-center py-2 rounded"
               >
                  <AiOutlinePlusSquare className="text-[1.50rem]" />
                  <span className="">Yeni bir link ekle</span>
               </button>
            </div>
            <div className="flex-1">
               {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                     <div className="w-7 h-7 animate-spin rounded-full border-[3px] border-r-transparent border-white"></div>
                  </div>
               ) : (
                  <ul className="flex flex-col 2xl:gap-4 lg:gap-4 gap-8">
                     {links.map((link) => (
                        <li
                           className="grid 2xl:grid-cols-[240px_1fr_auto] lg:grid-cols-[240px_1fr_auto] grid-cols-1 items-stretch 2xl:gap-4 lg:gap-4 gap-2"
                           key={link.id}
                        >
                           <div className="bg-white h-10  rounded-sm flex items-center justify-start px-4 text-lg text-green-500 gap-1.5 truncate">
                              {linksIconAndLabel.map((l) => l.iconName === link.icon && l.icon)}
                              {link.label}
                           </div>
                           <div className="bg-white h-10 rounded-sm flex items-center justify-start px-4 text-lg text-green-500">
                              <a
                                 className="hover:underline truncate"
                                 target="_blank"
                                 href={link.url.includes("http") ? link.url : `http://${link.url}`}
                              >
                                 {link.url}
                              </a>
                           </div>
                           <Button
                              type="submit"
                              className="rounded-sm h-10 items-center 2xl:w-[140px] lg:w-[140px] w-full disabled:bg-opacity-80"
                           >
                              Düzenle
                           </Button>
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         </div>
      </div>
   );
}
