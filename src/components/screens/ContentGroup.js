import React from "react";

export default function ContentGroup({ children }) {
  return (
    <div className="w-full h-full max-w-lg flex flex-col items-center justify-between relative space-y-4 py-16">
      {children}
    </div>
  );
}
