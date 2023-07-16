"use client";
import Avvvatars from "avvvatars-react";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import ChangeNameForm from "@/components/ChangeNameForm";
import { supabase } from "@/supabase";
import Button from "@/components/Button";
import { useLinksStore } from "@/store/links";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useModalStore } from "@/store/modal";
import { linksIconAndLabel } from "@/components/NewLinkForm";

export default function Page() {
   const { setLinks, links } = useLinksStore();
   const { active } = useModalStore();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const { profile } = useAuthStore();

   const fetchData = async () => {
      const { error: linksError, data } = await supabase.from("links").select().eq("email", profile?.email);

      setLinks(data || []);
      setIsLoading(false);
   };

   useEffect(() => {
      if (profile) {
         fetchData();
      }
   }, [profile]);

   return (
      <div className="flex h-full gap-10 pb-10">
         <div className="h-full p-10 max-w-[300px] w-full flex flex-col rounded-md border border-white/10 items-center gap-5 bg-white/5 backdrop-blur-md">
            <Avvvatars size={70} style="shape" value={profile?.name || ""} />
            <div className="text-center">
               {profile?.name ? (
                  <h3 className="text-xl leading-4 font-semibold text-white">{profile.name}</h3>
               ) : (
                  <ChangeNameForm />
               )}

               <span className="leading-4 text-white/50">{profile?.username}</span>
            </div>
         </div>
         <div className="h-full px-6 p-5 flex-1 flex flex-col rounded-md border border-white/10 bg-white/5 backdrop-blur-md gap-6">
            <div className="flex items-center justify-end">
               <button
                  onClick={() => active(true, "create_new_link")}
                  className="text-green-500 flex w-[180px] items-center gap-1.5 bg-white/40 border border-white/40 justify-center py-2 rounded"
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
                  <ul className="flex flex-col gap-4">
                     {links.map((link) => (
                        <li className="h-10 grid grid-cols-[240px_1fr_auto] items-stretch gap-4" key={link.id}>
                           <div className="bg-white rounded-sm flex items-center justify-start px-4 text-lg text-green-500 gap-1.5">
                              {linksIconAndLabel.map((l) => l.iconName === link.icon && l.icon)}
                              {link.label}
                           </div>
                           <div className="bg-white rounded-sm flex items-center justify-start px-4 text-lg text-green-500">
                              <a
                                 className="hover:underline"
                                 target="_blank"
                                 href={link.url.includes("http") ? link.url : `http://${link.url}`}
                              >
                                 {link.url}
                              </a>
                           </div>
                           <Button
                              type="submit"
                              className="rounded-sm h-10 items-center w-[140px] disabled:bg-opacity-80"
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
