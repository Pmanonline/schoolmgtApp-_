import { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";
import Spinner from "../spinner";
import Error from "../error";

/* Actions */
import { updateACourse } from "../../store/actions/courseAction";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateCourse = () => {
  const dispatch = useDispatch();
  let { slug: s_slug } = useParams();
  const { courses, updated } = useSelector((state) => state.cou);
  const { students } = useSelector((state) => state.stu);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [courseName, setCourseName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const courseDetail = courses.filter(({ slug }) => slug === s_slug)[0];
  const { msg: errMsg, id: errID } = useSelector((state) => state.error);

  useEffect(() => {
    var input1 = document.querySelector("input[name=tags]");

    if (courseDetail && students) {
      const studentList = students
        .map(({ studentcourse, studentName }) => {
          if (
            studentcourse &&
            studentcourse.includes(courseDetail.courseName.toLowerCase())
          ) {
            return studentName ? studentName.toUpperCase() : null;
          }
          return null;
        })
        .filter((std) => std !== null);

      if (students.length > 0)
        new Tagify(input1, {
          whitelist: [...studentList],
          dropdown: {
            classname: "color-blue",
            enabled: 0,
            maxItems: 5,
            position: "text",
            closeOnSelect: false,
            highlightFirst: true,
          },
        });
    }

    if (courseDetail) {
      setCourseName(courseDetail.courseName);
    }
  }, [courseDetail]);

  useEffect(() => {
    if (updated) {
      window.location.href = "/courses";
    }
  }, [updated]);

  const onChange = (e) => setCourseName(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if the courseName is empty
    if (!courseName.trim()) {
      setErrorMessage("Update name cannot be empty");
      return;
    }
    setIsLoading(true); // Set loading to true before making the API request

    let courseStudents = [];
    const tags = document.querySelectorAll(".tagify__tag");
    for (var i = 0; i < tags.length; i++) {
      courseStudents.push(tags[i].getAttribute("value"));
    }

    // Simulate an API call with a delay of 5 seconds
    setTimeout(() => {
      dispatch(
        updateACourse({
          courseName: courseName,
          slug: courseDetail.slug,
          uid: courseDetail.uid,
          customId: courseDetail.customId,
        })
      );
      setErrorMessage("");
      setIsLoading(false); // Set loading to false when data fetching is complete
    }, 3000); // 3000 milliseconds (5 seconds) delay
  };

  return (
    <>
      <div className="">
        <div className="">
          {courseDetail ? (
            <>
              <div className="border  mx-3 py-[3rem]  grid-cols-6 sm:grid">
                <div className=" col-span-3 text-center">
                  <div className="mb-2">
                    <img
                      src={avatar}
                      className="w-32 h-32 rounded-full mx-auto"
                      alt="Avatar"
                    />
                  </div>
                  <h1 className="text-3xl">Update a course</h1>
                  <ul>
                    <li>Update or change course_Name</li>
                  </ul>
                </div>

                <div className=" col-span-3 sm:mt-[60px] mod:mt-5 text-center">
                  <div className="class__wrapper__right">
                    <form {...{ onSubmit }}>
                      <div className="form-group mb-5 ">
                        <label className="mod:hidden  mr-2" htmlFor="name ">
                          Course Name
                        </label>
                        <input
                          type="text"
                          name="classname"
                          id="classname"
                          placeholder="Class Name"
                          className="mb-3"
                          value={courseName}
                          {...{ onChange }}
                          class="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none
         focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="sm:pl-10">
                        <button className="ml-[10px] relative">
                          {isLoading ? (
                            <>
                              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                <Spinner />
                              </div>
                            </>
                          ) : (
                            // Render the button content if isLoading is false
                            <a className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-900 rounded-md lg:ml-5">
                              Update Course_Name
                            </a>
                          )}
                        </button>
                        {errID === "COURSE__ERROR" ? (
                          <div
                            className="err-msgs mb-5"
                            style={{ color: "red", marginTop: "10px" }}
                          >
                            {errMsg}
                          </div>
                        ) : null}
                        {errorMessage && <Error>{errorMessage}</Error>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;
