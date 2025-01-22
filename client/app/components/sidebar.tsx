import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const Sidebar = () => {
  return (
    <>
 
    <SignedIn>
      <UserButton></UserButton>
    </SignedIn>

    </>
  );
};

export default Sidebar;
