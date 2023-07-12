"use client";
import Avvvatars from "avvvatars-react";
import { useAuthStore } from "@/store/auth";
import { BsCheck } from "react-icons/bs";
import { supabase } from "@/supabase";
import toast from "react-hot-toast";

export default function Page() {
   const { user, profile, updateProfile } = useAuthStore();

   const changeNameHandle = async (e: any) => {
      e.preventDefault();

      const { name } = e.target;

      const { data, error } = await supabase
         .from("profiles")
         .update({ name: name.value })
         .eq("user", user?.id)
         .select();

      if (error) {
         return toast.error(error.message);
      }
      updateProfile(data[0]);
   };

   return (
      <div className="flex h-full gap-10 pb-10">
         <div className="h-full p-10 max-w-[300px] w-full flex flex-col rounded-md border border-white/10 items-center gap-5 bg-white/5 backdrop-blur-md">
            <Avvvatars size={70} style="shape" value={profile?.username || ""} />
            <div className="text-center">
               {profile?.name ? (
                  <h3 className="text-xl leading-4 font-semibold text-white">{profile.name}</h3>
               ) : (
                  <form onSubmit={changeNameHandle} className="flex items-center gap-1">
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

               <span className="leading-4 text-white/50">{profile?.username}</span>
            </div>
         </div>
         <div className="h-full px-10 py-5 flex-1 rounded-md border border-white/10 bg-white/5 backdrop-blur-md"></div>
      </div>
   );
}
