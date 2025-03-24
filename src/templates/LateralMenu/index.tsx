import { useNavigate } from "react-router-dom"
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi";
import { BsFillBellFill } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import classNames from "../../utils/classNames";

type props = {
    username?: string
    id ?: number
    notificationsNumber : number
    className ?: string
    setState : any
}
function LateralMenu(props: props) {

    const { username, id, notificationsNumber, className, setState } = props

    // const opts = ["Home", "Notifications", "Groups", "Messages", "Configuration"]
    const opts2 = ["Home", "Perfil", "Notificações", "Reportar"]
    const menu_convidado = ["Home"]
    const logado = window.localStorage.getItem("profile")

    const nav = useNavigate()

    const getMenuOpts = () => {
        let list = []
        list[0] = (
            <div key={0} className="flex items-center justify-center hover:bg-gray-200 hover:dark:bg-gray-800 rounded-3xl w-fit px-2">
                <GrHomeRounded size={20} className="text-white" />
                <button key={2} className="text-xl font-semibold text-black dark:text-white px-6 py-2" onClick={() => nav(opts2[0].toLowerCase())}>Home</button>
            </div>

        )
        list[1] = (
            <div key={1} className="flex items-center hover:bg-gray-200 hover:dark:bg-gray-800 rounded-3xl w-fit px-2">
                <HiOutlineUser size={20} className="text-white" />
                <button key={2} className=" text-xl font-semibold text-black dark:text-white px-6 py-2" onClick={() => nav("/" + username)}>Perfil</button>
            </div>
        )
        list[2] = (
            <div key={2} className=" relative flex items-center rounded-3xl hover:bg-gray-200 hover:dark:bg-gray-800 w-fit px-2">
                {notificationsNumber > 0 && <div className="flex justify-center items-center rounded-full bg-sky-500 absolute top-0 left-3 text-white text-xs text-center w-[22px] h-[22px]"><p className="p-1">{notificationsNumber}</p></div>}
                <BsFillBellFill className="text-white" size={20}  />
                <button key={2} className="text-xl font-semibold text-black dark:text-white px-6 py-2" onClick={() => nav("/notifications", {state : {id : id, username : username}})}>Notificações</button>
            </div>
        )
        list[3] = (
            <div key={2} className=" relative flex items-center rounded-3xl hover:bg-gray-200 hover:dark:bg-gray-800 w-fit px-2">
                {notificationsNumber > 0 && <div className="flex justify-center items-center rounded-full bg-sky-500 absolute top-0 left-3 text-white text-xs text-center w-[22px] h-[22px]"><p className="p-1">{notificationsNumber}</p></div>}
                <MdOutlineReport className="text-white" size={25}  />
                <button key={2} className="text-xl font-semibold text-black dark:text-white px-6 py-2" onClick={() => setState(true)}>Reportar</button>
            </div>
        )
        return list
    }

    const getConvidadoMenu = () => {
        const list = menu_convidado.map((key, index) => (
            <button key={index} className="rounded-3xl text-xl font-semibold text-black dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 px-6 py-2" onClick={() => nav(key.toLowerCase())}>{key}</button>
        ))
        return list
    }

    return (
        <div className={classNames("flex flex-col gap-8", className)}>
                {logado ? getMenuOpts() : getConvidadoMenu()}
        </div>
    )
}

export default LateralMenu