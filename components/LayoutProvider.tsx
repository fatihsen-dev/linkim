"use client";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import { supabase } from "@/supabase";

interface PropsT {
   children: React.ReactNode;
}

export default function LayoutProvider({ children }: PropsT) {
   const pathname = usePathname();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [user, setUser] = useState<any>();

   const getUser = useCallback(async () => {
      try {
         const {
            data: { session },
         } = await supabase.auth.getSession();

         if (session) {
            setUser(session);
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

   console.log(user);

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
