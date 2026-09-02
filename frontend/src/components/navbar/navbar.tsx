import { useContext } from "react"
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
    const { darkMode, setDarkMode } = useContext(GlobalStatesContext);

    return <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} 
    flex flex-row gap-10 items-center justify-center w-full h-15`}>
        <a href="https://github.com/iancuvictor" target="_blank"><FontAwesomeIcon icon={faGithub}/> Github</a>
        <button onClick={() => {
            setDarkMode(!darkMode)
            localStorage.setItem('darkMode', JSON.stringify(!darkMode));
        }}
            className={`${darkMode} cursor-pointer`}
        >{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
    </div>
}