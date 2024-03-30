import { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../../store/actions/studentActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewStudent() {
  let { slug: s_slug } = useParams();
  const dispatch = useDispatch();

  const { students, deleted } = useSelector((state) => state.stu);
  const studentDetail = students.find(({ slug }) => slug === s_slug);

  if (studentDetail) {
    const totalCourses = studentDetail.studentCourse.length;
    console.log(totalCourses);
  } else {
    console.log(`No student found with slug: ${s_slug}`);
  }

  const totalCourses = studentDetail.studentCourse.length;

  console.log(totalCourses); // This will output the total number of courses

  const onDelete = (uid) => dispatch(deleteStudent(uid));

  useEffect(() => {
    if (deleted) {
      window.location.href = "/students";
    }
  }, [deleted]);

  return (
    <div className="">
      <div className="">
        {studentDetail ? (
          <>
            <div className="border sm:mx-[100px] mod:mx-[10px] py-[3rem]  grid-cols-5 sm:grid px-5">
              <div className=" col-span-2  text-center ">
                <div className="mb-2">
                  <img
                    src={avatar}
                    className="w-32 h-32 rounded-full mx-auto"
                    alt="Avatar"
                  />
                </div>
                <h1 className="text-2xl  font-medium italic">
                  {studentDetail.studentName
                    ? studentDetail.studentName.toUpperCase()
                    : ""}
                </h1>
              </div>

              <div className=" col-span-3  mod:mt-5 text-center">
                <div className="class__wrapper__right">
                  {/* ul */}
                  <ul>
                    {/* {totalCourse.length > 0 ? ( */}
                    <>
                      <li>
                        <span className="font-bold mr-3  mod:block">
                          Student Name:
                        </span>
                        {studentDetail.studentName
                          ? studentDetail.studentName.toUpperCase()
                          : ""}
                      </li>
                      <li className="">
                        <span className="font-bold mr-3 mod:block">Age:</span>
                        {studentDetail.studentAge}
                      </li>
                      <li>
                        <span className="font-bold mr-3  mod:block">
                          Class:
                        </span>
                        {studentDetail.studentClass}
                      </li>
                      <li>
                        <span className="font-bold mr-3  mod:block">
                          Courses:
                        </span>
                        <span className="whitespace-normal">
                          {studentDetail.studentCourse.join(", ")}
                        </span>
                      </li>
                      <li>
                        <span className="font-bold mr-3  mod:block">
                          Total number of courses:
                        </span>
                        <span>{totalCourses}</span>
                      </li>
                    </>

                    <div className="mt-5 justify-center sm:flex ">
                      <div className="sm:mr-5   mod:mb-[30px]">
                        <Link to={`/student/update/${studentDetail.slug}`}>
                          <button className=" text-start">
                            <a className="w-full px-4 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5 whitespace-nowrap">
                              Update Student
                            </a>
                          </button>
                        </Link>
                      </div>
                      <div>
                        <Modal />
                      </div>
                    </div>
                    {/* </li> */}
                  </ul>
                  {/* ul */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <h3>Record Unavailable for Student</h3>
        )}
      </div>
    </div>
  );
}
export default ViewStudent;

export function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  let { slug: s_slug } = useParams();
  const dispatch = useDispatch();

  const { students, deleted } = useSelector((state) => state.stu);
  const studentDetail = students.find(({ slug }) => slug === s_slug);

  if (studentDetail) {
    const totalCourses = studentDetail.studentCourse.length;
    console.log(totalCourses);
  } else {
    console.log(`No student found with slug: ${s_slug}`);
  }

  const onDelete = (uid) => dispatch(deleteStudent(uid));

  useEffect(() => {
    if (deleted) {
      window.location.href = "/students";
    }
  }, [deleted]);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <div>
          <button>
            <a className="w-full px-4 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5 whitespace-nowrap">
              Delete Student{" "}
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
                        Delete Student
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this student? This
                          action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mod:text-center ">
                  <button onClick={() => onDelete(studentDetail.customId)}>
                    <a className="w-full px-6 py-2 mt-3 text-cente text-white bg-indigo-900 rounded-md lg:ml-5  ">
                      Delete Stdent
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
