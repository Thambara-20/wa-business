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
import { setSocketId } from "./redux/user/slice";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "./redux/hooks";
const url = process.env.REACT_APP_API_URL;
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socket: any = io(`${url}`);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server", socket.id);
      dispatch(setSocketId(socket.id));
      socket.emit("authenticate", socket.id);
    });

    socket.on("disconnect", () => {
      socket.emit("userDisconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div>
      <AutoLogout />
      <Routes>
        <Route path={Paths.LOGIN} element={<Login />} />
        <Route path={Paths.REGISTER} element={<Register />} />
        <Route path={Paths.SIGNUP} element={<PasswordCreate />} />
        <Route path={Paths.TEMPLATE} element={<Template />} />
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.SETTINGS} element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
