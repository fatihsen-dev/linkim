"use client";
import { useAuthStore } from "@/store/auth";
import { useLinksStore } from "@/store/links";
import { useModalStore } from "@/store/modal";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Signout() {
   const { signout } = useAuthStore();
   const { close } = useModalStore();
   const { setLinks } = useLinksStore();
   const router = useRouter();

   const signoutHandle = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
         return toast.error(error.message);
      }
      router.push("/");
      signout();
      setLinks([]);
      toast.success("Çıkış başarılı");
   };

   return (
      <div className="bg-white rounded p-8 flex flex-col gap-5">
         <p>Çıkış yapmak istediğine emin misin?</p>
         <div className="flex items-center justify-end gap-2">
            <button
               className="text-white bg-green-500 px-4 rounded py-1 transition-colors hover:bg-opacity-80"
               onClick={close}
            >
               Hayır
            </button>
            <button
               className="bg-red-500 text-white px-4 rounded py-1 transition-colors hover:bg-opacity-80"
               onClick={() => {
                  signoutHandle();
                  close();
               }}
            >
               Çıkış Yap
            </button>
         </div>
      </div>
   );
}
