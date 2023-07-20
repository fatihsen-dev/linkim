"use client";
import { useAuthStore } from "@/store/auth";
import { supabase } from "@/supabase";
import { linkSchema, urlOnlyLinkSchema } from "@/validation/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Button from "../Button";
import { useLinksStore } from "@/store/links";
import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useModalStore } from "@/store/modal";
import { linksIconAndLabel } from "../forms/NewLinkForm";

export default function EditLink() {
   const { user, profile } = useAuthStore();
   const { close } = useModalStore();
   const { setLinks, editLink } = useLinksStore();
   const [selected, setSelected] = useState(
      linksIconAndLabel.find((li) => li.iconName == editLink?.icon) || linksIconAndLabel[0]
   );

   const fetchData = async () => {
      const { data } = await supabase.from("links").select().eq("email", profile?.email);
      setLinks(data || []);
   };

   const formik = useFormik({
      initialValues: {
         title: editLink?.label,
         url: editLink?.url,
      },
      validationSchema: selected.id === 12 ? linkSchema : urlOnlyLinkSchema,
      onSubmit: async (values, { resetForm }) => {
         const { error, data } = await supabase
            .from("links")
            .update({
               label: selected.iconName === "other" ? values.title : selected.label,
               url: values.url,
               icon: selected.iconName,
            })
            .eq("id", editLink?.id)
            .select();

         if (error) {
            return toast.error(error.message);
         }
         console.log(data);

         fetchData();
         resetForm();
         close();
      },
      enableReinitialize: true,
   });

   useEffect(() => {
      setSelected(linksIconAndLabel.find((li) => li.iconName == editLink?.icon) || linksIconAndLabel[0]);
   }, [editLink]);

   return (
      <form onSubmit={formik.handleSubmit} className="grid items-stretch gap-4 max-w-md w-full bg-white rounded p-10">
         <div className="relative flex flex-col">
            <Listbox value={selected} onChange={setSelected}>
               <Listbox.Button className="border border-green-500 z-10 text-start px-2 h-10 rounded-sm flex items-center gap-2">
                  {selected.icon}
                  {selected.label}
               </Listbox.Button>
               <Listbox.Options className="border border-green-500 border-t-transparent max-h-40 shadow-md overflow-auto bg-white absolute w-full top-full outline-none">
                  {linksIconAndLabel.map(
                     (link) =>
                        link.id !== selected.id && (
                           <Listbox.Option
                              className="cursor-pointer px-2 h-8 flex items-center gap-2 hover:bg-green-500/20"
                              key={link.id}
                              value={link}
                           >
                              {link.icon}
                              {link.label}
                           </Listbox.Option>
                        )
                  )}
               </Listbox.Options>
            </Listbox>
         </div>
         {selected.id === 12 && (
            <div>
               <input
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-10 w-full px-2 rounded-sm outline-none border border-green-500"
                  type="text"
                  placeholder="Başlık"
               />
               {formik.touched.title && formik.errors.title ? (
                  <div className="text-red-500 text-sm leading-4">{formik.errors.title}</div>
               ) : null}
            </div>
         )}
         <div>
            <input
               id="url"
               name="url"
               value={formik.values.url}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               className="h-10 w-full px-2 rounded-sm outline-none border border-green-500"
               type="text"
               placeholder="url"
            />
            {formik.touched.url && formik.errors.url ? (
               <div className="text-red-500 text-sm leading-4">{formik.errors.url}</div>
            ) : null}
         </div>
         <Button type="submit" className="rounded-sm h-10 items-center disabled:bg-opacity-80">
            Güncelle
         </Button>
      </form>
   );
}
