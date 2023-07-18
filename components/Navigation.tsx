"use client";
import { useModalStore } from "@/store/modal";
import Link from "next/link";

export default function Navigation({ user }: any) {
   const { open } = useModalStore();

   return (
      <header>
         <nav>
            <div className="container flex items-center justify-between p-5 h-20">
               <Link className="text-3xl font-extrabold text-green-500" href="/">
                  LINKIM
               </Link>
               <ul className="flex items-center gap-5 font-medium tracking-wider text-white">
                  {user ? (
                     <>
                        <li>
                           <Link href="/profile">Profilim</Link>
                        </li>
                        <li>
                           <button onClick={() => open("signout")} className="text-red-500">
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
