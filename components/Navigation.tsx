"use client";
import { useAuthStore } from "@/store/auth";
import { supabase } from "@/supabase";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Navigation({ user }: any) {
   const { signout } = useAuthStore();

   const signoutHandle = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
         return toast.error(error.message);
      }
      signout();
      toast.success("Çıkış başarılı");
   };

   return (
      <header>
         <nav>
            <div className="container flex items-center justify-between p-5 h-20">
               <Link className="text-3xl font-extrabold text-green-500" href="/">
                  LINKIM
               </Link>
               <ul className="flex items-center gap-5 font-semibold text-white">
                  {user ? (
                     <>
                        <li>
                           <Link href="/profile">Profilim</Link>
                        </li>
                        <li>
                           <button className="text-red-500" onClick={signoutHandle}>
                              Çıkış Yap
                           </button>
                        </li>
                     </>
                  ) : (
                     <>
                        <li>
                           <Link href="/auth/login">Giriş Yap</Link>
                        </li>
                        <li>
                           <Link href="/auth/register">Kayıt Ol</Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </nav>
      </header>
   );
}
