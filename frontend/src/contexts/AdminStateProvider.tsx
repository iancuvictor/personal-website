import { type ReactNode, useEffect, useState } from "react";
import { AdminStateContext } from "./AdminStateContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function AdminStateProvider({ children }: { children: ReactNode }) {


    const { data, isLoading, error } = useQuery({
        queryKey: ['admin'],
        queryFn: () => axios.get(`${API_URL}/admin`, { withCredentials: true })
    })

    if (isLoading) return null;

    const admin = error ? false : data?.data?.isAdmin

    console.log(data)

    return <AdminStateContext.Provider value={{ admin }}>
        {children}
    </AdminStateContext.Provider>
}
