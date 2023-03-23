import {defineStore} from "pinia"
import vuetify from "../plugins/vuetify"

export const useThemeStore = defineStore("theme", ()=>{
    type themes = "light" | "dark"
    const useTheme = ref<themes>("light")
    const changeTheme = () => {
        useTheme.value = useTheme.value === "dark" ? "light" : "dark"
        window.localStorage.setItem("themePref", useTheme.value)
    }
    const getThemeFromStorage = () => {
      const storageTheme = localStorage.getItem("themePref")
      console.log(storageTheme)
      if(storageTheme != "dark" && storageTheme != "light"){
        localStorage.setItem("themePref", useTheme.value)
        return
      }
      useTheme.value = storageTheme
    }

    const setTheme = (theme: themes) => {
        useTheme.value = theme
    }
    return {useTheme, changeTheme, getThemeFromStorage, setTheme}
})