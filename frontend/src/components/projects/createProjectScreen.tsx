import { faSquareCheck as squareCheckSolid } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck as squareCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

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

export default function CreateProjectScreen({setCreateProject}: CreateProjectScreenProps) {
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

    const inputField = `bg-mauve-950 ring-1 ring-mauve-900 text-white`

    const createProject = useMutation({
        mutationFn: (form: Form) => axios.post(`${API_URL}/admin/createProject`, form, {withCredentials: true}),
        onSuccess: () => {
            toast.success(`Project added successfully`)
        },
        onError: () => {
            toast.error(`An error has occured!`)
        }
    })


    return <div className="z-10 fixed inset-0 flex flex items-center justify-center backdrop-blur-3xl">
        <div className="bg-mauve-950 flex flex-col items-center gap-5 p-5 rounded-md">
            <div className="flex flex-col items-center gap-2">
                <span>Highlighted</span>
                <FontAwesomeIcon className="cursor-pointer text-[24px]"
                onClick={() => setForm({ ...form, highlighted: !form.highlighted })} 
                icon={form.highlighted ? squareCheckSolid : squareCheckRegular}/>
                <span>Title</span>
                <input type="text" className={inputField}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <span>Slug (url after /projects)</span>
                <input type="text" className={inputField}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                <span>Project URL</span>
                <input type="text" className={inputField}
                    onChange={(e) => setForm({ ...form, url: e.target.value })} />
                <span>Github repository link</span>
                <input type="text" className={inputField}
                    onChange={(e) => setForm({ ...form, github: e.target.value })} />
                <span>Date published</span>
                <input type="date" className={inputField}
                    onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} />
                <span>Description</span>
                <input type="text" className={inputField}
                    onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex flex-row gap-10">
                <button className="cursor-pointer ring-1 p-2 rounded-xs"
                onClick={() => createProject.mutate(form)}>Add project</button>
                <button className="cursor-pointer ring-1 p-2 rounded-xs"
                onClick={() => setCreateProject(false)}>Cancel</button>
            </div>
        </div>
    </div>
}