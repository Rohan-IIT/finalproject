import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar({ showNav, setShowNav }) {
  const router = useRouter();
  const userName = typeof window !== "undefined" ? localStorage.getItem("name") : null;

  const handleHomePageClick = () => {
    // Clear localStorage
    localStorage.clear();

    // Redirect to home page
    router.push("/");
  };

  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all bg-gray-100 duration-[400ms] ${showNav ? "pl-56" : ""
        }`}
    >
      <div className="pl-4 md:pl-16">
        <button
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        > X </button>
      </div>
      <div className="flex items-center pr-4 md:pr-16">

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <span className="hidden md:block font-medium text-gray-700">
                {userName || "Username"}
              </span>
            </Menu.Button>
          </div>
        </Menu>

        <div
          className={`m-5 rounded text-center cursor-pointer  flex items-center transition-colors ${router.pathname == "/"}`}
          onClick={handleHomePageClick}
        >
          <div>
            <p className="text-red-500">Return Home Page </p>
          </div>
        </div>

      </div>
    </div>
  );
}
