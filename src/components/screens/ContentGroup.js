import React from "react";

export default function ContentGroup({ children }) {
  return (
    <div className="w-full h-full max-w-lg flex flex-col items-center justify-center relative space-y-16">
      {children}
    </div>
  );
}
