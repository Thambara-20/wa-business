import Home from "./containers/Home/HomeMain";
import { Route, Routes } from "react-router-dom";
import PasswordCreate from "./containers/PasswordCreate/PasswordCreate";
import ProtectedRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import AutoLogout from "./components/AutoLogout/AutoLogout";
import Template from "./containers/Templates/TemplateMain";
import Settings from "./containers/Settings/SettingsMain";
import "./App.css";
import "aos/dist/aos.css";

export enum Paths {
  LOGIN = "/login",
  HOME = "/",
  SIGNUP = "/signup",
  TEMPLATE = "/template",
  SETTINGS = "/settings",
  REGISTER = "/register",
  NOTFOUND = "/404",
}

const routes = [{ path: Paths.HOME, element: <Home /> }];

function App() {


  return (
    <div>
      <AutoLogout />
      <Routes>
        <Route path={Paths.LOGIN} element={<Login />} />
        <Route path={Paths.REGISTER} element={<Register />} />
        <Route path={Paths.SIGNUP} element={<PasswordCreate />} />
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.SETTINGS} element={<Settings />} />
          <Route path={Paths.TEMPLATE} element={<Template />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
