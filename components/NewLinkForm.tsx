"use client";

import { useAuthStore } from "@/store/auth";
import { supabase } from "@/supabase";
import { linkSchema } from "@/validation/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Button from "./Button";

export default function NewLinkForm({ fetchData }: { fetchData: Function }) {
   const { user, profile } = useAuthStore();

   const formik = useFormik({
      initialValues: {
         title: "",
         url: "",
      },
      validationSchema: linkSchema,
      onSubmit: async (values, { resetForm }) => {
         const { error, data } = await supabase
            .from("links")
            .insert({ label: values.title, url: values.url, email: user?.email });

         if (error) {
            return toast.error(error.message);
         }

         fetchData(profile?.email);
         resetForm();
      },
   });

   return (
      <form onSubmit={formik.handleSubmit} className="h-10 grid grid-cols-[200px_1fr_auto] items-stretch gap-4">
         <div className="">
            <input
               id="title"
               name="title"
               value={formik.values.title}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="h-10 w-full px-2 rounded-sm outline-none"
               type="text"
               placeholder="Başlık"
            />
            {formik.touched.title && formik.errors.title ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.title}</div>
            ) : null}
         </div>
         <div>
            <input
               id="url"
               name="url"
               value={formik.values.url}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="h-10 w-full px-2 rounded-sm outline-none"
               type="text"
               placeholder="url"
            />
            {formik.touched.url && formik.errors.url ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.url}</div>
            ) : null}
         </div>
         <Button type="submit" className="rounded-sm h-10 items-center w-[140px] disabled:bg-opacity-80">
            Ekle
         </Button>
      </form>
   );
}
