import { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import lms1 from "../images/images.jpg";

function NavList() {
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
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <NavLink
          to="/courses"
          className={`inline-block pr-[35px] py-2 sm:text-lg font-bold ${
            activeLink === "/courses" ? "text-blue" : "text-black"
          } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
          onClick={() => setActiveLink("/courses")}
        >
          Courses
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <NavLink
          to="/classes"
          className={`inline-block pr-[35px] py-2 sm:text-lg font-bold ${
            activeLink === "/classes" ? "text-blue" : "text-black"
          } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
          onClick={() => setActiveLink("/classes")}
        >
          Classes
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <NavLink
          to="/students"
          className={`inline-block pr-[35px] py-2 sm:text-lg font-bold ${
            activeLink === "/students" ? "text-blue" : "text-black"
          } no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none`}
          onClick={() => setActiveLink("/students")}
        >
          Students
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {/*  */}

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
            <>
              <div className="origin-left sm:absolute mod:relative right-[4px]  mt-2 w-50 rounded-md shadow-lg bg-gray-100 px-2 ring-1 ring-black ring-opacity-5 border-2  border-sky-800">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <NavLink
                    to="/create-course"
                    className={`px-1 py-2 text-sm hover:text-blue hover:scale-105 font-medium block whitespace-nowrap ${
                      activeLink === "/create-course"
                        ? "text-blue"
                        : "text-black"
                    }`}
                    // onClick={() => setActiveLink("/create-course")}
                    onClick={() => {
                      setActiveLink("create");
                      handleClickOutside();
                    }}
                  >
                    Create a
                    <span className="text-sm ml-1 font-bold">course</span>
                  </NavLink>

                  <NavLink
                    to="/create-class"
                    className={`px-1 py-2 text-sm hover:text-blue hover:scale-105 font-medium block whitespace-nowrap ${
                      activeLink === "/create-class"
                        ? "text-blue"
                        : "text-black"
                    }`}
                    onClick={() => {
                      setActiveLink("/create-class");
                      handleClickOutside();
                    }}
                  >
                    Create a{" "}
                    <span className="text-sm ml-1 font-bold">class</span>
                  </NavLink>
                  <NavLink
                    to="/create-student"
                    className={`px-1 py-2 text-sm hover:text-blue hover:scale-105 font-medium block whitespace-nowrap ${
                      activeLink === "/create-student"
                        ? "text-blue"
                        : "text-black"
                    }`}
                    onClick={() => {
                      setActiveLink("/create-student");
                      handleClickOutside();
                    }}
                  >
                    Add <span className="text-sm ml-1 font-bold">Students</span>
                  </NavLink>
                </div>
              </div>
            </>
          )}
        </div>
      </Typography>
    </ul>
  );
}

export function Navbar1() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto  px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to={`/`}>
          <div className="mb-2">
            <img
              src={lms1}
              className="w-[70px] h-[60px] rounded-full mx-auto"
              alt="navimage"
            />
          </div>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 text-blue" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 text-blue" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
