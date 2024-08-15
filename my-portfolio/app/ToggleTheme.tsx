"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import * as React from "react";


export default function ToggleTheme() {

    const [isDark, setIsDark] = React.useState<boolean>();

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        if (isDark === undefined) {
            setIsDark(false);
        }
        setIsDark((d) => !d);
    }

    useEffect(() => {
        console.log("from inside useEffect")
        const themeSystem = window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false;
        if (!themeSystem) {
            console.log("should proc if light mode")
            document.documentElement.classList?.remove("dark");
            setIsDark(false)
        } else {
            setIsDark(true)
            if (!document.documentElement.classList.contains("dark")) {
                document.documentElement.classList?.add("dark");
            }
        }

        const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)')
        watchSysTheme.addEventListener('change', useSetIsDark)

        return () => {
            watchSysTheme.removeEventListener('change', useSetIsDark)
        }

    }, [])

    const useSetIsDark = (e: MediaQueryListEvent) => { 
        console.log('sys theme changed')
        document.documentElement.classList.toggle("dark");
        setIsDark( e.matches ) 
    }


    return (
        <button
            id="toggle-dark-mode"
            aria-label="toggle dark mode button"
            onClick={toggleDarkMode}>
            {isDark ? <Sun className="text-gray-100" /> : <Moon />}
        </button>
    );
}
