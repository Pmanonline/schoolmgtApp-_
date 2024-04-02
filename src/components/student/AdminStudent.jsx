// import { useState, useEffect } from "react";
// import AppNavbar from "../AppNavbar";
// import { useSelector, useDispatch } from "react-redux";
// import { AvatarGenerator } from "random-avatar-generator";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Spinner from "../spinner";
// import Error from "../error";
// import { createStudent } from "../../store/actions/studentActions";
// import Select from "react-select"; // Import Select component from react-select

// /* Avatar */
// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();
// library.add(faCircle);

// const AdminStudent = () => {
//   const dispatch = useDispatch();
//   const { courses } = useSelector((state) => state.cou);
//   const { created } = useSelector((state) => state.stu);
//   const courseList = courses.map((c) => ({
//     value: c.courseName.toUpperCase(),
//     label: c.courseName.toUpperCase(),
//   })); // Update courseList format for react-select
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const [studentName, setStudentName] = useState("");
//   const [studentAge, setStudentAge] = useState("");
//   const [studentClass, setStudentClass] = useState("");
//   const [selectedCourses, setSelectedCourses] = useState([]); // State to store selected courses

//   useEffect(() => {
//     if (created) {
//       return (window.location = "/students");
//     }
//   }, [created]);

//   const { classes } = useSelector((state) => state.cla);
//   const classOptions = classes.map((c) => ({
//     value: c.className.toUpperCase(),
//     label: c.className.toUpperCase(),
//   }));

//   const onChange = (e) => {
//     setStudentClass(e.target.value);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (!studentName.trim()) {
//       setErrorMessage("Student name cannot be empty");
//       return;
//     }

//     if (!studentAge.trim()) {
//       setErrorMessage("Student age cannot be empty");
//       return;
//     }

//     if (!studentClass.trim()) {
//       setErrorMessage("Student class cannot be empty");
//       return;
//     }
//     setIsLoading(true);

//     // Extracting selected courses from react-select component
//     const courseValues = selectedCourses.map((course) => course.value);

//     setTimeout(() => {
//       dispatch(
//         createStudent({
//           studentName: studentName,
//           studentAge: studentAge,
//           studentClass: studentClass,
//           studentCourse: courseValues,
//         })
//       );
//       setErrorMessage("");
//       setIsLoading(false);
//     }, 5000);
//   };

//   return (
//     <>
//       <div className="border mx-3 py-[3rem] grid-cols-6 sm:grid">
//         <div className="col-span-3 text-center sm:mt-[0px]">
//           <div className="class__wrapper__left">
//             <div className="mb-2">
//               <img
//                 src={avatar}
//                 className="w-32 h-32 rounded-full mx-auto"
//                 alt="Avatar"
//               />
//             </div>

//             <div className="inline-block text-start">
//               <div className="mb-1">
//                 <FontAwesomeIcon icon="circle" className="text-gray-500 mr-2" />
//                 Update Student Name
//               </div>
//               <div className="mb-1">
//                 <FontAwesomeIcon icon="circle" className="text-gray-500 mr-2" />
//                 Update Student Class
//               </div>
//               <div className="mb-1">
//                 <FontAwesomeIcon icon="circle" className="text-gray-500 mr-2" />
//                 Update Student Age
//               </div>
//               <div>
//                 <FontAwesomeIcon icon="circle" className="text-gray-500 mr-2" />
//                 Update Student Course(s)
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-3 mod:mt-5 text-center">
//           <form onSubmit={onSubmit} method="post">
//             <div className="form-group">
//               <div className="block text-start mod:text-center mb-4">
//                 <label className="block text-start mod:hidden mr-2" htmlFor="">
//                   Student Name
//                 </label>
//                 <input
//                   type="text"
//                   name="studentname"
//                   id="studentname"
//                   placeholder="Student Name"
//                   className="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={studentName}
//                   onChange={(e) => setStudentName(e.target.value)}
//                 />
//               </div>
//               <div className="block text-start mod:text-center mb-4">
//                 <label className="block text-start mod:hidden mr-2" htmlFor="">
//                   Student Age
//                 </label>
//                 <input
//                   type="number"
//                   name="studentage"
//                   id="studentage"
//                   placeholder="Student Age"
//                   className="mb-3"
//                   onChange={(e) => setStudentAge(e.target.value)}
//                   value={studentAge}
//                   className="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="block text-start mod:text-center mb-4">
//                 <label className="block text-start mod:hidden mr-2" htmlFor="">
//                   Assign Courses to this Student
//                 </label>
//                 <Select
//                   isMulti
//                   name="assigncourses"
//                   className="w-[64%] rounded-sm py-2 shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   options={courseList}
//                   value={selectedCourses}
//                   onChange={setSelectedCourses} // Update selected courses state
//                 />
//               </div>
//               <div className="block text-start mod:text-center sm:mb-4">
//                 <label className="block text-start mod:hidden mr-2" htmlFor="">
//                   Select Class of Student
//                 </label>

