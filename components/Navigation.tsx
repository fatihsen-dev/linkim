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
   };

   return (
      <header>
         <nav>
            <div className="container flex items-center justify-between p-5 h-20">
               <Link className="text-2xl font-extrabold text-green-500" href="/">
                  Supabase
               </Link>
               <ul className="flex items-center gap-5 font-semibold">
                  {user ? (
                     <>
                        <li>
                           <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                           <button onClick={signoutHandle}>Logout</button>
                        </li>
                     </>
                  ) : (
                     <>
                        <li>
                           <Link href="/auth/login">Login</Link>
                        </li>
                        <li>
                           <Link href="/auth/register">Register</Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </nav>
      </header>
   );
}
