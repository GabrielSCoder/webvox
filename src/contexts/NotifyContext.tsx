import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { getNotificationsbyId } from "../services/notification";


export const ctx = createContext<{
    notify: number;
    func: (id: number) => Promise<void>;
    setNotifications: Dispatch<SetStateAction<number>>;
}>({
    notify: 0,
    func: async () => {},
    setNotifications: () => { },
});

export default function NotifyProvider(props: { children: ReactNode }) {

    const { children } = props
    const [notifications, setNotifications] = useState(0)


    const getNotify = async (id: number) => {
        const resp = await getNotificationsbyId(id)
    
        if (resp.data.success) {
            const n = resp.data.dados.filter((value: any) => value.visualizado === false).length;
            setNotifications(n)
        }
    }

    const start = async (id: number) => {
        await getNotify(id)
    }

    return (
        <ctx.Provider value={{ notify: notifications, func: start, setNotifications: setNotifications }}>
            {children}
        </ctx.Provider>
    )
}