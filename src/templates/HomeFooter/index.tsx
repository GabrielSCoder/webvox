type props = {
    nav : any
    setState : any
}

export default function HomeFooter(props : props) {

    const {nav, setState} = props

    return (
        <div className="w-full flex flex-col items-center justify-center gap-3 px-2 h-[20dvh] xl:h-[10dvh]">
            <div className="grid grid-cols-4 md:flex md:gap-6 gap-3">
                <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/")}>Início</button>
                <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/sobre")}>Sobre</button>
                <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/privacidade")}>Privacidade</button>
                <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/usocookies")}>Uso de Cookies</button>
                <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/versao")}>Versão</button>
                <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/sobremim")}>Quem sou</button>
                <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => nav("/tecnologias")}>Tecnologias</button>
                <button className="text-sm text-gray-500 hover:cursor-pointer" onClick={() => setState(true)}>Relate um bug</button>
            </div>
            <h2 className="text-center text-base text-gray-500">2025 Gabriel Sena </h2>
        </div>
    )
}