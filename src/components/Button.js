import React from "react";
import { BG_XERO_NAVY, TEXT_XERO_NAVY, TEXT_WHITE } from "../colors";
import Image from "next/image";

export function PrimaryButton({ children, onClick }) {
  return (
    <div
      className={`rounded ${BG_XERO_NAVY} text-white font-bold w-full text-center py-4 px-4`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function SecondaryButton({ children, onClick }) {
  // Currently unused, but was in Figma
  return (
    <div
      className={`rounded ${TEXT_XERO_NAVY} font-bold w-full text-sm text-center py-2 px-4`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function BadOptionButton({ children, selectedBadReason, onClick }) {
  return (
    <div
      className={`rounded-3xl w-full  ${
        selectedBadReason == children
          ? `${BG_XERO_NAVY} ${TEXT_WHITE}`
          : `bg-white ${TEXT_XERO_NAVY}`
      } flex items-center justify-center`}
      onClick={onClick}
    >
      <div className="text-xs text-center py-1 px-3">{children}</div>
    </div>
  );
}

export function BackButton({ onClick }) {
  return (
    <div
      className={`rounded fixed top-5 left-5 text-xs font-semibold text-center`}
      onClick={onClick}
    >
      <Image src="back-arrow.svg" alt="back arrow" width={35} height={35} />
    </div>
  );
}

export function BackButtonInvert({ onClick }) {
  return (
    <div
      className={`rounded fixed top-5 left-5 text-xs font-semibold text-center`}
      onClick={onClick}
    >
      <Image
        src="back-arrow-invert.svg"
        alt="back arrow"
        width={35}
        height={35}
      />
    </div>
  );
}
