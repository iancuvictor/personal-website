import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const API_URL = import.meta.env.BACKEND_API_URL;

export default function AboutPage(){
    const { data, isLoading, error } = useQuery({
        queryKey: ['aboutData'],
        queryFn: () => axios.get(`${API_URL}/api/public/aboutData`)
    })

    console.log(data);

    return <div className="w-full flex flex-col items-center">
        <h1 className="text-[24px] font-[700]">ABOUT ME</h1>
    </div>
}