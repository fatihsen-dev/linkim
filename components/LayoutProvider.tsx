"use client";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import { supabase } from "@/supabase";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";

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
   }, []);

   useEffect(() => {
      getUser();
   }, [getUser]);

   return (
      <>
         {isLoading ? (
            <Loading />
         ) : (
            <div className="h-screen overflow-auto flex flex-col">
               {pathname !== "/auth/login" && pathname !== "/auth/register" && <Navigation user={user} />}
               {children}
            </div>
         )}
      </>
   );
}
