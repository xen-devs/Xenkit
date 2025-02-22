"use client";
import React from "react";

function MenuIcon({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) {
  return (
    <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
      <span></span>
      <span></span>
    </div>
  );
}

export default MenuIcon;
