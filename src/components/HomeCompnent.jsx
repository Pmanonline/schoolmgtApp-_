// import { Provider, useSelector } from "react-redux";
// import { AvatarGenerator } from "random-avatar-generator";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import AppNavbar from "./AppNavbar";
// import Navbar from "../components/Navbar";

// /* Css */
// import "../styles.css";
// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// export const HomeComponet = () => {
//   const { courses } = useSelector((state) => state.cou);

//   return (
//     <div className="container">
//       <Navbar />
//       <AppNavbar />
//       <div className="home__wrapper">
//         <div className="home__left">
//           <img src={avatar} alt="Avatar" />

//           <h1>App Actions</h1>
//           <ul className="text-purple">
//             <li>Create & Manage Courses</li>
//             <li>Create & Manage Classes</li>
//             <li>Create & Manage Students</li>
//           </ul>
//         </div>

//         <div className="home__actions">
//           {courses.length > 0 ? (
//             <>
//               <div className="home__action">
//                 <Link to="/create-course">
//                   <button>Create a course</button>
//                 </Link>
//               </div>
//               <div className="home__action">
//                 <Link to="/create-class">
//                   <button>Create a class</button>
//                 </Link>
//               </div>
//               <div className="home__action">
//                 <Link to="/create-student">
//                   <button>Add a student</button>
//                 </Link>
//               </div>
//               <div className="home__manager">
//                 <Link to="/students">Manage Students</Link>
//                 <Link to="/classes">Manage Classes</Link>
//                 <Link to="/courses">Manage Courses</Link>
//               </div>
//             </>
//           ) : (
//             <div>
//               <h3>No Course Available</h3>
//               <Link to="/create-course">
//                 <h4>Create a Course</h4>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import { Provider, useSelector } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AppNavbar from "./AppNavbar";
import Navbar from "./Navbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* Css */
import "../index.css";
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();
library.add(faCircle);

export const HomeComponet = () => {
  const { courses } = useSelector((state) => state.cou);

  return (
    <div className="">
      <div className="border  mx-3 py-[3rem]  grid-cols-5 sm:grid">
        <div className=" col-span-2 text-center">
          <div>
            <img
              src={avatar}
              className="w-32 h-32 rounded-full mx-auto"
              alt="Avatar"
            />
          </div>

          <h1 className="text-3xl mb-3 text-blue italic font-black ">
            App Features
          </h1>
          <div className=" inline-block text-start">
            <div>
              <FontAwesomeIcon icon="circle" className=" text-gray-500 mr-2" />
              Create & Manage Courses
            </div>

            <div>
              <FontAwesomeIcon icon="circle" className=" text-gray-700 mr-2" />
              Create & Manage Classes
            </div>

            <div>
              <FontAwesomeIcon icon="circle" className="text-gray-900 mr-2" />
              Create & Manage Students
            </div>
          </div>
        </div>

        <div className=" col-span-3">
          {courses.length > 0 ? (
            <>
              <div className="border-2 w-100 hover:text-purple  hover:border-indigo-500 rounded-sm px-[20px] py-[10px] my-[15px] text-lg mx-[10px] text-center">
                <Link to="/create-course">
                  <button>Create a course</button>
                </Link>
              </div>
              <div className="border-2 w-100 hover:text-purple   hover:border-indigo-500 rounded-sm  px-[20px] py-[10px] my-[15px] text-lg mx-[10px] text-center">
                <Link to="/create-class">
                  <button>Create a class</button>
                </Link>
              </div>
              <div className="border-2 w-100 hover:text-purple   hover:border-indigo-500 rounded-sm  px-[20px] py-[10px] my-[15px] text-lg mx-[10px] text-center">
                <Link to="/create-student">
                  <button>Add a student</button>
                </Link>
              </div>
              <div className=" sm:flex mod:text-center  justify-between">
                <div className="hover:text-purple  hover:border-2 mod:my-2 sm:mx-2 sm:pl-5  font-bold">
                  <Link to="/students">Manage Students</Link>
                </div>

                <div className="hover:text-purple hover:border-2 mod:my-2 sm:mx-2 font-bold">
                  <Link to="/classes">Manage Classes</Link>
                </div>

                <div className="hover:text-purple  hover:border-2 mod:my-2 sm:mx-2 sm:pr-5 font-bold">
                  <Link to="/courses"> Manage Courses</Link>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h3>No Course Available</h3>
              <Link to="/create-course">
                <h4>Create a Course</h4>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
