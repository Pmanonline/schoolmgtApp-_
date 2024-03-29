import { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";
import Spinner from "../spinner"; // Import your spinner component
import Error from "../error";

/* Actions */
import { updateAClass } from "../../store/actions/classActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateClass = () => {
  let { slug: s_slug } = useParams();
  const dispatch = useDispatch();
  const { classes, updated } = useSelector((state) => state.cla);

  const classDetail = classes.filter(({ slug }) => slug === s_slug)[0];

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [errorMessage, setErrorMessage] = useState("");
  const [className, setClassName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (updated) {
      window.location.href = "/classes";
    }

    if (classDetail) {
      setClassName(classDetail.className);
    }
  }, [classDetail, updated]);

  const onChange = (e) => setClassName(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if the className is empty
    if (!className.trim()) {
      setErrorMessage("Update field cannot be empty");
      return;
    }

    setIsLoading(true); // Set loading to true before making the API request

    // Simulate an API call with a delay of 5 seconds
    setTimeout(async () => {
      // Pass the updated className from the component's state
      await dispatch(
        updateAClass({
          className: className, // Use the updated className from the state
          slug: classDetail.slug,
          uid: classDetail.uid,
          customId: classDetail.customId,
        })
      );
      setErrorMessage("");
      setIsLoading(false); // Set loading to false after the 5-second delay
    }, 3000); // 3000 milliseconds (5 seconds) delay
  };

  return (
    <div className="">
      <div className="">
        {classDetail ? (
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

                <h1 className="text-3xl">Update a class</h1>
                <ul>
                  <li>Update or change class_Name</li>
                </ul>
              </div>

              <div className=" col-span-3 sm:mt-[60px] mod:mt-5 text-center">
                <div className="class__wrapper__right">
                  <form>
                    <div className="form-group mb-5 ">
                      <label className="mod:hidden  mr-2" htmlFor="name ">
                        Class Name
                      </label>
                      <input
                        type="text"
                        name="classname"
                        id="classname"
                        placeholder="Class Name"
                        value={className}
                        onChange={onChange}
                        className=" mb-3 w-[64%] border-2 rounded-sm px-4 py-2 focus:outline-none
                        focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:pl-10">
                      <button onClick={onSubmit} className="ml-[10px] relative">
                        {isLoading ? (
                          // Render the spinner if isLoading is true
                          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                            <Spinner />
                          </div>
                        ) : (
                          // Render the button content if isLoading is false
                          <a className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-900 rounded-md lg:ml-5">
                            Update Class_Name
                          </a>
                        )}
                      </button>
                    </div>

                    {errID !== "COURSE__ERROR" && errMsg.message ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default UpdateClass;
