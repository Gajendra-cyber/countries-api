
import { useTheme } from "../hooks/useTheme"

function Header({theme}) {
  [isDark, setIsDark] = useTheme()


  return (
    <header className={`header-container ${isDark ? 'dark' : ''}`}>
      <div className="header-content">
        <h2 className="title">Where in the world?</h2>
        <p onClick={()=> {
          setIsDark(!isDark)
          localStorage.setItem('isDarkMode', !isDark)
          }}><i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`}></i>&nbsp;&nbsp;{isDark ? 'Light' : 'Dark'}Mode</p>
      </div>
    </header>
  )
}

export default Header