import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeComponet } from "./components/HomeCompnent";
import AppNavbar from "./components/AppNavbar";
import Navbar from "./components/Navbar";
import store from "./store/store";
import { getClasses } from "./store/actions/classActions";
import { getCourses } from "./store/actions/courseAction";
import { getStudents } from "./store/actions/studentActions";
import AdminCourse from "./components/Courses/AdminCourse";
import Courses from "./components/Courses/Courses";
import UpdateCourse from "./components/Courses/UpdateCourse";
import { ViewCourse } from "./components/Views/ViewCourse";
import AdminClass from "./components/Classes/AdminClass";
import UpdateClass from "./components/Classes/UpdateClass";
import Classes from "./components/Classes/Classes";
import ViewClass from "./components/Views/ViewClass";
import AdminStudent from "./components/student/AdminStudent";
import Students from "./components/student/Students";
import UpdateStudent from "./components/student/UpdateStudent";
import ViewStudent from "./components/Views/ViewStudent";
import "./App.css";
import "./index.css";

store.dispatch(getStudents());
store.dispatch(getClasses());
store.dispatch(getCourses());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/create-class" element={<AdminClass />} />
          <Route path="/create-student" element={<AdminStudent />} />
          <Route path="/create-course" element={<AdminCourse />} />
          <Route path="/students" element={<Students />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/class/update/:slug" element={<UpdateClass />} />
          <Route path="/about-class/:slug" element={<ViewClass />} />
          <Route path="/about-course/:slug" element={<ViewCourse />} />
          <Route path="/student/update/:slug" element={<UpdateStudent />} />
          <Route path="/student/:slug" element={<ViewStudent />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/update/:slug" element={<UpdateCourse />} />
          <Route path="/" element={<HomeComponet />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
