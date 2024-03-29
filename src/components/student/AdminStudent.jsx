import { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../spinner";
import Error from "../error";

/* Actions */
import { createStudent } from "../../store/actions/studentActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();
library.add(faCircle);

const AdminStudent = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.cou);
  const { created } = useSelector((state) => state.stu);
  const { students } = useSelector((state) => state.stu);
  const courseList = courses.map((c) => c.courseName.toUpperCase());
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(courseList);
  console.log(students.length);

  useEffect(() => {
    var input = document.querySelector("input[name=tags]");
    new Tagify(input, {
      whitelist: [...courseList],
      dropdown: {
        classname: "color-blue",
        enabled: 0,
        maxItems: 5,
        position: "text",
        closeOnSelect: false,
        highlightFirst: true,
      },
    });
  }, []);

  useEffect(() => {
    if (created) {
      return (window.location = "/students");
    }
  }, [created]);

  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentCourse, setStudentCourse] = useState("");

  /* Classes */
  const { classes } = useSelector((state) => state.cla);
  const classOptions = classes.map((c) => c.className.toUpperCase());

  const onChange = (e) => {
    setStudentClass(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Check if studentName is empty
    if (!studentName.trim()) {
      setErrorMessage("Student name cannot be empty");
      return;
    }

    // Check if studentAge is empty
    if (!studentAge.trim()) {
      setErrorMessage("Student age cannot be empty");
      return;
    }

    // Check if studentClass is empty
    if (!studentClass.trim()) {
      setErrorMessage("Student class cannot be empty");
      return;
    }
    setIsLoading(true); // Set loading to true when fetching data

    let courseStudents = [];
    const tags = document.querySelectorAll(".tagify__tag");
    for (var i = 0; i <= tags.length; i++) {
      if (tags[i]) {
        courseStudents.push(tags[i].getAttribute("value"));
      }
    }

    // Simulate an API call with a delay
    // Replace this with your actual API call
    setTimeout(() => {
      dispatch(
        createStudent({
          studentName: studentName,
          studentAge: studentAge,
          studentClass: studentClass,
          studentCourse: courseStudents,
        })
      );
      setErrorMessage("");
      setIsLoading(false); // Set loading to false when data fetching is complete
    }, 5000); // Simulated 5-second delay
  };
  return (
    <>
      <div className="border  mx-3 py-[3rem]  grid-cols-6 sm:grid">
        <div className=" col-span-3 text-center sm:mt-[0px]">
          <div className="class__wrapper__left">
            <div className="mb-2">
              <img
                src={avatar}
                className="w-32 h-32 rounded-full mx-auto"
                alt="Avatar"
              />
            </div>

            <div className=" inline-block text-start">
              <div className="mb-1">
                <FontAwesomeIcon
                  icon="circle"
                  className=" text-gray-500 mr-2"
                />
                Update Student Name
              </div>
              <div className="mb-1">
                <FontAwesomeIcon
                  icon="circle"
                  className=" text-gray-500 mr-2"
                />
                Update Student Class
              </div>
              <div className="mb-1">
                <FontAwesomeIcon
                  icon="circle"
                  className=" text-gray-500 mr-2"
                />
                Update Student Age
              </div>
              <div className="">
                <FontAwesomeIcon
                  icon="circle"
                  className=" text-gray-500 mr-2"
                />
                Update Student Course(s)
              </div>
            </div>
          </div>
        </div>

        <div className=" col-span-3 mod:mt-5 text-center">
          <form {...{ onSubmit }} method="post">
            <div className="form-group">
              <div className=" block text-start mod:text-center mb-4">
                <label className=" block text-start mod:hidden mr-2" htmlFor="">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentname"
                  id="studentname"
                  placeholder="Student Name"
                  class="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div className=" block text-start mod:text-center mb-4">
                <label className=" block text-start mod:hidden mr-2" htmlFor="">
                  Student Age
                </label>
                <input
                  type="number"
                  name="studentage"
                  id="studentage"
                  placeholder="Student Age"
                  className="mb-3"
                  onChange={(e) => setStudentAge(e.target.value)}
                  value={studentAge}
                  class="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className=" block text-start mod:text-center mb-4">
                <label className=" block text-start mod:hidden mr-2" htmlFor="">
                  Assign Courses to this Student
                </label>
                <input
                  type="text"
                  name="tags"
                  id="assigncourses"
                  placeholder="Assign Courses"
                  class="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // value={`${studentDetail.studentCourse.toUpperCase()}`}
                />
              </div>
              <div className=" block text-start mod:text-center sm:mb-4">
                <label className=" block text-start mod:hidden mr-2" htmlFor="">
                  Select Class of Student
                </label>

                <select
                  class="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={studentClass}
                  {...{ onChange }}
                >
                  {classOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" text-start mod:text-center mod:mt-5">
                <button className="ml-[10px] relative">
                  {isLoading ? (
                    <>
                      <div className=" sm:ml-[5rem] absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <Spinner />
                      </div>
                    </>
                  ) : (
                    // Render the button content if isLoading is false
                    <a className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-900 rounded-md lg:ml-5">
                      Create Course
                    </a>
                  )}
                </button>
                <div className="text-start flex">
                  {errID === "STUDENT__ERROR" ? (
                    <div
                      className="err-msgs mb-5 "
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {errMsg}
                    </div>
                  ) : null}
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
