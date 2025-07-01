"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";

interface SheetProps {
  show: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({ show, onClose, children }) => {
  const [isOpen, setIsOpen] = useState(show);
  const modalRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    setIsOpen(show);
  }, [show]);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[1005] transition-all duration-&lsqb;350ms&rsqb; ease-in-out cursor-pointer ">
          <div
            style={{ backdropFilter: "blur(4px)" }}
            className="fixed inset-0 bg-[#575D7299]"
            onClick={handleClose}
          ></div>
          <div
            ref={modalRef}
            className="p-3 px-8 py-10 md:py-1 md:pb-10 z-50 md:w-[50%] lg:w-[40%] xl:w-[30%] overflow-y-auto h-full relative bg-white ml-auto  scrollbar-hide"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
