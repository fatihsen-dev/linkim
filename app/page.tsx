"use client";
import Button from "@/components/Button";
import SocialSlider from "@/components/SocialSlider";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
   const { user, profile } = useAuthStore();
   const router = useRouter();
   const [username, setUsername] = useState<string>(profile ? profile.username : "");

   useEffect(() => {
      if (!profile) setUsername("");
   }, [profile]);

   return (
      <div className="flex h-full 2xl:flex-row lg:flex-row">
         <div className="2xl:flex-1 sm:flex-1 py-5 justify-center 2xl:items-start sm:items-start items-center flex-col 2xl:gap-10 lg:gap-10 gap-5 2xl:flex lg:flex hidden">
            <p className="text-white font-extralight leading-6 2xl:text-xl md:text-xl text-lg 2xl:inline-block sm:inline-block hidden">
               <span className="font-bold text-green-500">Linkim</span>
               {`, İnternet'in hızına uyum sağlamak ve linklerinizi daha kolay paylaşılabilir hale getirmek için
               tasarlanmış yenilikçi bir link kısaltma web projesidir. Artık uzun ve karmaşık URL'leri paylaşmak zorunda
               kalmayacak, kolayca hatırlanabilir ve kullanıcı dostu kısaltmalara sahip olacaksınız.`}
            </p>
            <Button onClick={() => router.push("/about")} className="w-full max-w-sm font-medium">
               {"Neden Linkim'ı kullanmalısınız?"}
            </Button>
         </div>
         <div className="flex-1 flex 2xl:items-end lg:items-end items-center justify-center flex-col gap-5">
            <SocialSlider />
            <label className="flex bg-white p-4 px-6 text-lg outline outline-2 outline-transparent outline-offset-0 focus-within:outline-green-400 focus-within:outline-offset-[3px] duration-75 delay-0 transition-all w-full max-w-sm rounded-md select-none">
               linkim.vercel.app/
               <input
                  disabled={user ? true : false}
                  value={username}
                  onInput={(e: any) => setUsername(e.target.value)}
                  className="outline-none flex-1 max-w-[140px]"
                  type="text"
               />
            </label>
            <div
               style={{ pointerEvents: user ? "none" : "auto", opacity: user ? 0.7 : 1 }}
               className="login-register-btn select-none flex whitespace-nowrap w-full max-w-sm font-medium rounded-md"
            >
               <Button onClick={() => router.push("/auth/login")} className="flex-1 rounded-none bg-transparent">
                  Giriş Yap
               </Button>
               <Button
                  onClick={() => router.push(`/auth/register${username.length > 0 ? "?username=" + username : ""}`)}
                  className="flex-1 rounded-none bg-transparent !text-green-500 font-semibold"
               >
                  Kayıt Ol
               </Button>
            </div>
         </div>
      </div>
   );
}
