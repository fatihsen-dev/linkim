"use client";
import React from "react";
import NewLinkForm from "../NewLinkForm";
import { useModalStore } from "@/store/modal";
import Signout from "./Signout";

export default function Modal() {
   const { status, disable, name } = useModalStore();

   const renderModal = (name: string) => {
      switch (name) {
         case "create_new_link":
            return <NewLinkForm />;
         case "signout":
            return <Signout />;
      }
   };

   return (
      <div
         className={`absolute inset-0 flex justify-center items-center z-0 transition-opacity ${
            status ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
         }`}
      >
         <div onClick={disable} className="absolute inset-0 bg-black/50 z-[-1]"></div>
         {renderModal(name)}
      </div>
   );
}
