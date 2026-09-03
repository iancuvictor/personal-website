import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from "react";
import { AdminStateContext } from "../../contexts/AdminStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext";
import MDeditor from '@uiw/react-md-editor';
import Markdown from "react-markdown";

const API_URL = import.meta.env.VITE_API_URL;

export default function AboutPage() {
    const { darkMode } = useContext(GlobalStatesContext);
    const { admin } = useContext(AdminStateContext);
    const [aboutData, setAboutData] = useState({
        aboutText: ''
    })

    // console.log(admin);

    // const { data, isLoading, error } = useQuery<AxiosResponse>({
    //     queryKey: ['aboutData'],
    //     queryFn: () => axios.get(`${API_URL}/public/aboutData`)
    // })

    // console.log(data?.data);
    const {data, isLoading, error} = useQuery({
        queryKey: ['aboutData'],
        queryFn: () => axios.get(`${API_URL}/public/about`)
    })

    console.log(data);

    const updatePage = useMutation({
        mutationFn: () => axios.put(`${API_URL}/admin/updateAboutText`, { text: aboutData.aboutText }, { withCredentials: true })
    })

    return <div className={`${darkMode ? 'text-white' : 'text-black'} w-full flex flex-col items-center font-mozilla`}>
        <h1 className="text-[24px] font-[700]">ABOUT ME</h1>
        {admin && <div>
            <button className="flex items-center justify-center gap-1 ring-1 p-2 rounded-xs cursor-pointer">
                <FontAwesomeIcon icon={faPlus} /> Add education</button>
        </div>}
        {admin && <button onClick={() => updatePage.mutate()}
            className="cursor-pointer text-white text-[14px] bg-rose-500 hover:bg-rose-400 active:bg-rose-600 p-2">Salvează modificările</button>}
        {admin ?
            <div className="max-w-[80%]">
                <MDeditor
                    value={aboutData?.aboutText}
                    onChange={(value) => setAboutData({ ...aboutData, aboutText: value })}
                    height={400}
                />
            </div>
            : <div className="text-justify [&_p]:mb-4 w-full md:w-md">
                {/* <Markdown>{aboutData?.text}</Markdown> */}
            </div>}
    </div>
}