import { createSlice } from "@reduxjs/toolkit";
import { LANGUAGE_CONFIG } from "../app/Editor/constants/index";

const initialState = {
    language: LANGUAGE_CONFIG.javascript.id,
    code: LANGUAGE_CONFIG.javascript.defaultCode,
    theme: "vs-dark",
    font: 15,
    isRunning: false,
    output: "",
    error: null,
    executionResult: {
        code: "",
        output: "",
        error: null,
    },
};

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        updateLanguage: (state, action) => {
            state.language = action.payload;
            state.code = LANGUAGE_CONFIG[action.payload].defaultCode;
        },
        updateCode: (state, action) => {
            state.code = action.payload;
        },
        updateTheme: (state, action) => {
            state.theme = action.payload;
        },
        updateFont: (state, action) => {
            state.font = action.payload;
        },
        setRunning: (state, action) => {
            state.isRunning = action.payload;
        },
        setOutput: (state, action) => {
            state.output = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setExecutionResult: (state, action) => {
            state.executionResult = action.payload;
        },

    },
});

export const {
    updateLanguage,
    updateCode,
    updateTheme,
    updateFont,
    setRunning,
    setOutput,
    setError,
    setExecutionResult,
} = editorSlice.actions;

export default editorSlice.reducer;