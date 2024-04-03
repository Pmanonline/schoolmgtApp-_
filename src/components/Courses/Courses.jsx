import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";

const Courses = () => {
  const { courses } = useSelector((state) => state.cou);
  console.log(courses);

  return (
    <div className="lg:mx-[150px] mod:mx-[20px] mb-5">
      {courses.length > 0 ? (
        <ul className="allClasses">
          <h2 className="text-center my-5 font-semibold">List of Courses</h2>

          {courses.map(({ courseName, slug }, id) => {
            return (
              <li>
                <div class=" mx-auto  container ">
                  <table class="min-w-full border border-gray-300">
                    <tbody>
                      <tr key={id} class="bg-white  text-center">
                        <td class="px-6 py-4 border-b hover:bg-gray-100 border-gray-300">
                          <Link to={`/about-course/${slug}`}>
                            {" "}
                            {courseName.toUpperCase()}
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <h3>No Course Available</h3>
          <br />
          <Link to="/create-course"> Add a Course</Link>
        </div>
      )}
    </div>
  );
};

export default Courses;
