import { faMagnifyingGlass, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext";
import CreateProjectScreen from "./createProjectScreen";
import { AdminStateContext } from "../../contexts/AdminStateContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProjectCard from "./projectCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProjectsPage() {
    const { admin } = useContext(AdminStateContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [createProject, setCreateProject] = useState(false);
    const { darkMode } = useContext(GlobalStatesContext);

    const { data, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: () => axios.get(`${API_URL}/public/projects`).then(res => res.data)
    })

    const searchBar = `${darkMode ? 'text-white bg-mauve-950' : 'text-black bg-white'} 
    ring-1 ring-mauve-900 outline-none border-none p-2 min-w-100 rounded-2xl flex items-center justify-center text-center
    flex items-center justify-center gap-3`

    if (isLoading) return <FontAwesomeIcon icon={faSpinner} />

    return <div className={`${darkMode ? 'text-white' : 'text-black'} w-full flex flex-col gap-5 items-center justify-center font-mozilla`}>
        <div className="flex flex-row items-center gap-5">
            <h1 className="font-[700] text-[24px]">PROJECTS</h1>
            {admin && <button className="w-8 h-8 ring-1 ring-mauve-900 bg-mauve-950 
        hover:bg-mauve-900 active:bg-black cursor-pointer"
                onClick={() => setCreateProject(true)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>}
        </div>
        <div className={searchBar}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={`text-neutral-600`} />
            <input className="min-w-100 outline-none border-none" type="text" onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search projects" />
        </div>

        {/* creating projects */}
        {createProject && <CreateProjectScreen setCreateProject={setCreateProject} />}
        <div className="flex flex-row justify-evenly flex-wrap gap-5 w-full pl-20 pr-20">
            {data.filter((project) => project.title.toLowerCase().replace(/\s+/g, '')
            .includes(searchQuery.toLowerCase().replace(/\s+/g, '')))
            .map((project) => {
                return <ProjectCard data={project} key={project._id} />
            })}
        </div>
    </div>
}