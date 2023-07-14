interface PropsT {
   children: React.ReactNode;
   className?: string;
   type?: "button" | "reset" | "submit";
   disabled?: boolean;
   onClick?: () => void;
}

export default function Button({ className, onClick, children, type }: PropsT) {
   return (
      <button
         type={type}
         onClick={onClick}
         className={`bg-green-500 hover:bg-opacity-80 transition-colors px-10 h-10 rounded-full text-white ${className}`}
      >
         {children}
      </button>
   );
}
