import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "app/store";

export interface InputState {
    inputText: string,
}

const initialState: InputState = {
    inputText: "", // введенный текст
};


export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        updateText(state, action: PayloadAction<string>) {
            state.inputText = action.payload
        },
        pushEmoji(state, action: PayloadAction<string>) {
            state.inputText += action.payload
        }
    },
});

export const {
    updateText, pushEmoji,
} = inputSlice.actions

export const selectInputText = (state: RootState) => state.input.inputText

export default inputSlice.reducer

