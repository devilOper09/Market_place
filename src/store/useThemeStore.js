import {create} from "zustand"

export const useThemeStore = create((set)=>({
    theme: localStorage.getItem("Prefferd-theme") || "forest",
    setTheme: (theme)=>{
        localStorage.setItem("prefferd-theme" ,theme);
    set({theme})
    },
}));

