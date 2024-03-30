// import { useEffect } from "react";
// import AppNavbar from "../AppNavbar";
// import { AvatarGenerator } from "random-avatar-generator";
// import { Link, withRouter, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteClass } from "../../store/actions/classActions";

// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// function ViewClass() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   let { slug: s_slug } = useParams();

//   const { students } = useSelector((state) => state.stu);
//   const { classes, deleted } = useSelector((state) => state.cla);
//   const classDetail = classes.filter(({ slug }) => slug == s_slug)[0];

//   console.log("classDetail.className:", classDetail.className);
//   console.log("Student data:", students);

//   const numOfStudents = students.filter(
//     ({ studentClass }) => studentClass === classDetail.className.toUpperCase()
//   );

//   console.log("Filtered students:", numOfStudents);

//   // Get the length of the filtered list
//   const numOfStudentsCount = numOfStudents.length;
//   console.log(numOfStudents);

//   const onDelete = (uid) => dispatch(deleteClass(uid));

//   React.useEffect(() => {
//     if (deleted) {
//       navigate("/classes"); // Use navigate to navigate
//     }
//   }, [deleted, navigate]);

//   return (
//     <>
//       <div className="">
//         <div className="">
//           {classDetail ? (
//             <>
//               <div className="border sm:mx-[100px] mod:mx-[10px] py-[3rem]  grid-cols-5 sm:grid ">
//                 <div className=" col-span-2  text-center ">
//                   <div className="mb-2">
//                     <img
//                       src={avatar}
//                       className="w-32 h-32 rounded-full mx-auto"
//                       alt="Avatar"
//                     />
//                   </div>
//                   <h1 className="text-2xl  font-medium italic">
//                     {classDetail.className}
//                   </h1>
//                 </div>
//                 <div className=" col-span-3  mod:mt-5 text-center">
//                   <div className="class__wrapper__right">
//                     {/* ul */}
//                     <ul>
//                       <li>
//                         <span className="font-bold mr-3 block">
//                           Class Name:
//                         </span>
//                         {classDetail.className}
//                       </li>
//                       <li className="mt-4">
//                         <h3>Number of students:</h3>
//                         {numOfStudentsCount > 0 ? (
//                           <>
//                             <li className="text-purple">
//                               {numOfStudentsCount}
//                             </li>
//                             <li>
//                               <h3>Student(s) enrolled in this Class:</h3>
//                               {numOfStudents.map(({ studentName }) => (
//                                 <li>
//                                   <span className="text-purple">
//                                     {studentName}
//                                   </span>
//                                 </li>
//                               ))}
//                             </li>
//                           </>
//                         ) : (
//                           <div>
//                             <h6 className="italic font-extralight">
//                               *No Students Attached to this course*
//                             </h6>
//                           </div>
//                         )}
//                         <div className="mt-5 justify-center sm:flex ">
//                           <div className="sm:mr-5   mod:mb-[30px]">
//                             <Link to={`/class/update/${classDetail.slug}`}>
//                               <button className=" text-start">
//                                 <a className="w-full px-4 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5 whitespace-nowrap">
//                                   Update Class
//                                 </a>
//                               </button>
//                             </Link>
//                           </div>
//                           <div>
//                             <Modal />
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                     {/* ul */}
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <h3>Record Unavailable for Course</h3>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default withRouter(ViewClass);

// import { useEffect } from "react";
// import AppNavbar from "../AppNavbar";
// import { AvatarGenerator } from "random-avatar-generator";
// import { Link, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteClass } from "../../store/actions/classActions";
// // import Modal from "./Modal";

// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// function ViewClass() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   let { slug: s_slug } = useParams();

//   const { students } = useSelector((state) => state.stu);
//   const { classes, deleted } = useSelector((state) => state.cla);
//   const classDetail = classes.find(({ slug }) => slug === s_slug);

//   console.log("classDetail.className:", classDetail.className);
//   console.log("Student data:", students);

//   const numOfStudents = students.filter(
//     ({ studentClass }) => studentClass === classDetail.className.toUpperCase()
//   );

//   console.log("Filtered students:", numOfStudents);

//   // Get the length of the filtered list
//   const numOfStudentsCount = numOfStudents.length;
//   console.log(numOfStudents);

