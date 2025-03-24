import NodejsLogo from "../../assets/nodejsicon.png"
import TailwindCSSLogo from "../../assets/tailwindlogo.png"
import PostGreLogo from "../../assets/Postgresql_elephant.svg.png"
import ReactLogo from "../../assets/react.svg"
import TypeScriptLogo from "../../assets/typescriptlogo.png"
import neonLogo from "../../assets/neon.png"

export default function Tecnologias() {
    return (

        <div className="h-full w-full">
            <div className="w-full h-full flex flex-col items-center justify-center gap-10">

                <p className="text-3xl text-white text-center">
                    Principais tecnologias utilizadas
                </p>

                <div className="text-base text-white text-center">

                    <div className="flex gap-10 justify-center">


                        <div className="grid grid-cols-3 gap-8">

                            <a href="https://react.dev/" target="_blank">
                                <img src={ReactLogo} className="h-[80px] w-[80px]" ></img>
                            </a>
                            <a href="https://vite.dev/" target="_blank">
                                <img src={"/vite.svg"} className="h-[80px] w-[80px]"></img>
                            </a>
                            <a href="https://tailwindcss.com/" target="_blank">
                                <img src={TailwindCSSLogo} className="h-[80px] w-[90px]"></img>
                            </a>
                            <a href="https://www.typescriptlang.org/" target="_blank">
                                <img src={TypeScriptLogo} className="h-[80px] w-[80px]"></img>
                            </a>
                            <a href="https://nodejs.org/en" target="_blank">
                                <img src={NodejsLogo} className="h-[80px] w-[80px]"></img>
                            </a>
                            <a href="https://www.postgresql.org/" target="_blank">
                                <img src={PostGreLogo} className="h-[80px] w-[80px]"></img>
                            </a>
                            <a href="https://neon.tech/" target="_blank">
                                <img src={neonLogo} className="h-[100px] w-[100px]"></img>
                            </a>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}