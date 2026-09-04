import { NavLink } from "react-router"

type Data = {
    title: string,
    slug: string,
    github: string,
    publishedAt: string,
    techStack: []
}

type DataProps = {
    data: Data
}

export default function ProjectCard({data} : DataProps) {
    return <div className="relative flex flex-col gap-1 ring-1 p-5 rounded-xs w-100">
        {/* <span>{data.photos}</span> */}
        <NavLink to={`/projects/${data.slug}`} className={`absolute top-0 left-0 w-full h-full`}/>
        <div>
            {/* <img src="" alt="" /> */}
        </div>
        <span>{data.title}</span>
        <span>{data.github}</span>
        <span>{data.publishedAt}</span>
        <span>{data.techStack}</span>
    </div>
}