//   const onDelete = (uid) => dispatch(deleteClass(uid));

//   useEffect(() => {
//     if (deleted) {
//       navigate("/classes"); // Use navigate to navigate
//     }
//   }, [deleted, navigate]);

//   return (
//     <>
//       <div className="">
//         <div className="">
//           {classDetail ? (
//             <>
//               <div className="border sm:mx-[100px] mod:mx-[10px] py-[3rem]  grid-cols-5 sm:grid ">
//                 <div className=" col-span-2  text-center ">
//                   <div className="mb-2">
//                     <img
//                       src={avatar}
//                       className="w-32 h-32 rounded-full mx-auto"
//                       alt="Avatar"
//                     />
//                   </div>
//                   <h1 className="text-2xl  font-medium italic">
//                     {classDetail.className}
//                   </h1>
//                 </div>
//                 <div className=" col-span-3  mod:mt-5 text-center">
//                   <div className="class__wrapper__right">
//                     {/* ul */}
//                     <ul>
//                       <li>
//                         <span className="font-bold mr-3 block">
//                           Class Name:
//                         </span>
//                         {classDetail.className}
//                       </li>
//                       <li className="mt-4">
//                         <h3>Number of students:</h3>
//                         {numOfStudentsCount > 0 ? (
//                           <>
//                             <li className="text-purple">
//                               {numOfStudentsCount}
//                             </li>
//                             <li>
//                               <h3>Student(s) enrolled in this Class:</h3>
//                               {numOfStudents.map(({ studentName }) => (
//                                 <li key={studentName}>
//                                   <span className="text-purple">
//                                     {studentName}
//                                   </span>
//                                 </li>
//                               ))}
//                             </li>
//                           </>
//                         ) : (
//                           <div>
//                             <h6 className="italic font-extralight">
//                               *No Students Attached to this course*
//                             </h6>
//                           </div>
//                         )}
//                         <div className="mt-5 justify-center sm:flex ">
//                           <div className="sm:mr-5   mod:mb-[30px]">
//                             <Link to={`/class/update/${classDetail.slug}`}>
//                               <button className=" text-start w-full px-4 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5 whitespace-nowrap ">
//                                 Update Class
//                               </button>
//                             </Link>
//                           </div>
//                           <div>
//                             <Modal />
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                     {/* ul */}
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <h3>Record Unavailable for Course</h3>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ViewClass;

// export function Modal() {
//   const [showModal, setShowModal] = React.useState(false);
//   const dispatch = useDispatch();
//   let { slug: s_slug } = useParams();
//   const onDelete = (uid) => dispatch(deleteClass(uid));
//   const { students } = useSelector((state) => state.stu);
//   const { classes, deleted } = useSelector((state) => state.cla);
//   const classDetail = classes.filter(({ slug }) => slug == s_slug)[0];

//   return (
//     <>
//       <div>
//         <button onClick={() => setShowModal(true)}>
//           <a className="w-full px-4 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5">
//             Delete Class
//           </a>
//         </button>
//       </div>
//       {showModal ? (
//         <>
//           <div className="fixed z-10 inset-0 overflow-y-auto">
//             <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//               <div
//                 className="fixed inset-0 transition-opacity"
//                 aria-hidden="true"
//               >
//                 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>{" "}
//               </div>
//               <span
//                 className="hidden sm:inline-block sm:align-middle sm:h-screen"
//                 aria-hidden="true"
//               >
//                 &#8203;
//               </span>
//               <div
//                 className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
//                 role="dialog"
//                 aria-modal="true"
//                 aria-labelledby="modal-headline"
//               >
//                 <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                   <div className="sm:flex sm:items-start">
//                     <button onClick={() => setShowModal(false)} type="button">
//                       <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                         <svg
//                           className="h-6 w-6 text-red-600"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           aria-hidden="true"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </div>
//                     </button>

//                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                       <h3
//                         className="text-lg leading-6 font-medium text-gray-900"
//                         id="modal-headline"
//                       >
//                         Delete Class
//                       </h3>
//                       <div className="mt-2">
//                         <p className="text-sm text-gray-500">
//                           Are you sure you want to delete this class? This
//                           action cannot be undone.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mod:text-center ">
//                   {/* <button onClick={() => onDelete(classDetail.customId)}>
//                     <a className="w-full px-6 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5  ">
//                       Delete Class
//                     </a>
//                   </button> */}
//                   <button
//                     onClick={() => onDelete(classDetail.customId)}
//                     className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-900 rounded-md lg:ml-5"
//                   >
//                     Delete Class
//                   </button>

