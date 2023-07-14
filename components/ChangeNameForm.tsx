"use client";

import { useAuthStore } from "@/store/auth";
import { supabase } from "@/supabase";
import toast from "react-hot-toast";
import { BsCheck } from "react-icons/bs";

export default function ChangeNameForm() {
   const { user, updateProfile } = useAuthStore();

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
      <form onSubmit={changeNameHandle} className="flex items-center gap-1">
         <input name="name" className="outline-none px-1.5 h-8 rounded-sm" placeholder="isim girin" type="text" />
         <button className="bg-green-500 text-white text-2xl rounded-sm w-8 h-8 flex justify-center items-center">
            <BsCheck />
         </button>
      </form>
   );
}
