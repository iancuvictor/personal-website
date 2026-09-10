import { faSquareCheck as squareCheckSolid } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck as squareCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

interface CreateProjectScreenProps {
    setCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
}

type Photo = {
    path: string
}

type Form = {
    title: string,
    slug: string,
    url: string,
    github: string,
    publishedAt: string,
    description: string,
    highlighted: boolean,
    techStack: string[],
    photos: Photo[]
}

const API_URL = import.meta.env.VITE_API_URL;

export default function CreateProjectScreen({ setCreateProject }: CreateProjectScreenProps) {
    const { darkMode } = useContext(GlobalStatesContext);

    const [form, setForm] = useState({
        title: '',
        slug: '',
        url: '',
        github: '',
        publishedAt: '',
        description: '',
        highlighted: false,
        techStack: [],
        photos: []
    })

    const inputStyle = `${darkMode ? 'ring-mauve-500 bg-mauve-900' : 'ring-mauve-950 bg-gray-100 focus-within:bg-white'} text-[13px] 
    flex flex-col gap-1 ring-1 rounded-md pl-2 pr-2 pt-1 pb-2 w-120 duration-75 ease-out`
    const inputField = `${darkMode ? 'bg-mauve-950' : 'bg-gray-200'} text-[12px] pl-2 pr-2 pt-1 pb-1 rounded-md outline-none border-none`

    const createProject = useMutation({
        mutationFn: (form: Form) => axios.post(`${API_URL}/admin/createProject`, form, { withCredentials: true }),
        onSuccess: () => {
            toast.success(`Project added successfully`)
        },
        onError: () => {
            toast.error(`An error has occured!`)
        }
    })

    const slugify = (phrase) => {
        return phrase.trim().toLowerCase().replace(/\s+/g, '-')
    }


    return <div className="z-10 fixed inset-0 flex flex items-center justify-center backdrop-blur-3xl">
        <div className={`${darkMode ? 'bg-black' : 'bg-white shadow-md/20'} h-170 flex flex-col items-center gap-5 p-5 rounded-md`}>
            <div className="flex flex-row gap-2">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                        <span>General data</span>
                        <div className={inputStyle}>
                            <span>Title *</span>
                            <input type="text" className={inputField}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                onBlur={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
                        </div>
                        <div className={inputStyle}>
                            <span>Slug *</span>
                            <span className="flex items-center gap-0">
                                /projects/
                                <input type="text" className={`${inputField} grow`} value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                            </span>
                        </div>
                        <div className={inputStyle}>

                            <span>Project URL (if deployed)</span>
                            <input type="text" className={inputField}
                                onChange={(e) => setForm({ ...form, url: e.target.value })} />
                        </div>
                        <div className={inputStyle}>
                            <span>Github repository link (if exists)</span>
                            <input type="text" className={inputField}
                                onChange={(e) => setForm({ ...form, github: e.target.value })} />
                        </div>
                        <div className={inputStyle}>
                            <span>Date published</span>
                            <input type="date"
                                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} />
                        </div>
                        <div className={`${darkMode ? 'bg-mauve-900 ring-mauve-500' : 'bg-gray-100'} text-[13px] pl-2 pr-2 pt-1 pb-1 
                    flex flex-row items-center gap-1 rounded-xs ring-1`}>
                            <span>Highlighted</span>
                            <FontAwesomeIcon className={`${form.highlighted && 'text-rose-500'} cursor-pointer text-[18px]`}
                                onClick={() => setForm({ ...form, highlighted: !form.highlighted })}
                                icon={form.highlighted ? squareCheckSolid : squareCheckRegular} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-10 w-full justify-between">
                        <button className="cursor-pointer ring-1 ring-mauve-500 hover:ring-rose-500 hover:bg-rose-500 p-2 rounded-xs duration-75 ease-out"
                            onClick={() => createProject.mutate(form)}>Add project</button>
                        <button className={`${darkMode ? 'hover:bg-mauve-900' : 'hover:bg-gray-200' } cursor-pointer ring-1 ring-mauve-500 p-2 
                        rounded-xs duration-75 ease-out`}
                            onClick={() => setCreateProject(false)}>Cancel</button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span>Description *</span>
                    <div className="w-lg">
                    <MDEditor
                        value={form.description}
                        onChange={(value) => setForm({ ...form, description: value })}
                        height={600} 
                        data-color-mode={darkMode ? 'dark' : 'light'} />
                        </div>
                </div>
            </div>
        </div>
    </div>
}