import { faCircleChevronLeft, faCircleChevronRight, faStreetView } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router"
import increment from '../../../utils/increment.js';
import { useState } from "react";

type Data = {
    title: string,
    slug: string,
    github: string,
    publishedAt: string,
    photos: [],
    techStack: []
}

type DataProps = {
    data: Data
}

const API_URL = import.meta.env.VITE_API_URL


export default function ProjectCard({ data }: DataProps) {
    const [imageIndex, setImageIndex] = useState(0);

    return <div className="select-none relative flex flex-col gap-1 rounded-md w-100 font-mozilla shadow-md shadow-rose-500">
        <NavLink to={`/projects/${data.slug}`} className={`z-1 absolute top-0 left-0 w-full h-full cursor-pointer`}/>
        <div className="relative w-full h-50 flex flex-row gap-2 items-center justify-between">
            <FontAwesomeIcon onClick={() => increment('substract', imageIndex, setImageIndex, data.photos)} icon={faCircleChevronLeft}
                className="z-2 text-[20px] cursor-pointer mix-blend-difference" />
            <div className="absolute z-0 h-50 w-full">
                <img className="h-full w-full object-cover object-center rounded-t-md"
                    src={`${API_URL}/uploads/projectPhotos/${data.photos.length > 0 ? data.photos[imageIndex].path : ''}`} alt="project snapshots" />
            </div>
            <FontAwesomeIcon onClick={() => increment('add', imageIndex, setImageIndex, data.photos)} icon={faCircleChevronRight}
                className="z-2 text-[20px] cursor-pointer mix-blend-difference" />
                <span className="absolute bg-black/70 p-1 bottom-2 right-2 text-[14px] rounded-md">{imageIndex + 1} / {data.photos.length}</span>
        </div>
        <div className="pl-5 pr-5 pb-5 flex flex-col gap-0 text-[14px]">
        <span className="whitespace-nowrap font-[600]">{data.title}</span>
        <a className="truncate min-w-0 text-blue-500" href={data.github}>{data.github}</a>
        <span>{data.publishedAt}</span>
        <span>{data.techStack}</span>
        </div>
    </div>
}