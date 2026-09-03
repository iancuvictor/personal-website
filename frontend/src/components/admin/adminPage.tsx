import { useContext, useState } from "react";
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from 'sonner';

type Form = {
    username: string,
    password: string
}

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPage() {
    const {darkMode} = useContext(GlobalStatesContext);

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const inputWrapper = `flex flex-col ring-1 pl-5 pr-5 pb-2 pt-2 rounded-md outline-none border-none`;
    const inputField = `outline-none border-non w-100`

    const login = useMutation({
        mutationFn: (form: Form) => axios.post(`${API_URL}/admin/login`, form, {withCredentials: true}),
        onSuccess: () => {
            console.log('connected as admin');
        },
        onError: () => {
            toast.error(`Wrong password or username`)
        }
    })


    return <div className="absolute w-full h-full flex flex-col gap-30 items-center font-mozilla">
        {/* <h1 className="text-[24px] font-[700]">If you are not me, you should just keep on browsing :)</h1> */}
        <div className="flex flex-col gap-2 ring-1 p-5 rounded-md">
            <div className={inputWrapper}>
                <span className="text-[14px]">Username</span>
                <input type="text" onChange={(e) => setForm({...form, username: e.target.value})} className={inputField}/>
            </div>
            <div className={inputWrapper}>
                <span className="text-[14px]">Password</span>
                <input type="password" onChange={(e) => setForm({...form, password: e.target.value})} className={inputField}/>
            </div>
            <button onClick={() => login.mutate(form)} className="bg-rose-500 p-2 w-20 rounded-md text-white cursor-pointer 
            hover:bg-rose-400 active:bg-rose-600">Login</button>
        </div>
    </div>
}