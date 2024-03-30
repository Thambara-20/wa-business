import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export type Button = {
  id: number;
  name: string;
  type: string;
  link: string;
};

export type template = {
  id: number;
  name: string;
  buttons: Button[];
  isloading: boolean;
};

export const initialStateTemplate: template = {
  id: 1,
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
    setTemplate: (state, action: PayloadAction<any>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.buttons = action.payload.buttons;
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
    clearTemplate: (state) => {
      state.id = 1;
      state.name = "Sample";
      state.buttons = [
        {
          id: 1,
          name: "Test Button",
          type: "",
          link: "https://sample.com",
        },
      ];
    },
    getTemplateByUserId: (state, action: PayloadAction<any>) => {},
    saveTemplate: (state, action: PayloadAction<any>) => {},
  },
});

export default userSlice.reducer;
export const {
  updatetemplate,
  updateButton,
  deleteButton,
  getTemplateByUserId,
  saveTemplate,
  clearTemplate,
  setTemplate
} = userSlice.actions;
