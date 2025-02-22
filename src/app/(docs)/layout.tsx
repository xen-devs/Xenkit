"use client"
import { ReactNode, useState } from "react";
import Sidebar from "../_common/Sidebar";
import Navbar from "../_common/Navbar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <Sidebar isOpen={isOpen}  />
      <main className="pt-16 md:pl-64">{children}</main>
    </>
  );
}
