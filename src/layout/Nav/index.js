import React, { useState } from "react";
import RouterLink from "../../atoms/RouterLink";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Logo from "../../atoms/Logo";

const HamburgerIcon = () => (
  <svg
    className="fill-current h-6 w-6"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="fill-current h-6 w-6"
  >
    <path d="M11.85 17.56a1.5 1.5 0 0 1-1.06.44H10v.5c0 .83-.67 1.5-1.5 1.5H8v.5c0 .83-.67 1.5-1.5 1.5H4a2 2 0 0 1-2-2v-2.59A2 2 0 0 1 2.59 16l5.56-5.56A7.03 7.03 0 0 1 15 2a7 7 0 1 1-1.44 13.85l-1.7 1.71zm1.12-3.95l.58.18a5 5 0 1 0-3.34-3.34l.18.58L4 17.4V20h2v-.5c0-.83.67-1.5 1.5-1.5H8v-.5c0-.83.67-1.5 1.5-1.5h1.09l2.38-2.39zM18 9a1 1 0 0 1-2 0 1 1 0 0 0-1-1 1 1 0 0 1 0-2 3 3 0 0 1 3 3z" />
  </svg>
);

const Nav = ({ route }) => {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  useScrollPosition(({ currPos }) => {
    setScrolled(currPos.y < 0);
  });

  return (
    <nav
      id="header"
      className={`fixed w-full z-30 top-0 text-white ${
        isScrolled ? "bg-white shadow" : ""
      }`}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <RouterLink
            className={`no-underline hover:no-underline font-bold text-2xl lg:text-4xl  ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            href="/"
          >
            <Logo width="50" src={route?.fields?.logo?.value?.src} />
          </RouterLink>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            onClick={() => setSubmenuVisible(!submenuVisible)}
            className="flex items-center p-1 text-orange-800 hover:text-gray-900"
          >
            <HamburgerIcon />
          </button>
        </div>

        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20 ${
            submenuVisible ? "bg-gray-100" : "hidden bg-white"
          }  ${isScrolled ? "bg-white" : "bg-gray-100"}`}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-black font-bold no-underline"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#"
              >
                Venue
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#"
              >
                Sponsors
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#"
              >
                Organization
              </a>
            </li>
          </ul>
          <RouterLink href="/register">
            <button
              id="navAction"
              className={`mx-auto lg:mx-0 hover:underline font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 ${
                isScrolled ? "gradient text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="flex items-center">
                <div>
                  <LockIcon />
                </div>
                <div className="ml-1">Register</div>
              </div>
            </button>
          </RouterLink>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

export default Nav;
