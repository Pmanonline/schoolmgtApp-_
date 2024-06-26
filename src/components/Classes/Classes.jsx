import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";

const Classes = () => {
  const { classes } = useSelector((state) => state.cla);
  console.log(classes);

  return (
    <div className="lg:mx-[150px] mod:mx-[20px]">
      {classes.length > 0 ? (
        <ul className="allClasses">
          <h2 className="text-center my-5 font-semibold">List of Classes</h2>
          {classes.map(({ className, slug }, id) => {
            return (
              <li>
                <div className=" mx-auto  container ">
                  <table className="min-w-full border border-gray-300">
                    <tbody>
                      <tr key={id} className="bg-white  text-center">
                        <td className="px-6 py-4 border-b hover:bg-gray-100 border-gray-300">
                          <Link to={`/about-class/${slug}`}>
                            {className.toUpperCase()}
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
          <h3>No Class Available</h3>
          <br />
          <Link to="/create-class"> Create a class</Link>
        </div>
      )}
    </div>
  );
};

export default Classes;
