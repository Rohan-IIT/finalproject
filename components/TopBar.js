import { Fragment } from "react";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";

export default function TopBar({ showNav, setShowNav }) {
  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <button
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        > click </button>
      </div>
      <div className="flex items-center pr-4 md:pr-16">
  
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <span className="hidden md:block font-medium text-gray-700">
                Username
              </span>
            </Menu.Button>
          </div>
    
        </Menu>
      </div>
    </div>
  );
}
