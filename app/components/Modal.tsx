"use client";

import { modalState } from "@/atoms/modalAtom";
import React from "react";
import { useRecoilState } from "recoil";

function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  
  return (
    <div>
      {open && (
        <dialog className={`modal modal-middle ${open && "modal-open"}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click outside to close</p>
        </div>
        <form method="dialog" onClick={() => setOpen(false)} className="modal-backdrop" />
      </dialog>
      )}
    </div>
  );
}

export default Modal;
