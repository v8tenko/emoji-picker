import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "app/store";
import {DataHelper} from "../utils/DataHelper";

export interface PickerState {
    pickerShown: boolean,
    isHover: boolean,
    isWaiting: boolean,
    mode: "all" | "recent",
    emojiCount: [string, number][]
}

const initialState: PickerState = {
    pickerShown: false, // отображать пикер или нет
    isHover: false, // курсор над пикером/смайликом
    isWaiting: false, // ждем ли мы пока курсор вернеться к пикеру/смайлику
    mode: "all", // текущие стикеры (все или популярные)
    emojiCount: [] // число нажатий на каждый стикер
};

const WAITING_TIME = 300

export const mouseOut = createAsyncThunk(
    'picker /mouseOutEmoji',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setHover(false))
        setTimeout(() => {
            const {isHover, isWaiting} = (thunkAPI.getState() as RootState).picker
            if (!isHover && !isWaiting) {
                thunkAPI.dispatch(hidePicker())
                thunkAPI.dispatch(setWaiting(false))
            }
        }, WAITING_TIME)
    }
)

export const mouseOutPicker = createAsyncThunk(
    'picker/mouseOutPicker',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setHover(false))
        setTimeout(() => {
            const {isWaiting, isHover} = (thunkAPI.getState() as RootState).picker
            if (!isWaiting && !isHover) {
                thunkAPI.dispatch(hidePicker())
            }
        }, WAITING_TIME)
    }
)

export const inputSlice = createSlice({
    name: 'picker',
    initialState,
    reducers: {
        showPicker(state) {
            state.pickerShown = true
            state.isHover = true
            state.isWaiting = false
        },
        hidePicker(state) {
            state.pickerShown = false
        },
        setHover(state, action: PayloadAction<boolean>) {
            state.isHover = action.payload
        },
        setWaiting(state, action: PayloadAction<boolean>) {
            state.isWaiting = action.payload
        },
        setMode(state, action: PayloadAction<"all" | "recent">) {
            state.mode = action.payload
        },
        initEmojiCount(state, action: PayloadAction<[string, number][]>) {
            state.emojiCount = action.payload
            action.payload.forEach(([value, _], idx) => {
                DataHelper.setEmojiId(value, idx)
            })
        },
        increaseClickCount(state, action: PayloadAction<string>) {
            const index = DataHelper.getEmojisId(action.payload)
            let l = -1
            let r = index
            const currentCount = state.emojiCount[r][1] + 1
            let m: number
            while (r - l !== 1) {
                m = ~~((l + r) / 2)
                if (state.emojiCount[m][1] >= currentCount) {
                    l = m
                } else {
                    r = m
                }
            }
            const temp: [string, number] = [action.payload, currentCount]
            state.emojiCount[index] = state.emojiCount[r]
            state.emojiCount[r] = temp
            DataHelper.setEmojiId(state.emojiCount[index][0], index)
            DataHelper.setEmojiId(state.emojiCount[r][0], r)
        }
    },
});


export const {
    showPicker, hidePicker, setHover, setWaiting, setMode, initEmojiCount, increaseClickCount
} = inputSlice.actions

export const selectPickerShown = (state: RootState) => state.picker.pickerShown
export const selectRecent = (state: RootState) => state.picker.emojiCount
    .slice(0, 25)
    .filter(el => el[1] !== 0)
    .map(el => el[0])
export const selectMode = (state: RootState) => state.picker.mode
export const selectAllCount = (state: RootState) => state.picker.emojiCount

export default inputSlice.reducer

