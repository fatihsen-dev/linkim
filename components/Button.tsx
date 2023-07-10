interface PropsT {
   children: React.ReactNode;
   className?: string;
   onClick?: () => void;
}

export default function Button({ className, onClick, children }: PropsT) {
   return (
      <button
         onClick={onClick}
         className={`bg-green-500 hover:bg-opacity-80 transition-colors px-10 py-3 rounded-full text-white ${className}`}
      >
         {children}
      </button>
   );
}
