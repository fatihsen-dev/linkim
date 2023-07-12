"use client";
import Avvvatars from "avvvatars-react";
import { useAuthStore } from "@/store/auth";

export default function Page() {
   const { user, profile } = useAuthStore();

   return (
      <div className="flex h-full gap-10 pb-10">
         <div className="h-full p-10 max-w-[300px] w-full flex flex-col rounded-md border border-white/10 items-center gap-5 bg-white/5 backdrop-blur-md">
            <Avvvatars size={70} style="shape" value={profile?.username || ""} />
            <div className="text-center">
               <h3 className="text-xl leading-4 font-semibold text-white">{profile?.name}</h3>
               <span className="leading-4 text-white/50">{profile?.username}</span>
            </div>
         </div>
         <div className="h-full px-10 py-5 flex-1 rounded-md border border-white/10 bg-white/5 backdrop-blur-md"></div>
      </div>
   );
}
