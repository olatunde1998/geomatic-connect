"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ModalProps {
  show: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
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
        <div className="fixed inset-0 z-[1005] flex items-center justify-center overflow-y-auto">
          <div
            style={{ backdropFilter: "blur(4px)" }}
            className="fixed inset-0 bg-[#575D7299]"
            onClick={handleClose}
          ></div>
          <div
            ref={modalRef}
            className="p-3 z-20 md:w-fit max-h-full scrollbar-hide"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
