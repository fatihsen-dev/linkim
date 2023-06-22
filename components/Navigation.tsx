"use client";
import Link from "next/link";

export default function Navigation({ user }: any) {
   return (
      <header>
         <nav>
            <div className="container flex items-center justify-between p-5 h-20">
               <Link className="text-2xl font-extrabold text-green-500" href="/">
                  Supabase
               </Link>
               <ul className="flex items-center gap-10 font-semibold">
                  {user ? (
                     <li>
                        <Link href="/profile">Profile</Link>
                     </li>
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
