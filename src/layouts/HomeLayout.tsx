import { Outlet, useNavigate } from "react-router-dom";
// import DarkModeButton from "../templates/DarkModeButtonTemplate";

export default function HomeLayout() {

    const nav = useNavigate()

    return (
        <div className="dark:bg-black bg-white flex-col max-w-[100dvw] max-h-[100dvh] overflow-y-hidden">

            <div className="flex flex-col h-[85dvh] md:h-[90vh] 2xl:h-[90vh] p-2 lg:flex-row">
                {/* <DarkModeButton className="absolute top-1 left-1" /> */}

                <div className="flex justify-center items-center w-full">
                    <h1 className="text-3xl md:text-8xl font-bold dark:text-white text-black hover:cursor-pointer" onClick={() => nav("/")}>WEBVOX</h1>
                </div>

                <div className="lg:w-[80vw] flex justify-center lg:justify-start items-center p-0 md:p-4 h-full w-full">
                    <Outlet />
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-3 h-[15dvh] md:h-[10dvh] 2xl:h-[13vh] px-2">
                <div className="grid grid-cols-4 md:flex md:gap-6 gap-3">
                    <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/")}>Início</button>
                    <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/sobre")}>Sobre</button>
                    <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/privacidade")}>Privacidade</button>
                    <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/usocookies")}>Uso de Cookies</button>
                    <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/versao")}>Versão</button>
                    <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/sobremim")}>Quem sou</button>
                    <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/tecnologias")}>Tecnologias</button>
                </div>
                <h2 className="text-center text-base text-gray-500">2025 Gabriel Sena </h2>
            </div>
        </div>
    )
}

