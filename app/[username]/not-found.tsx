import Link from "next/link";

export default function NotFound() {
   return (
      <div className="h-full text-white flex flex-col justify-center items-center">
         <h1 className="text-7xl font-medium">404</h1>
         <span className="text-lg font-thin tracking-wider">
            Kullanıcı bulunamadı{" "}
            <Link className="text-blue-500 font-bold" href="/">
               Anasayfa
            </Link>
         </span>
      </div>
   );
}
