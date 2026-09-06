import { useContext, useState } from "react"
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext"
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faSpinner, faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
            queryClient.invalidateQueries({ queryKey: [`project-${slug}`] })
        },
        onError: () => {
            toast.error(`Error uploading photos`)
        }
    })

    const deletePhoto = useMutation({
        mutationFn: (id: string) => axios.delete(`${API_URL}/admin/project/images/${id}`, { withCredentials: true }),
        onSuccess: () => {
            toast.success(`Photo successfully deleted`)
            queryClient.invalidateQueries({ queryKey: [`project-${slug}`] })
        },
        onError: () => {
            toast.error(`An error has occured while deleting the image`)
        }
    })

    if (isLoading) return <FontAwesomeIcon icon={faSpinner} />

    return <div className={`${darkMode ? 'text-white' : 'text-black'} font-mozilla`}>

        {admin ? <div className="flex flex-col items-center gap-5">
            <input type="text" defaultValue={data.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="text-[50px] font-[700] text-center bg-mauve-950 ring-1 ring-mauve-900 rounded-md" />

            <div className="flex flex-row gap-10">
                {data.photos.map((photo) => {
                    return <div className="group relative w-80 h-45 overflow-hidden">
                        {data.photos.length > 0 && <img src={`${API_URL}/uploads/projectPhotos/${photo.path}`}
                            className="h-full w-full object-cover" />}
                        <div className="opacity-0 group-hover:opacity-100 duration-75 ease-out
                        z-1 absolute flex flex-row gap-5 items-center justify-center top-0 left-0 h-full w-full bg-black/60 text-[20px]">
                            <button onClick={() => deletePhoto.mutate(photo._id)}
                                className="hover:text-rose-500 cursor-pointer">
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                            <button className="hover:text-blue-200 cursor-pointer">
                                <FontAwesomeIcon icon={faFileArrowUp} />
                            </button>
                        </div>
                    </div>
                })}
            </div>
            <input type="file" multiple onChange={(e) => setPhotos(Array.from(e.target.files))} />
            <button onClick={() => updatePhotos.mutate(photos)}
                className="cursor-pointer p-2 ring-1 ring-mauve-900 
            bg-mauve-950 hover:bg-mauve-900 active:bg-mauve-950 rounded-xs w-fit">Upload photos</button>
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
        </div>

            // public display
            : <div className="flex flex-col items-center gap-2">
                <div className="w-full h-100 overflow-hidden">
                    {data.photos.length > 0 && <img src={`${API_URL}/uploads/projectPhotos/${data.photos[0].path}`}
                        className="h-full w-full object-cover" />}
                </div>
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