"use client";
import { useAuthStore } from "@/store/auth";
import { supabase } from "@/supabase";
import { registerSchema } from "@/validation/auth";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function RegisterForm() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const { login } = useAuthStore();

   const username = searchParams.get("username");

   const formik = useFormik({
      initialValues: {
         username: username ? username : "",
         email: "",
         password: "",
         passwordTwo: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
         const { error: usernameControlError, data: usernameControlData } = await supabase
            .from("profiles")
            .select()
            .eq("username", values.username);
         if (usernameControlData?.length) {
            return toast.error(`${values.username} kullanıcı adı alinmış`);
         }

         const {
            data: { user },
            error,
         } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
               emailRedirectTo: "http://localhost:3000/auth/login",
            },
         });

         if (error) {
            return toast.error(error.message);
         }

         const { error: ErrorProfile, data } = await supabase
            .from("profiles")
            .insert({ user: user?.id, username: values.username })
            .select();

         if (ErrorProfile) {
            return toast.error(ErrorProfile.message);
         }

         login(user as UserT, data[0]);
         router.push("/");
         toast.success("Hesabınız oluşturuldu");
      },
   });

   return (
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 max-w-xs w-full">
         <h1 className="text-center text-4xl font-bold text-green-500 mb-2 tracking-wide">Kayıt Ol</h1>
         <div className="w-full flex flex-col">
            <input
               id="username"
               name="username"
               value={formik.values.username}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="border rounded focus:border-green-500 px-2 py-1.5 outline-none"
               placeholder="Kullanıcı Adı"
               type="text"
            />
            {formik.touched.username && formik.errors.username ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.username}</div>
            ) : null}
         </div>
         <div className="w-full flex flex-col">
            <input
               id="email"
               name="email"
               value={formik.values.email}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="border rounded focus:border-green-500 px-2 py-1.5 outline-none"
               placeholder="Email"
               type="email"
            />
            {formik.touched.email && formik.errors.email ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.email}</div>
            ) : null}
         </div>
         <div className="w-full flex flex-col">
            <input
               id="password"
               name="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="border rounded focus:border-green-500 px-2 py-1.5 outline-none placeholder:translate-y-1 placeholder:tracking-wider"
               placeholder="************"
               type="password"
            />
            {formik.touched.password && formik.errors.password ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.password}</div>
            ) : null}
         </div>
         <div className="w-full flex flex-col">
            <input
               id="passwordTwo"
               name="passwordTwo"
               value={formik.values.passwordTwo}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="border rounded focus:border-green-500 px-2 py-1.5 outline-none placeholder:translate-y-1 placeholder:tracking-wider"
               placeholder="************"
               type="password"
            />
            {formik.touched.passwordTwo && formik.errors.passwordTwo ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.passwordTwo}</div>
            ) : null}
         </div>
         <button
            type="submit"
            disabled={!formik.isValid}
            className="bg-green-500 py-1.5 hover:bg-opacity-90 transition-colors text-white rounded disabled:bg-opacity-80"
         >
            Kayıt Ol
         </button>
         <hr className="border-white" />
         <Link className="underline text-center text-green-500 -my-2" href="/auth/login">
            Giriş Yap
         </Link>
      </form>
   );
}
