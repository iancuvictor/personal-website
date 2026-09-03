import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext";

export default function ProjectsPage(){
    const [searchQuery, setSearchQuery] = useState('')
    const { darkMode } = useContext(GlobalStatesContext);

    const searchBar = `${darkMode ? 'text-white bg-mauve-950' : 'text-black bg-white'} 
    ring-1 ring-mauve-900 outline-none border-none p-2 min-w-100 rounded-2xl flex items-center justify-center text-center
    flex items-center justify-center gap-3`

    return <div className={`${darkMode ? 'text-white' : 'text-black' } w-full flex flex-col gap-5 items-center justify-center font-mozilla`}>
        <h1 className="font-[700] text-[24px]">PROJECTS</h1>
        <div className="w-[40%] flex items-center justify-center">
            <div className={searchBar}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={`text-neutral-600`} />
                <input className="min-w-100 outline-none border-none" type="text" onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search projects" />
            </div>

            <div>
                
            </div>
        </div>
    </div>
}