"use client";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import { supabase } from "@/supabase";
import { useAuthStore } from "@/store/auth";

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
            login(session.user);
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
            <>
               {pathname !== "/auth/login" && pathname !== "/auth/register" && <Navigation user={user} />}
               {children}
            </>
         )}
      </>
   );
}
