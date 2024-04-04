import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

enum Role {
  ADMIN = "admin",
  OBSERVER = "observer",
  NONE = "",
}
type newUser = {
  _id: string;
  name: string;
  password: string;
  email: string;
  role: Role;
  registered: boolean;
  isVerifiedUser: boolean;
  mobileError: boolean;
  phoneId?: string;
  tel?: string;
  whatsappToken?: string;
  verifyToken?: string;
};

type InitialDataTypeUser = {
  isLogged: boolean;
  socketId?: string;
  role: Role;
  email?: string;
  password?: string;
  loginError?: boolean;
  whatsappToken?: string;
  phoneId?: string;
  verifyToken?: string;
  tel?: string;
  newUser: newUser;
  active: boolean;
  mobileError: boolean;
  passwordCreated?: boolean;
};

export const initialStateUser: InitialDataTypeUser = {
  isLogged: false,
  role: Role.NONE,
  mobileError: false,
  socketId: "",
  email: "",
  password: "",
  active: false,
  loginError: false,
  newUser: {
    _id: "",
    name: "",
    password: "",
    email: "",
    role: Role.OBSERVER,
    registered: false,
    isVerifiedUser: false,
    mobileError: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    setSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<InitialDataTypeUser>>
    ) => {
      Object.assign(state, action.payload);
      state.loginError = false;
      state.mobileError = false;
      state.passwordCreated = false;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isLogged = true;
      state.loginError = false;
      state.role = action.payload.role;
      state.active = action.payload.active;
      state.email = action.payload.email;
      state.whatsappToken = action.payload.whatsappToken;
      state.phoneId = action.payload.phoneId;
      state.verifyToken = action.payload.verifyToken;
      state.tel = action.payload.tel;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loginError = true;
      // localStorage.removeItem(LocalstorageId);
    },
    registerSuccess: (state) => {
      state.newUser.registered = true;
      state.newUser.isVerifiedUser = false;
    },
    logoutSuccess: (state) => {
      state.isLogged = false;
      state.whatsappToken = "";
      state.phoneId = "";
      state.email = "";
      state.password = "";
      state.role = Role.NONE;
      state.active = false;
      state.tel = "";
      state.verifyToken = "";
    },
    signup: (state, action: PayloadAction<any>) => {
      //middleware
    },
    updateNewUser: (
      state,
      action: PayloadAction<Partial<InitialDataTypeUser["newUser"]>>
    ) => {
      state.newUser = { ...state.newUser, ...action.payload };
      state.newUser.isVerifiedUser = false;
      state.newUser.mobileError = false;
    },
    setNewUserVerification: (state, action: PayloadAction<boolean>) => {
      state.newUser.isVerifiedUser = action.payload;
    },

    addNewUser: (state, action: PayloadAction<any>) => {
      //middleware
    },
    login: (state, action: PayloadAction<any>) => {
      //middleware
    },
    authenticate: (state) => {
      //middleware
    },
    register: (state, action: PayloadAction<any>) => {
      //middleware
    },
    logout: (state) => {
      //middleware
    },
    updateUserSettings: (state, action: PayloadAction<any>) => {
      //middleware
    },
    mobileError: (state) => {
      state.mobileError = true;
    },
    newUserMobileError: (state) => {
      state.newUser.mobileError = true;
    },
    passwordCreationSuccess: (state) => {
      state.passwordCreated = true;
    },
    passwordCreationFailed: (state) => {
      state.passwordCreated = false;
    },
  },
});

export { Role };
export default userSlice.reducer;
export const {
  newUserMobileError,
  mobileError,
  login,
  logoutSuccess,
  logout,
  loginFail,
  updateUser,
  setNewUserVerification,
  updateNewUser,
  addNewUser,
  loginSuccess,
  authenticate,
  signup,
  register,
  registerSuccess,
  setSocketId,
  updateUserSettings,
  passwordCreationSuccess,
  passwordCreationFailed,
} = userSlice.actions;
