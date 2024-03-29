import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

type Button = {
  id: number;
  name: string;
  type: string;
  link: string;
};

type template = {
  id: string;
  name: string;
  buttons: Button[];
  isloading: boolean;
};

export const initialStateTemplate: template = {
  id: "1",
  isloading: false,
  name: "Sample",
  buttons: [
    {
      id: 1,
      name: "Test Button",
      type: "",
      link: "https://sample.com",
    },
  ],
};

const userSlice = createSlice({
  name: "template",
  initialState: initialStateTemplate,
  reducers: {
    updatetemplate: (state, action: PayloadAction<Partial<template>>) => {
      Object.assign(state, action.payload);
    },
    updateButton: (state, action: PayloadAction<Partial<Button>>) => {
      const buttonIndex = state.buttons.findIndex(
        (button) => button.id === action.payload.id
      );
      state.buttons[buttonIndex] = {
        ...state.buttons[buttonIndex],
        ...action.payload,
      };
    },
    deleteButton: (state, action: PayloadAction<number>) => {
      state.buttons = state.buttons.filter((e) => e.id != action.payload);
    },
    getTemplateByUserId: (state, action: PayloadAction<any>) => {},
  },
});

export default userSlice.reducer;
export const { updatetemplate, updateButton, deleteButton, getTemplateByUserId } = userSlice.actions;
