import { useState, useEffect } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import AppNavbar from "../AppNavbar";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../store/actions/courseAction";
import { Link } from "react-router-dom";
import Spinner from "../spinner"; // Import your spinner component
import Error from "../error";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminCourse = () => {
  const dispatch = useDispatch();
  const [courseName, setCourseName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [errorMessage, setErrorMessage] = useState("");
  const { created } = useSelector((state) => state.cou);

  useEffect(() => {
    if (created) {
      window.location.href = "/courses";
    }
  }, [created]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if the courseName is empty
    if (!courseName.trim()) {
      setErrorMessage("Course name cannot be empty");
      return;
    }

    setIsLoading(true); // Set loading to true when fetching data

    let courseStudents = [];
    const tags = document.querySelectorAll(".tagify__tag");
    for (var i = 0; i < tags.length; i++) {
      courseStudents.push(tags[i].getAttribute("value"));
    }

    // Simulate an API call with a delay
    // Replace this with your actual API call
    setTimeout(() => {
      dispatch(createCourse({ courseName: courseName }));
      setErrorMessage(""); // Clear errorMessage when data fetching is complete
      setIsLoading(false); // Set loading to false when data fetching is complete
    }, 3000); // Simulated 3-second delay
  };

  return (
    <>
      <div className="border mx-3 py-[3rem] grid-cols-6 sm:grid">
        <div className="col-span-3 text-center">
          <div className="mb-2">
            <img
              src={avatar}
              className="w-32 h-32 rounded-full mx-auto"
              alt="Avatar"
            />
          </div>

          <h1 className="text-3xl">Course Creation</h1>
          <ul>
            <li>Create A Course (eg: English)</li>
            <li>Add students to course</li>
          </ul>
        </div>

        <div className="col-span-3 sm:mt-[60px] mod:mt-5 text-center">
          <div className="class__wrapper__right">
            <form onSubmit={onSubmit}>
              <div className="form-group mb-5">
                <label className="mod:hidden mr-2" htmlFor="name">
                  Course Name
                </label>
                <input
                  type="text"
                  name="coursename"
                  id="coursename"
                  placeholder="Course Name"
                  className="w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
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
                      Create Course
                    </a>
                  )}
                </button>
              </div>
              {errID === "COURSE__ERROR" ? (
                <div
                  className="err-msgs mb-5"
                  style={{ color: "red", marginTop: "10px" }}
                >
                  {errMsg}
                </div>
              ) : null}
              {errorMessage && <Error>{errorMessage}</Error>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCourse;
