const { createContext, useState } = require("react");

export const ThemeContext = createContext()


export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))

    return <ThemeContext.Provider value={[isDark, setIsDark]}>{children}</ThemeContext.Provider>
}