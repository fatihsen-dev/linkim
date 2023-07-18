"use client";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import { supabase } from "@/supabase";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";
import { Modal } from "@/components/modal/Modal";

interface PropsT {
   children: React.ReactNode;
}

export default function LayoutProvider({ children }: PropsT) {
   const pathname = usePathname();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const { login, user } = useAuthStore();

   const getUser = useCallback(async () => {
      try {
         const {
            data: { session },
         } = await supabase.auth.getSession();

         if (session) {
            const { error: ErrorProfile, data } = await supabase.from("profiles").select().eq("user", session.user.id);
            if (ErrorProfile) {
               return toast.error(ErrorProfile.message);
            }

            login(session.user as UserT, data[0]);
         }
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   }, [login]);

   useEffect(() => {
      getUser();
   }, [getUser]);

   const NavigationPages = ["/", "/about", "/profile"].some((n) => n === pathname);

   return (
      <>
         {isLoading ? (
            <Loading />
         ) : (
            <div className="h-[100vh] overflow-auto flex flex-col">
               {NavigationPages && <Navigation user={user} />}
               {children}
               <Modal />
            </div>
         )}
      </>
   );
}
