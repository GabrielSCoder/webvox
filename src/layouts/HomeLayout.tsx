import { Outlet, useNavigate } from "react-router-dom";
import ReportModal from "../templates/ReportModal";
import { useState } from "react";
import HomeFooter from "../templates/HomeFooter";
// import DarkModeButton from "../templates/DarkModeButtonTemplate";

export default function HomeLayout() {

    const nav = useNavigate()
    const [state, setState] = useState(false)

    return (
        <div className="dark:bg-black bg-white flex-col max-h-[100dvh] h-[100dvh]">
            <div className="h-[100dvh]">

                <div className="flex flex-col p-2 lg:flex-row h-[80dvh] xl:h-[90dvh] ">
                    {/* <DarkModeButton className="absolute top-1 left-1" /> */}

                    <div className="flex justify-center items-center w-full xl:w-[60dvw]">
                        <h1 className="text-3xl md:text-8xl font-bold dark:text-white text-black hover:cursor-pointer" onClick={() => nav("/")}>WEBVOX</h1>
                    </div>

                    <div className="flex justify-center lg:justify-start items-center p-2 md:p-4 min-h-[70dvh] xl:w-[40dvw]">
                        <Outlet />
                    </div>
                </div>

               <HomeFooter nav={nav} setState={setState}/>
            </div>
            <ReportModal setState={setState} state={state}/>
        </div>

    )
}

