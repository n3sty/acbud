"use client";
import { infoModalState } from "@/atoms/infoModalAtom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

function InfoModal() {
  // Set up the router
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the success and message from the search params
  const success = searchParams.get("success");
  const message = searchParams.get("message");

  // Set up the state for the modal
  const [open, setOpen] = useRecoilState(infoModalState);

  return (
    <dialog open={open} id="info-modal" className="modal bg-gray-700/30">
      <div
        className={`modal-box ${
          success ? "bg-white text-success" : "bg-error-content text-error"
        } p-8`}
      >
        <form onClick={() => setOpen(false)} method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-4xl font-serif">
          {success ? "Success!" : "Uh oh..."}
        </h3>
        <p className="mt-3 text-xl">
          {success ? message : "Something went wrong, please try again."}
        </p>
      </div>
      <form
        method="dialog"
        onClick={() => setOpen(false)}
        className="modal-backdrop"
      ></form>
    </dialog>
  );
}

export default InfoModal;
