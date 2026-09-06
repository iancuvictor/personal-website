import { useContext, useState } from "react"
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext"
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AdminStateContext } from "../../contexts/AdminStateContext";
import { toast } from "sonner";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import MDEditor from "@uiw/react-md-editor";
import Markdown from "react-markdown";

const API_URL = import.meta.env.VITE_API_URL;

type Form = {
    title: string;
    url: string;
    github: string;
    publishedAt: string;
    description: string;
    highlighted?: boolean;
    techStack?: string[];
    photos?: { path: string }[];
};

type Photos = {
    photos: []
}

export default function ProjectPage() {
    const { admin } = useContext(AdminStateContext)
    const { darkMode } = useContext(GlobalStatesContext);
    const { slug } = useParams();
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery({
        queryKey: [`project-${slug}`],
        queryFn: () => axios.get(`${API_URL}/public/project/${slug}`).then(res => res.data)
    })

    const [form, setForm] = useState({
        title: data?.title,
        github: data?.github,
        url: data?.url,
        publishedAt: data?.publishedAt,
        description: data?.description,
    })
    const [photos, setPhotos] = useState([]);

    const saveChanges = useMutation({
        mutationFn: (form: Form) => axios.put(`${API_URL}/admin/project/${slug}`, form, { withCredentials: true }),
        onSuccess: () => {
            toast.success(`Project successfully updated`)
            queryClient.invalidateQueries[`project-${slug}`]
        },
        onError: () => {
            toast.error(`Error updating project`)
        }
    })

    const updatePhotos = useMutation({
        mutationFn: (photos: File[]) => {
            const formData = new FormData();
            formData.append('_id', data._id);
            photos.forEach((photo) => {
                formData.append('photo', photo);
            })
            return axios.put(`${API_URL}/admin/project/${slug}/images`, formData, { withCredentials: true });
        },
        onSuccess: () => {
            toast.success(`Photos uploaded successfully`)
        },
        onError: () => {
            toast.error(`Error uploading photos`)
        }
    })

    if (isLoading) return <FontAwesomeIcon icon={faSpinner} />

    return <div className={`${darkMode ? 'text-white' : 'text-black'} font-mozilla`}>

        {admin ? <div className="flex flex-col items-center gap-1">
            <input type="text" defaultValue={data.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <span>Website URL</span>
            <input type="text" defaultValue={data.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })} />
            <span>Github repository</span>
            <input type="text" defaultValue={data.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })} />
            {/* <input type="date" value={data.publishedAt} 
            onChange={(e) => setForm({...form, publishedAt: e.target.value})}/> */}
            <span>Description</span>
            <div className="max-w-[80%]">
                <MDEditor
                    value={form.description}
                    onChange={(value) => setForm({ ...form, description: value })}
                    height={400}
                />
            </div>
            <button onClick={() => saveChanges.mutate(form)}
                className="cursor-pointer p-2 ring-1 ring-mauve-900 
            bg-mauve-950 hover:bg-mauve-900 active:bg-mauve-950 rounded-xs w-fit">Save changes</button>
            <input type="file" multiple onChange={(e) => setPhotos(Array.from(e.target.files))} />
            <button onClick={() => updatePhotos.mutate(photos)}
                className="cursor-pointer p-2 ring-1 ring-mauve-900 
            bg-mauve-950 hover:bg-mauve-900 active:bg-mauve-950 rounded-xs w-fit">Upload photos</button>
        </div>

            // public display
            : <div className="flex flex-col items-center gap-2">
                {data.photos.length > 0 && <img src={`${API_URL}/uploads/projectPhotos/${data.photos[0].path}`}/>}
                <div className="flex flex-row gap-3 items-center">
                    <h1 className="font-[700] text-[50px]">{data.title}</h1>
                    <a href={data.github} target="_blank">
                        <FontAwesomeIcon icon={faGithub}
                            className="text-[50px] hover:text-mauve-500 duration-75 ease-out" />
                    </a>
                </div>
                <a href={data.url} className="text-blue-500 hover:text-blue-300 duration-75 ease-out">{data.url}</a>
                <span>{data.publishedAt}</span>
                <div className="w-200 text-justify">
                <Markdown>{data.description}</Markdown>
                </div>
            </div>}
    </div>
}