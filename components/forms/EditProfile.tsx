"use client";
import { useAuthStore } from "@/store/auth";
import { useModalStore } from "@/store/modal";
import { supabase } from "@/supabase";
import { editProfileSchema } from "@/validation/auth";
import Avvvatars from "avvvatars-react";
import { useFormik } from "formik";
import toast from "react-hot-toast";

export default function EditProfile() {
   const { user, profile, updateProfile } = useAuthStore();
   const { close } = useModalStore();
   const formik = useFormik({
      initialValues: {
         name: profile?.name || "",
         desc: profile?.desc || "",
      },
      validationSchema: editProfileSchema,
      onSubmit: async (values) => {
         const { data, error } = await supabase
            .from("profiles")
            .update({ name: values.name, desc: values.desc })
            .eq("email", user?.email)
            .select();

         if (error) {
            return toast.error(error.message);
         }

         updateProfile(data[0]);
         close();
      },
   });

   return (
      <form
         onSubmit={formik.handleSubmit}
         className="p-8 bg-white rounded max-w-sm w-full flex flex-col items-center gap-4"
      >
         <Avvvatars size={100} style="shape" value={profile?.username || ""} />
         <div className="w-full">
            <input
               id="name"
               name="name"
               value={formik.values.name}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="border border-green-500 rounded-sm px-2 py-1.5 w-full"
               type="text"
               placeholder="isim"
            />
            {formik.touched.name && formik.errors.name ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.name}</div>
            ) : null}
         </div>
         <div className="w-full">
            <textarea
               id="desc"
               name="desc"
               value={formik.values.desc}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               placeholder="Kendinden bahset"
               className="resize-none w-full border border-green-500 rounded-sm text-sm p-2 h-[130px]"
            />
            {formik.touched.desc && formik.errors.desc ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.desc}</div>
            ) : null}
         </div>
         <button
            disabled={!formik.isValid}
            className="bg-green-500 disabled:opacity-60 text-white rounded w-full py-1.5"
         >
            Kaydet
         </button>
      </form>
   );
}