//                   <button
//                     onClick={() => setShowModal(false)}
//                     type="button"
//                     className="mt-5 mr-5 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </>
//   );
// }

import { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass } from "../../store/actions/classActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewClass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { slug: s_slug } = useParams();

  const { students } = useSelector((state) => state.stu);
  const { classes, deleted } = useSelector((state) => state.cla);
  const classDetail = classes.filter(({ slug }) => slug == s_slug)[0];

  console.log("classDetail.className:", classDetail.className);
  console.log("Student data:", students);

  const numOfStudents = students.filter(
    ({ studentClass }) => studentClass === classDetail.className.toUpperCase()
  );

  console.log("Filtered students:", numOfStudents);

  // Get the length of the filtered list
  const numOfStudentsCount = numOfStudents.length;
  console.log(numOfStudents);

  const onDelete = (uid) => dispatch(deleteClass(uid));

  useEffect(() => {
    if (deleted) {
      navigate("/classes"); // Use navigate to navigate
    }
  }, [deleted, navigate]);

  return (
    <>
      <div className="">
        <div className="">
          {classDetail ? (
            <>
              <div className="border sm:mx-[100px] mod:mx-[10px] py-[3rem]  grid-cols-5 sm:grid ">
                <div className=" col-span-2  text-center ">
                  <div className="mb-2">
                    <img
                      src={avatar}
                      className="w-32 h-32 rounded-full mx-auto"
                      alt="Avatar"
                    />
                  </div>
                  <h1 className="text-2xl  font-medium italic">
                    {classDetail.className}
                  </h1>
                </div>
                <div className=" col-span-3  mod:mt-5 text-center">
                  <div className="class__wrapper__right">
                    {/* ul */}
                    <ul>
                      <li>
                        <span className="font-bold mr-3 block">
                          Class Name:
                        </span>
                        {classDetail.className}
                      </li>
                      <li className="mt-4">
                        <h3>Number of students:</h3>
                        {numOfStudentsCount > 0 ? (
                          <>
                            <li className="text-purple">
                              {numOfStudentsCount}
                            </li>
                            <li>
                              <h3>Student(s) enrolled in this Class:</h3>
                              {numOfStudents.map(({ studentName }) => (
                                <li>
                                  <span className="text-purple">
                                    {studentName}
                                  </span>
                                </li>
                              ))}
                            </li>
                          </>
                        ) : (
                          <div>
                            <h6 className="italic font-extralight">
                              *No Students Attached to this course*
                            </h6>
                          </div>
                        )}
                        <div className="mt-5 justify-center sm:flex ">
                          <div className="sm:mr-5   mod:mb-[30px]">
                            <Link to={`/class/update/${classDetail.slug}`}>
                              <button className=" text-start">
                                <a className="w-full px-4 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5 whitespace-nowrap">
                                  Update Class
                                </a>
                              </button>
                            </Link>
                          </div>
                          <div>
                            <Modal />
                          </div>
                        </div>
                      </li>
                    </ul>
                    {/* ul */}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h3>Record Unavailable for Course</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewClass;

export function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();
  let { slug: s_slug } = useParams();
  const onDelete = (uid) => dispatch(deleteClass(uid));
  const { students } = useSelector((state) => state.stu);
  const { classes, deleted } = useSelector((state) => state.cla);
  const classDetail = classes.filter(({ slug }) => slug == s_slug)[0];

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <div>
          <button>
            <a className="w-full px-4 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5 whitespace-nowrap">
              Delete Class
            </a>
          </button>
        </div>
      </button>
      {showModal ? (
        <>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>{" "}
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <button onClick={() => setShowModal(false)} type="button">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </button>

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Delete Class
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this class? This
                          action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mod:text-center ">
                  <button onClick={() => onDelete(classDetail.customId)}>
                    <a className="w-full px-6 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5  ">
                      Delete Class
                    </a>
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="mt-5 mr-5 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
