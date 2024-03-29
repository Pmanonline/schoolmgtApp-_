import { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../spinner";
import Error from "../error";
/* Actions */
import { updateStudent } from "../../store/actions/studentActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateStudent = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.cou);
  const { students, updated } = useSelector((state) => state.stu);
  const courseList = courses.map((c) => c.courseName);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [errorMessage, setErrorMessage] = useState("");
  console.log(courseList);
  console.log(students);
  console.log(courses);

  let { slug: s_slug } = useParams();
  const studentDetail = students.filter(({ slug }) => slug == s_slug)[0];

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentClass, setStudentClass] = useState("");

  useEffect(() => {
    var input1 = document.querySelector("input[name=tags]");
    new Tagify(input1, {
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

    if (studentDetail) {
      setStudentName(studentDetail.studentName.toUpperCase());
      setStudentAge(studentDetail.studentAge);
      setStudentClass(studentDetail.studentClass.toUpperCase());
    }
  }, [studentDetail]);

  useEffect(() => {
    if (updated) {
      window.location.href = "/students";
    }
  }, [updated]);

  /* Classes */
  const { classes } = useSelector((state) => state.cla);
  const classOptions = classes.map((c) => c.className);

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

    setTimeout(async () => {
      let courseStudents = [];
      const tags = document.querySelectorAll(".tagify__tag");
      for (var i = 0; i <= tags.length; i++) {
        if (tags[i]) {
          courseStudents.push(tags[i].getAttribute("value"));
        }
      }
      await dispatch(
        updateStudent({
          studentName: studentName,
          studentAge: studentAge,
          studentClass: studentClass,
          studentCourse: courseStudents,
          slug: studentDetail.slug,
          uid: studentDetail.uid,
          customId: studentDetail.customId,
        })
      );
      setErrorMessage("");
      setIsLoading(false);
    }, 3000); // 3 seconds delay
  };

  const handleUpdate = async () => {
    setIsLoading(true);
  };

  library.add(faCircle);

  return (
    <div className="">
      {studentDetail ? (
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
                    <label
                      className=" block text-start mod:hidden mr-2"
                      htmlFor=""
                    >
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
                    <label
                      className=" block text-start mod:hidden mr-2"
                      htmlFor=""
                    >
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
                    <label
                      className=" block text-start mod:hidden mr-2"
                      htmlFor="name"
                    >
                      Assign Courses to this Student
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="assigncourses"
                      placeholder="Assign Courses"
                      className="mb-3"
                      value={`${studentDetail.studentCourse}`}
                      class="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className=" block text-start mod:text-center sm:mb-4">
                    <label
                      className=" block text-start mod:hidden mr-2"
                      htmlFor=""
                    >
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

                  <div className=" text-start mod:text-center mod:mt-3">
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
                            Update Student
                          </a>
                        )}
                      </button>
                    </div>
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
      ) : null}
    </div>
  );
};

export default UpdateStudent;
