import { supabase } from "@/supabase";

export default async function page({ params: { username } }: { params: { username: string } }) {
   const { error, data } = await supabase.from("profiles").select().eq("username", username);

   if (!data?.length) {
      return <div className="h-full flex justify-center items-center text-white text-4xl">Not found</div>;
   }

   return (
      <div className="h-full flex justify-center items-center text-white">
         <pre>{JSON.stringify(data[0], null, 4)}</pre>
      </div>
   );
}
