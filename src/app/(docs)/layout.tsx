"use client"
import { ReactNode, useState } from "react";
import Sidebar from "../_common/Sidebar";
import Navbar from "../_common/Navbar";
import { useEffect } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      const timeout = setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);


  return (
    <>
      <Navbar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />
      <main className="pt-16 md:pl-64">{children}</main>
    </>
  );
}
