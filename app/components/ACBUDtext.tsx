// ACBudText.tsx
import React from "react";


/**
 * Renders the ACBudText component. One-up your passed size prop.
 * 
 * @param {string} size - The size of the text.
 * @returns {JSX.Element} The rendered ACBudText component.
 * 
 * @example <p className="text-1xl">Some text... <ACBudText size="text-2xl" /></p>
 */
export default function ACBudText({ size }: { size?: string | "" }) {
  return (
    <>
      <span className={`${size} text-[#282828] font-serif font-bold text-xl tracking-[-0.3rem]`}>AC</span>
      {" "}
      <span className={`${size} text-[#4A00FF] font-serif font-black text-xl tracking-[0.1rem]`}>/</span>
      <span className={`${size} text-[#1F2937] font-serif font-bold text-xl`}>BUD</span>
    </>
  );
};
