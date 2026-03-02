import { SET_DARK_THEME, SET_LIGHT_THEME } from "./ThemeActionTypes";

export const setLightTheme = theme => dispatch => {
    sessionStorage.setItem('themeType', 'light')
    dispatch({
        type: SET_LIGHT_THEME,
        payload: theme
    })
}

export const setDarkTheme = theme => dispatch => {
    sessionStorage.setItem('themeType', 'dark')
    dispatch({
        type: SET_DARK_THEME,
        payload: theme
    })
}