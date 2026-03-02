import { SET_DARK_THEME, SET_LIGHT_THEME } from "./ThemeActionTypes";
import { lightTheme } from './Theme'

const initialState = {
    themeType: 'light',
    theme: lightTheme
}

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIGHT_THEME:
            return { ...state, theme: action.payload, themeType: 'light' }
        case SET_DARK_THEME:
            return { ...state, theme: action.payload, themeType: 'dark' }
        default:
            return state;
    }
    return state;
}