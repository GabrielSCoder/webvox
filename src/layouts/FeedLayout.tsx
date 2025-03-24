import LateralMenu from "../templates/LateralMenu";
import { Outlet } from "react-router-dom";
import TitleTag from "../components/TitleTags";
import { GuestFooterAdvice } from "../templates/GuestFooterAdvice";
import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../hooks/useAuth";
import SearchBarTemplate from "../templates/SearchBar";
import LoadingPageTemplate from "../templates/LoadingPage";
import classNames from "../utils/classNames";
import HorizontalMenu from "../templates/HorizontalMenu";
import { ctx } from "../contexts/NotifyContext";
import ReportModal from "../templates/ReportModal";

export default function FeedLayout() {

    const { logout, tipo_usuario, getUser, authLoading } = AuthProvider()

    const [UserData, setUserData] = useState<any>([])
    const [menuopen, setMenuOpen] = useState(false)
    const [reportModal, setReportModal] = useState(false)
    const {notify, func} = useContext(ctx)

    const getData = async () => {
        if (window.localStorage.getItem("profile")) {
            const resp = await getUser()
            if (resp?.data) {
                setUserData(resp.data.user)
                await func(resp.data.user.id)
            }
        }
    }


    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
        getData()
    }, [])


    if (authLoading || UserData.id == undefined) {
        return <LoadingPageTemplate className="w-full h-screen" />
    }

    return (
        <div className="flex flex-col w-full">
            <div className="relative flex-col lg:flex lg:flex-row bg-black dark:bg-black justify-center">

                <div className={classNames("hidden sticky top-1 w-[250px] lg:flex lg:flex-col gap-10 px-2 overflow-auto h-[910px] ", tipo_usuario == "conta" ? "xl:h-[99vh] lg:h-[99vh]" : "lg:h-[800px]")}>
                    <TitleTag.Main className="text-left px-2">Webvox</TitleTag.Main>
                    <LateralMenu username={UserData.username} id={UserData.id} notificationsNumber={notify} setState={setReportModal}/>
                    {/* {tipo_usuario == "conta" && <p className="text-xl text-black dark:text-white text-center mt-6">Olá! {UserData.username}</p>} */}
                    {/* <DarkModeButton className="w-fit mx-auto py-2 px-4 rounded-3xl"/> */}
                    {tipo_usuario == "conta" && <button className="px-4 py-2 rounded-3xl text-black dark:text-white border hover:bg-gray-800 w-fit mt-auto mb-2" onClick={handleLogout}>Logout</button>}
                </div>

                <div className="sticky h-[56px] top-0 lg:hidden z-20 bg-black flex items-center p-2 dark:bg-black/50 backdrop-blur-[10px]">
                    <div className="rounded-full h-[40px] w-[40px] bg-black" onClick={() => setMenuOpen(!menuopen)}>
                        {!UserData.img_url ? <div className="w-full h-full rounded-full bg-red-500 m-2"></div> : <img src={UserData.img_url} className="h-full w-full rounded-full object-cover"></img>}
                    </div>
                    <h2 className="text-center text-xl text-white ml-[130px] md:mx-auto">WebVox</h2>
                    <div className={classNames("bg-black absolute top-12 left-0 lg:hidden h-[80dvh] flex flex-col gap-10 py-4", !menuopen ? "hidden" : "")}>
                        <div className="z-20 px-2">
                            <SearchBarTemplate />
                        </div>
                        <LateralMenu username={UserData.username} id={UserData.id} notificationsNumber={notify} setState={setReportModal}
                            className={classNames("h-[350px] justify-center relative")} />
                        <button className="left-10 px-4 py-2 rounded-3xl text-black dark:text-white border hover:bg-gray-800 w-fit mb-2 mx-auto" onClick={handleLogout}>Logout</button>
                    </div>

                </div>

                <div className="w-full lg:w-[600px] flex flex-col justify-start items-start gap-0 lg:border-l  lg:border-r min-h-[100vh]">
                    <Outlet />
                </div>

                <div className="sticky h-[56px] bottom-0 lg:hidden z-20 bg-black dark:bg-black/50 backdrop-blur-[10px]">
                    <HorizontalMenu username={UserData.username} id={UserData.id} notificationsNumber={notify} className="h-full w-full items-center justify-between px-10" />
                </div>

                <div className={classNames("hidden sticky w-1/6 lg:flex lg:flex-col justify-start items-start px-4 gap-10 overflow-auto top-1 z-0", tipo_usuario == "conta" ? "xl:h-[99vh] lg:h-[99vh]" : "lg:h-[800px]")}>
                    <SearchBarTemplate />
                    {/* <AlertConnection /> */}
                    {/* {tipo_usuario == "conta" ? (
                        <>
                            <div className="flex flex-col border border-gray-700 w-full p-4 rounded-md gap-2">
                                <h2 className="text-white text-xl font-semibold text-center">Following</h2>
                                <FakeFriends />
                            </div>
                            <Groups />
                        </>
                    ) : ""} */}

                </div>


            </div>
            {tipo_usuario == "convidado" ? <GuestFooterAdvice /> : ""}
            <ReportModal state={reportModal} setState={setReportModal}/>
        </div>

    )
}