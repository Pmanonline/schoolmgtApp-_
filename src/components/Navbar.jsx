import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import lms1 from "../images/images.jpg";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [activeLink, setActiveLink] = useState("/courses"); // Initialize with a default value

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className="w-full">
        <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
          {/* Logo */}
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                  <Link to={`/`}>
                    <div className="mb-2">
                      <img
                        src={lms1}
                        className="w-[70px] h-[60px] rounded-full mx-auto"
                        alt="navimage"
                      />
                    </div>
                  </Link>

                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-gray-700 dark:focus:text-gray-300"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>

                  <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                    <>
                      <div className="text-center lg:flex lg:items-center">
                        {/* <ul className="items-center justify-end flex-1 pt-6 lg:pt-0 list-reset lg:flex"> */}
                        <ul className="items-center justify-end flex-1 pt-6 lg:pt-0 list-reset lg:flex">
                          <NavLink
                            to="/courses"
                            className={`inline-block pr-[35px] py-2 sm:text-lg font-bold ${
                              activeLink === "/courses"
                                ? "text-blue"
                                : "text-black"
                            } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
                            onClick={() => setActiveLink("/courses")}
                          >
                            Courses
                          </NavLink>

                          <NavLink
                            to="/classes"
                            className={`inline-block pr-[35px] py-2 sm:text-lg font-bold ${
                              activeLink === "/classes"
                                ? "text-blue"
                                : "text-black"
                            } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
                            onClick={() => setActiveLink("/classes")}
                          >
                            Classes
                          </NavLink>

                          <NavLink
                            to="/students"
                            className={`inline-block pr-[35px] py-2 sm:text-lg font-bold ${
                              activeLink === "/students"
                                ? "text-blue"
                                : "text-black"
                            } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
                            onClick={() => setActiveLink("/students")}
                          >
                            Students
                          </NavLink>
                          <li className="inline-block pr-[35px] py-2 text-lg font-bold text-gray-500 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none ">
                            <div className="relative group " ref={dropdownRef}>
                              <NavLink
                                className={`flex text-lg font-bold ${
                                  activeLink === "/create-course" ||
                                  activeLink === "/create-class" ||
                                  activeLink === "/create-student"
                                    ? "text-blue"
                                    : "text-black"
                                } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
                                onClick={() => setActiveLink("create")}
                              >
                                <button
                                  onClick={toggleDropdown}
                                  className="flex sm:text-lg text-[17px]"
                                >
                                  Creates
                                  <svg
                                    className="w-2.5 h-2.5 ml-2.5 mt-[8px]"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 4 4 4-4"
                                    />
                                  </svg>
                                </button>
                              </NavLink>

                              {isDropdownOpen && (
                                <div className="absolute bg-gray-100 mt-2 py-2 w-[130px] rounded shadow-lg transition-transform duration-2000 ease-out">
                                  <NavLink
                                    to="/create-course"
                                    className={`px-1 py-2 text-[16px] font-medium block whitespace-nowrap ${
                                      activeLink === "/create-course"
                                        ? "text-blue"
                                        : "text-black"
                                    }`}
                                    onClick={() =>
                                      setActiveLink("/create-course")
                                    }
                                  >
                                    Create a
                                    <span className="font-bold">course</span>
                                  </NavLink>

                                  <NavLink
                                    to="/create-class"
                                    className={`px-1 py-2 text-[16px] font-medium block whitespace-nowrap ${
                                      activeLink === "/create-class"
                                        ? "text-blue"
                                        : "text-black"
                                    }`}
                                    onClick={() =>
                                      setActiveLink("/create-class")
                                    }
                                  >
                                    Create a
                                    <span className="font-bold">class</span>
                                  </NavLink>
                                  <NavLink
                                    to="/create-student"
                                    className={`px-1 py-2 text-[16px] font-medium block whitespace-nowrap ${
                                      activeLink === "/create-student"
                                        ? "text-blue"
                                        : "text-black"
                                    }`}
                                    onClick={() =>
                                      setActiveLink("/create-student")
                                    }
                                  >
                                    Add a
                                    <span className="font-bold">student</span>
                                  </NavLink>
                                </div>
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </>
                  </Disclosure.Panel>
                </div>
              </>
            )}
          </Disclosure>

          {/* menu */}
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 lg:pt-0 list-reset lg:flex">
              <NavLink
                to="/courses"
                className={`inline-block pr-[35px] py-2 text-lg font-bold ${
                  activeLink === "/courses" ? "text-blue" : "text-black"
                } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
                onClick={() => setActiveLink("/courses")}
              >
                Courses
              </NavLink>

              <NavLink
                to="/classes"
                className={`inline-block pr-[35px] py-2 text-lg font-bold ${
                  activeLink === "/classes" ? "text-blue" : "text-black"
                } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
                onClick={() => setActiveLink("/classes")}
              >
                Classes
              </NavLink>

              <NavLink
                to="/students"
                className={`inline-block pr-[35px] py-2 text-lg font-bold ${
                  activeLink === "/students" ? "text-blue" : "text-black"
                } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
                onClick={() => setActiveLink("/students")}
              >
                Students
              </NavLink>

              <li className="inline-block pr-[35px] py-2 text-lg font-bold text-gray-500 no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                <div className="relative group" ref={dropdownRef}>
                  <NavLink
                    className={`inline-block pr-[35px] py-2 text-lg font-bold ${
                      activeLink === "/create-course" ||
                      activeLink === "/create-class" ||
                      activeLink === "/create-student"
                        ? "text-blue"
                        : "text-black"
                    } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
                    onClick={() => setActiveLink("create")}
                  >
                    <button onClick={toggleDropdown} className="flex">
                      Creates
                      <svg
                        className="w-2.5 h-2.5 ml-2.5 mt-[8px]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                  </NavLink>

                  {isDropdownOpen && (
                    <div className="absolute bg-gray-100 mt-2 py-2 w-[130px] rounded shadow-lg transition-transform duration-2000 ease-out">
                      <NavLink
                        to="/create-course"
                        className={`px-1 py-2 text-[16px] font-medium block whitespace-nowrap ${
                          activeLink === "/create-course"
                            ? "text-blue"
                            : "text-black"
                        }`}
                        onClick={() => setActiveLink("/create-course")}
                      >
                        Create a <span className="font-bold">course</span>
                      </NavLink>

                      <NavLink
                        to="/create-class"
                        className={`px-1 py-2 text-[16px] font-medium block whitespace-nowrap ${
                          activeLink === "/create-class"
                            ? "text-blue"
                            : "text-black"
                        }`}
                        onClick={() => setActiveLink("/create-class")}
                      >
                        Create a <span className="font-bold">class</span>
                      </NavLink>
                      <NavLink
                        to="/create-student"
                        className={`px-1 py-2 text-[16px] font-medium block whitespace-nowrap ${
                          activeLink === "/create-student"
                            ? "text-blue"
                            : "text-black"
                        }`}
                        onClick={() => setActiveLink("/create-student")}
                      >
                        Add a <span className="font-bold">student</span>
                      </NavLink>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
          {/* menu */}
        </nav>
      </div>
    </>
  );
}
