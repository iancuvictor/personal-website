import { useContext } from "react"
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router";
import { faEnvelope, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const { darkMode, setDarkMode } = useContext(GlobalStatesContext);

    const navbarNavlink = ({ isActive }) => `${isActive ? 'underline underline-offset-4' : 'underline-none'}`

    return <div className={`flex flex-row items-center justify-center w-full pt-5 pb-5`}>
        <div className={`${darkMode ? 'text-white ring-white' : 'text-black ring-black'} ring-1 flex flex-row gap-10 items-center justify-between rounded-xl w-[80%] pl-10 pr-10 pb-5 pt-5`}>
            <div className="group flex items-center">
                <span className={`absolute opacity-100 group-hover:opacity-0 font-mozilla font-[600] duration-100 ease-out`}>IANCU VICTOR-IULIU</span>
                <a href='mailto:iancuvictorwork@gmail.com'
                    className={`absolute opacity-0 group-hover:opacity-100 font-mozilla font-[600] duration-100 ease-in`}>
                        <FontAwesomeIcon icon={faEnvelope}/> {" "}
                        iancuvictorwork@gmail.com</a>
            </div>
            <div className="flex flex-row gap-5 items-center justify-center font-[600]">
                <NavLink to={'/'} className={navbarNavlink}>Projects</NavLink>
                <NavLink to={'/cv'} className={navbarNavlink}>CV</NavLink>
                <NavLink to={'/about'} className={navbarNavlink}>About me</NavLink>
                <NavLink to={'/contact'} className={navbarNavlink}>Contact</NavLink>
                <a href="https://github.com/iancuvictor" target="_blank"><FontAwesomeIcon icon={faGithub} /> Github</a>
                <button onClick={() => {
                    setDarkMode(!darkMode)
                    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
                }}
                    className={`${darkMode} cursor-pointer`}
                >{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
            </div>
        </div>
    </div>
}