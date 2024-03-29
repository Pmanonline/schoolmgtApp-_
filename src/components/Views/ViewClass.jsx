import { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass } from "../../store/actions/classActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewClass() {
  const dispatch = useDispatch();
  const { slug: s_slug } = useParams();

  const { students } = useSelector((state) => state.stu);
  const { classes, deleted } = useSelector((state) => state.cla);
  const classDetail = classes.find(({ slug }) => slug === s_slug);

  const numOfStudents = students.filter(
    ({ studentClass }) => studentClass === classDetail.className.toUpperCase()
  );

  const numOfStudentsCount = numOfStudents.length;

  const onDelete = (uid) => dispatch(deleteClass(uid));

  useEffect(() => {
    if (deleted) {
      window.location.href = "/classes";
    }
  }, [deleted]);

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
                                <li key={studentName}>
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
                          <div>{/* <Modal /> */}</div>
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
