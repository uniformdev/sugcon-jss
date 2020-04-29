import React, { useState } from "react";
import RouterLink from "../../atoms/RouterLink";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Logo from "../../atoms/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ route }) => {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  useScrollPosition(({ currPos }) => {
    setScrolled(currPos.y < 0);
  });

  const showSubmenu =
    "lg:bg-transparent text-black p-4 lg:p-0 z-20 bg-gray-100";
  const hideSubmenu =
    "hidden bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20";

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
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 ${
            submenuVisible ? showSubmenu : hideSubmenu
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
              <FontAwesomeIcon icon={faCalendarCheck} /> Register
            </button>
          </RouterLink>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

export default Nav;
