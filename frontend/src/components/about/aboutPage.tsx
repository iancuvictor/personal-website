import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from "react";
import { AdminStateContext } from "../../contexts/AdminStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_API_URL;

export default function AboutPage() {
    const { admin } = useContext(AdminStateContext);

    // console.log(admin);

    // const { data, isLoading, error } = useQuery<AxiosResponse>({
    //     queryKey: ['aboutData'],
    //     queryFn: () => axios.get(`${API_URL}/public/aboutData`)
    // })

    // console.log(data?.data);

    return <div className="w-full flex flex-col items-center font-mozilla">
        <h1 className="text-[24px] font-[700]">ABOUT ME</h1>
        {admin && <div>
            <button className="flex items-center justify-center gap-1 ring-1 p-2 rounded-xs cursor-pointer">
                <FontAwesomeIcon icon={faPlus}/> Add education</button>
            </div>}
    </div>
}