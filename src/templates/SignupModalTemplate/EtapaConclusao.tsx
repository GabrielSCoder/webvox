import Card from "../../components/Card";
import { Input } from "../../components/Inputs";

export default function EtapaConclusao(props: { nome: any, email: any, username: any, senha: any, genero: any, data_nascimento: any, manageF : Function, manageF2 : Function }) {

    const { email, nome, senha, username, genero, data_nascimento, manageF, manageF2 } = props
    return (
        <Card className="flex-col gap-4 w-full">

            <Input.Title className="text-xl dark:text-white text-black">Verifique as informações</Input.Title>

            <Card className="flex-col">
                <Input.Title className="pl-1 text-white">Nome</Input.Title>
                <Input.Text disabled value={nome} name="nome" className="px-2 text-white border h-[36px] disabled:bg-black disabled:opacity-50" />
            </Card>

            <Card className="flex-col">
                <Input.Title className="pl-1 text-white">Email</Input.Title>
                <Input.Text disabled value={email} name="email" className="px-2 text-white border h-[36px] disabled:bg-black disabled:opacity-50" />
            </Card>

            <Card className="flex-col">
                <Input.Title className="pl-1 text-white">Gênero</Input.Title>
                <Input.Text disabled value={genero} name="nome" className="px-2 text-white border h-[36px] disabled:bg-black disabled:opacity-50" />
            </Card>

            <Card className="flex-col">
                <Input.Title className="pl-1 text-white">Data de nascimento</Input.Title>
                <Input.Text disabled value={data_nascimento} name="nome" className="px-2 text-white border h-[36px] disabled:bg-black disabled:opacity-50" />
            </Card>

            <Card className="flex-col">
                <Input.Title className="pl-1 text-white">Username</Input.Title>
                <Input.Text disabled value={username} name="username" className="px-2 text-white border h-[36px] disabled:bg-black disabled:opacity-50" />
            </Card>

            <Card className="flex-col">
                <Input.Title className="pl-1 text-white">Senha</Input.Title>
                <Input.Text disabled value={senha} name="senha" className="px-2 text-white border h-[36px] disabled:bg-black disabled:opacity-50" />
            </Card>

            <p className="border-b border-gray-500 w-full mt-4 " />

            <Card className="gap-4 md:gap-10 w-full justify-center mt-2 ">
                <button className="bg-white text-black hover:bg-gray-200 rounded-3xl h-[36px] w-[140px] px-4" onClick={() => manageF(0)}>Mudar algo</button>
                <button className="bg-sky-500 text-white rounded-3xl h-[36px] px-4 w-[140px] hover:bg-blue-500" onClick={() => manageF2()}>Concluir</button>
            </Card>

        </Card>
    )
}