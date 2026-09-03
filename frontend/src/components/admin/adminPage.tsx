import { useContext, useState } from "react";
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type Form = {
    username: string,
    password: string
}

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPage() {
    const { darkMode } = useContext(GlobalStatesContext);
    const queryClient = useQueryClient()

    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [viewPassword, setViewPassword] = useState(false);

    const inputWrapper = `${darkMode ? 'ring-mauve-800' : 'ring-black'} w-full focus-within:shadow-sm focus-within:ring-2 focus-within:ring-mauve-500
    shadow-mauve-500 flex flex-col ring-1 pl-5 pr-5 pb-2 pt-2 rounded-md outline-none border-none duration-75 ease-out`;
    const inputField = `outline-none border-non w-100`

    const login = useMutation({
        mutationFn: (form: Form) => axios.post(`${API_URL}/admin/login`, form, { withCredentials: true }),
        onSuccess: () => {
            console.log('connected as admin');
            queryClient.invalidateQueries({ queryKey: ['admin'] })
        },
        onError: () => {
            toast.error(`Wrong password or username`)
        }
    })

    const loginDisabled = form.username === '' || form.password === ''


    return <div className={`${darkMode ? 'text-white' : 'text-black'} absolute w-full h-full flex flex-col gap-30 items-center justify-center font-mozilla`}>
        <div className={`${darkMode ? 'shadow-mauve-800 text-white' : 'shadow-gray-800/30 text-black'} flex flex-col items-center gap-5
            ring-1 ring-mauve-800 shadow-md flex flex-col gap-2 p-5 rounded-md`}>
            <h1 className="text-[24px] font-[700]">Don't worry about this</h1>
            <div className={inputWrapper}>
                <span className="text-[14px]">Username</span>
                <input type="text" onChange={(e) => setForm({ ...form, username: e.target.value })} className={inputField} />
            </div>
            <div className={inputWrapper}>
                <span className="text-[14px]">Password</span>
                <div className="flex flex-row items-center justify-center gap-2">
                    <input type={viewPassword ? 'text' : 'password'} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputField} />
                    <FontAwesomeIcon onClick={() => setViewPassword(!viewPassword)} icon={viewPassword ? faEye : faEyeSlash}
                        className="cursor-pointer duration-100 ease-out" />
                </div>
            </div>
            <button disabled={loginDisabled} onClick={() => login.mutate(form)}
                className={`${loginDisabled ? 'bg-mauve-800' : 'bg-rose-500 hover:bg-rose-400 active:bg-rose-600 cursor-pointer' }
                p-2 w-full rounded-md text-white`}>Login</button>
        </div>
    </div>
}