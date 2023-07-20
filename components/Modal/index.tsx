"use client";
import React from "react";
import NewLinkForm from "../forms/NewLinkForm";
import { useModalStore } from "@/store/modal";
import Signout from "./Signout";
import EditProfile from "../forms/EditProfile";
import EditLink from "./EditLink";

export default function Index() {
   const { status, close, name } = useModalStore();

   const renderModal = (name: string) => {
      switch (name) {
         case "create_new_link":
            return <NewLinkForm />;
         case "signout":
            return <Signout />;
         case "edit_profile":
            return <EditProfile />;
         case "edit_link":
            return <EditLink />;
      }
   };

   return (
      <div
         className={`absolute inset-0 flex justify-center items-center z-0 transition-opacity p-4 ${
            status ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
         }`}
      >
         <div onClick={close} className="absolute inset-0 bg-black/50 z-[-1]"></div>
         {renderModal(name)}
      </div>
   );
}
