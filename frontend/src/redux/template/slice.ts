import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { select } from "redux-saga/effects";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export type Button = {
  id: number;
  name: string;
  mapping: string[];
  link: string;
  method: string;
  headers?: { [key: string]: string }[];
  body?: string;
};

export type template = {
  id: number;
  name: string;
  buttons: Button[];
  isloading: boolean;
  allowedMobileNumbers: string[];
  selectedButtonId?: number;
};

export const initialStateTemplate: template = {
  id: 1,
  isloading: false,
  allowedMobileNumbers: [],
  name: "Sample",
  buttons: [
    {
      id: 1,
      name: "Test Button",
      mapping: [],
      link: "https://sample.com",
      method: "GET",
      headers: [],
      body: "",
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
      console.log("Action Payload:", action.payload);
      const buttonIndex = state.buttons.findIndex(
        (button) => button.id === action.payload.id
      );
      state.buttons[buttonIndex] = {
        ...state.buttons[buttonIndex],
        ...action.payload,
      };
    },
    updateMobileNumbers: (state, action: PayloadAction<any>) => {
      state.allowedMobileNumbers = action.payload;
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
          mapping: [],
          link: "https://sample.com",
          method: "GET",
          headers: [],
          body: "",
        },
      ];
    },
    selectButton: (state, action: PayloadAction<number>) => {
      state.selectedButtonId = action.payload;
    },
    getTemplateByUserId: (state, action: PayloadAction<any>) => {},
    saveTemplate: (state, action: PayloadAction<any>) => {},
    getMobileNumbers: (state) => {},
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
  setTemplate,
  getMobileNumbers,
  updateMobileNumbers,
  selectButton,
} = userSlice.actions;
