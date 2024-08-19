import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface SelectInputProps {
  setShowAddInvoice?: any;
  placeholder?: string;
  onSelect?: any;
  inputData?: any;
  disabled?: any;
  getSelectedItem?: any;
}

export const Select = ({
  onSelect,
  inputData,
  getSelectedItem,
  disabled,
  placeholder,
}: SelectInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside the select component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: any) => {
    if (item.name.toLowerCase() !== selected.toLowerCase()) {
      setSelected(item.name);
      setOpen(false);
      setInputValue("");
      onSelect ? onSelect(item) : null;
    }
  };

  return (
    <div className="text-sm space-y-3">
      <div
        ref={dropdownRef}
        className="font-medium relative border border-slate-300  cursor-pointer w-[220px]"
      >
        <div
          onClick={() => !disabled && setOpen(!open)}
          className={`bg-white  p-4 w-full  rounded-lg flex items-center justify-between input-default ${
            !selected && "text-gray-400"
          }`}
        >
          <input
            type="text"
            value={
              selected
                ? selected.length > 25
                  ? selected.substring(0, 25) + "..."
                  : selected
                : getSelectedItem
                ? getSelectedItem
                : ""
            }
            placeholder={placeholder}
            className="w-full text-[#575D72] focus:outline-none bg-white"
            readOnly
          />
          <RiArrowDownSLine
            size={24}
            className={` text-[#575D72] font-extrabold ${open && "rotate-180"}`}
          />
        </div>

        <ul
          className={`shadow-md shadow-gray-400 bg-white mt-1 overflow-y-auto w-full font-normal cursor-pointer ${
            open ? "max-h-52" : "max-h-0"
          } absolute top-full w-full z-50`}
        >
          {inputData?.map((item: any, index: number) => (
            <li
              key={index}
              className={`p-4 text-black hover:text-black dark:text-accent text-sm hover:hover:bg-[#ECF1F7] cursor-pointer hover:text-accent
              ${item?.name?.toLowerCase() === selected?.toLowerCase() && ""}
              ${
                item?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
              onClick={() => handleSelect(item)}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
