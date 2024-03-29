import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";

const Students = () => {
  const { students } = useSelector((state) => state.stu);

  const { courses } = useSelector((state) => state.cou);
  const { classes } = useSelector((state) => state.cla);
  console.log(students.length);
  console.log(students);
  console.log(students.slug);

  return (
    <div className="">
      {students.length > 0 && courses.length > 0 && classes.length > 0 ? (
        <div class=" mx-auto  container ">
          <table class="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Name
                </th>
                <th class="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Age
                </th>
                <th class="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Class
                </th>
                <th class="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Courses
                </th>
              </tr>
            </thead>

            {students.map(
              (
                { studentName, studentAge, studentClass, studentCourse, slug },
                id
              ) => {
                return (
                  <tbody key={id}>
                    <tr className="bg-white text-center">
                      <td className="px-6 py-4 border-b hover:bg-gray-100 border-gray-300">
                        <Link to={`/student/${slug}`}>
                          {studentName.toUpperCase()}
                        </Link>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {studentAge}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {studentClass.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        <select value="">
                          <option defaultValue="1">Courses</option>
                          {studentCourse.map((course, index) => (
                            <option key={index} value={index}>
                              {course.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                );
              }
            )}
          </table>
        </div>
      ) : (
        <div style={{ paddingLeft: "10px" }}>
          <h4>Please complete the following to manage students</h4>
          <ul>
            {courses.length < 1 ? (
              <li>
                <Link to="/create-course"> Create a course</Link>
              </li>
            ) : null}
            {classes.length < 1 ? (
              <li>
                <Link to="/create-class">Create a Class</Link>
              </li>
            ) : null}
            {classes.length > 0 && courses.length > 0 ? (
              <li>
                <Link to="/create-student">Add a Student</Link>
              </li>
            ) : null}
          </ul>
        </div>
      )}{" "}
    </div>
  );
};

export default Students;
