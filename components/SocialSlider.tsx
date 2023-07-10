import { FaFacebook, FaGithub, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

export default function SocialSlider() {
   return (
      <div className="w-full h-16 max-w-sm overflow-hidden relative mb-6">
         <div className="flex items-center gap-5 absolute social-slider-animation">
            <div className="w-16 h-16 flex items-center justify-center text-white text-2xl rounded-2xl bg-[#bc2a8d]">
               <FaInstagram />
            </div>
            <div className="w-16 h-16 flex items-center justify-center text-white text-2xl rounded-2xl bg-[#010101]">
               <FaTiktok />
            </div>
            <div className="w-16 h-16 flex items-center justify-center text-white text-2xl rounded-2xl bg-[#4267B2]">
               <FaFacebook />
            </div>

            <div className="w-16 h-16 flex items-center justify-center text-white text-2xl rounded-2xl bg-[#FF0000]">
               <FaYoutube />
            </div>
            <div className="w-16 h-16 flex items-center justify-center text-white text-2xl rounded-2xl bg-[#171515]">
               <FaGithub />
            </div>
            <div className="w-16 h-16 flex items-center justify-center text-white text-2xl rounded-2xl bg-[#1da1f2]">
               <FaTwitter />
            </div>
         </div>
      </div>
   );
}
