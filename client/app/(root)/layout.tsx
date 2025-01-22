import React from "react";
import Sidebar from "../components/sidebar";

export default function layout ({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="grid">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-11">
        {children}
      </div>
    </div>
    </>
  );
};
