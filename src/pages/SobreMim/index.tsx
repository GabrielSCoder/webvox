import LinkendinLogo from "../../assets/LinkedIn_logo_initials.png"
import GitHubLogo from "../../assets/Octicons-mark-github.svg"
import Instagram from "../../assets/Instagram_icon.png"

export default function SobreMim() {

    return (
        <div className="h-full w-full flex flex-col items-center gap-6 relative">

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-2xl text-white">
                    Gabriel Sena Saraiva <br />
                    <span className="text-xl text-gray-600">Desenvolvedor Full-Stack</span>
                </p>
            </div>

            <div className="mt-[calc(50vh+50px)] flex flex-col gap-4">
                <h2 className="text-white text-xl text-center mt-6">Minhas redes</h2>
                <div className="flex gap-6">
                    <a href="https://www.linkedin.com/in/gabriel-sena-saraiva-377ba6154/" target="_blank">
                        <img src={LinkendinLogo} className="h-[50px] w-[50px]" />
                    </a>
                    <a href="https://www.instagram.com/gabriel.sena1/" target="_blank">
                        <img src={Instagram} className="h-[50px] w-[50px]" />
                    </a>
                    <a href="https://github.com/GabrielSCoder" target="_blank">
                        <img src={GitHubLogo} className="h-[50px] w-[50px]" />
                    </a>
                </div>
            </div>
        </div>

    )
}