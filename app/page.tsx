"use client";
import { useAuthStore } from "@/store/auth";

export default function Home() {
   const { user } = useAuthStore();
   return (
      <div>
         <pre className="w-[500px] h-[500px] overflow-auto">{JSON.stringify(user, null, 2)}</pre>
      </div>
   );
}
