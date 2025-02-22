import React from "react";
import MenuIcon from "./MenuIcon";
import { useRouter } from 'next/navigation'

function Navbar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0a0a0a] text-white py-4 px-5 flex items-center justify-between">
      <button onClick={() => router.push('/')} className="text-3xl font-bold">Xenkit</button>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/xen-devs/Xenkit"
          className="hidden md:block text-[#d5d5d5] border-[#535353] hover:shadow-[0_0_10px_#535353] text-lg rounded-md px-2.5 border hover:backdrop-brightness-50 hover:drop-shadow-2xl transition duration-300"
        >
          Contribute
        </a>
        <div className="md:hidden pr-2 mb-1">
          <MenuIcon isOpen={isOpen} toggleMenu={toggleSidebar} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
