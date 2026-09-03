import { createContext } from "react";

type AdminStateType = {
  admin: boolean;
};

export const AdminStateContext = createContext<AdminStateType | undefined>(undefined);