"use client";
import { useAuthStore } from "@/store/auth";
import { supabase } from "@/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface InputT {
   value: string;
   error: {
      state: boolean;
      message: string;
   };
}

export default function LoginForm() {
   const router = useRouter();
   const { login } = useAuthStore();

   const [email, setEmail] = useState<InputT>({
      value: "",
      error: {
         state: false,
         message: "",
      },
   });
   const [password, setPassword] = useState<InputT>({
      value: "",
      error: {
         state: false,
         message: "",
      },
   });

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (email.value.length > 8 && email.value.length < 30) {
         setEmail({ ...email, error: { state: false, message: "" } });
         if (password.value.length > 6 && password.value.length < 36) {
            setPassword({ ...password, error: { state: false, message: "" } });

            const { data, error } = await supabase.auth.signInWithPassword({
               email: email.value,
               password: password.value,
            });

            if (error) {
               return toast.error(error.message);
            }
            const { error: ErrorProfile, data: profileData } = await supabase
               .from("profiles")
               .select()
               .eq("user", data.user.id);
            if (ErrorProfile) {
               return toast.error(ErrorProfile.message);
            }
            login(data.user as UserT, profileData[0]);
            toast.success("Giriş başarılı");
            router.push("/");
         } else {
            setPassword({ ...password, error: { state: true, message: "Minimum of 6 and a Maximum of 36" } });
         }
      } else {
         setEmail({ ...email, error: { state: true, message: "Minimum of 8 and a Maximum of 30" } });
      }
   };

   return (
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-xs w-full">
         <h1 className="text-center text-4xl font-bold text-green-500 mb-2 tracking-wide">Giriş Yap</h1>
         <div className="w-full flex flex-col">
            <input
               onInput={(e: any) => setEmail({ ...email, value: e.target.value })}
               className="border rounded focus:border-green-500 px-2 py-1.5 outline-none"
               placeholder="Email"
               type="email"
            />
            {email.error.state && <span className="text-xs text-red-500">{email.error.message}</span>}
         </div>
         <div className="w-full flex flex-col">
            <input
               onInput={(e: any) => setPassword({ ...password, value: e.target.value })}
               className="border rounded focus:border-green-500 px-2 py-1.5 outline-none placeholder:translate-y-1 placeholder:tracking-wider"
               placeholder="************"
               type="password"
            />
            {password.error.state && <span className="text-xs text-red-500">{password.error.message}</span>}
         </div>
         <button className="bg-green-500 py-1.5 hover:bg-opacity-90 transition-colors text-white rounded">
            Giriş Yap
         </button>
         <hr className="border-white" />
         <Link className="underline text-center text-green-500 -my-2" href="/auth/register">
            Kayıt Ol
         </Link>
      </form>
   );
}