//                 <select
//                   className="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={studentClass}
//                   onChange={onChange}
//                 >
//                   {classOptions.map((o) => (
//                     <option key={o.value} value={o.value}>
//                       {o.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="text-start mod:text-center mod:mt-5">
//                 <button className="ml-[10px] relative">
//                   {isLoading ? (
//                     <div className="sm:ml-[5rem] absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
//                       <Spinner />
//                     </div>
//                   ) : (
//                     <a className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-900 rounded-md lg:ml-5">
//                       Create Course
//                     </a>
//                   )}
//                 </button>
//                 <div className="text-start flex">
//                   {errorMessage && <Error>{errorMessage}</Error>}
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminStudent;
import { useState, useEffect, useRef } from "react";
import AppNavbar from "../AppNavbar";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../spinner";
import Error from "../error";
import { createStudent } from "../../store/actions/studentActions";
import Select from "react-select"; // Import Select component from react-select

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();
library.add(faCircle);

const AdminStudent = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.cou);
  const { created } = useSelector((state) => state.stu);
  const courseList = courses.map((c) => ({
    value: c.courseName.toUpperCase(),
    label: c.courseName.toUpperCase(),
  })); // Update courseList format for react-select
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dropdownRef = useRef(null);

  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]); // State to store selected courses

  useEffect(() => {
    if (created) {
      window.location = "/students";
    }
  }, [created]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { classes } = useSelector((state) => state.cla);
  const classOptions = classes.map((c) => ({
    value: c.className.toUpperCase(),
    label: c.className.toUpperCase(),
  }));

  const onChange = (e) => {
    setStudentClass(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!studentName.trim()) {
      setErrorMessage("Student name cannot be empty");
      return;
    }

    if (!studentAge.trim()) {
      setErrorMessage("Student age cannot be empty");
      return;
    }

    if (!studentClass.trim()) {
      setErrorMessage("Student class cannot be empty");
      return;
    }
    setIsLoading(true);

    // Extracting selected courses from react-select component
    const courseValues = selectedCourses.map((course) => course.value);

    setTimeout(() => {
      dispatch(
        createStudent({
          studentName: studentName,
          studentAge: studentAge,
          studentClass: studentClass,
          studentCourse: courseValues,
        })
      );
      setErrorMessage("");
      setIsLoading(false);
    }, 5000);
  };

  return (
    <>
      <div className="border mx-3 py-[3rem] grid-cols-6 sm:grid">
        <div className="col-span-3 text-center sm:mt-[0px]">
          <div className="class__wrapper__left">
            <div className="mb-2">
              <img
                src={avatar}
                className="w-32 h-32 rounded-full mx-auto"
                alt="Avatar"
              />
            </div>

            <div className="inline-block text-start">
              <div className="mb-1">
                <FontAwesomeIcon icon="circle" className="text-gray-500 mr-2" />
                Update Student Name
              </div>
              <div className="mb-1">
                <FontAwesomeIcon icon="circle" className="text-gray-500 mr-2" />
                Update Student Class
              </div>
              <div className="mb-1">
                <FontAwesomeIcon icon="circle" className="text-gray-500 mr-2" />
                Update Student Age
              </div>
              <div>
                <FontAwesomeIcon icon="circle" className="text-gray-500 mr-2" />
                Update Student Course(s)
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 mod:mt-5 text-center">
          <form onSubmit={onSubmit} method="post">
            <div className="form-group">
              <div className="block text-start mod:text-center mb-4">
                <label className="block text-start mod:hidden mr-2" htmlFor="">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentname"
                  id="studentname"
                  placeholder="Student Name"
                  className="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div className="block text-start mod:text-center mb-4">
                <label className="block text-start mod:hidden mr-2" htmlFor="">
                  Student Age
                </label>
                <input
                  type="number"
                  name="studentage"
                  id="studentage"
                  placeholder="Student Age"
                  onChange={(e) => setStudentAge(e.target.value)}
                  value={studentAge}
                  className="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                />
              </div>

              <div className="block text-start mod:text-center mb-4">
                <label className="block text-start mod:hidden mr-2" htmlFor="">
                  Assign Courses to this Student
                </label>
                <Select
                  ref={dropdownRef}
                  isMulti
                  name="assigncourses"
                  className="w-[64%] rounded-sm py-2 shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  options={courseList}
                  value={selectedCourses}
                  onChange={setSelectedCourses} // Update selected courses state
                />
              </div>
              <div className="block text-start mod:text-center sm:mb-4">
                <label className="block text-start mod:hidden mr-2" htmlFor="">
                  Select Class of Student
                </label>

                <select
                  className="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={studentClass}
                  onChange={onChange}
                >
                  {classOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-start mod:text-center mod:mt-5">
                <button className="ml-[10px] relative">
                  {isLoading ? (
                    <div className="sm:ml-[5rem] absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : (
                    <a className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-900 rounded-md lg:ml-5">
                      Create Course
                    </a>
                  )}
                </button>
                <div className="text-start flex">
                  {errorMessage && <Error>{errorMessage}</Error>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminStudent;
