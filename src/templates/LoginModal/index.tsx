import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { modalProps } from "../../components/Dialog Alert";
import { Input } from "../../components/Inputs";
import Card from "../../components/Card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ForgotPasword from "../ForgotPassword";
import { AuthProvider } from "../../hooks/useAuth";
import { getOSAndBrowser} from "../../services/soinformation"
import { getFingerPrint } from "../../services/fingerprint";
const contentStyle = "p-2 lg:p-8 px-10 lg:px-36 fixed left-1/2 top-1/2 h-[68vh] max-h-[100vh] w-[400px] lg:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow"

export default function LoginModal(props: modalProps) {

    const { stateMng, state, changeModals } = props
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string>()
    const { login } = AuthProvider()
    const [forgotPasword, setForgotPassword] = useState(false)

    const nav = useNavigate()

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            email: "",
            senha: "",
            errorMsg: ""
        }
    })

    const m = watch("email")
    const s = watch("senha")

    const clearErrorMsg = () => {
        setErrorMsg("")
    }

    const submit = async () => {
        setLoading(true)
        const finger = await getFingerPrint()
        const {os, browser} = getOSAndBrowser()

        handleSubmit(async (data) => {
            const dados = {email : data.email, senha : data.senha, finger : finger, os : `${os} ${browser}`}
            const resp = await login(dados)
            if (resp.success) {
                clearErrorMsg()
                nav("/home")
            } else {
                setLoading(false)
                setErrorMsg(resp.msg)
            }
        })()
   
    }

    const clearForgot = (event : any) => {
        if (forgotPasword) {
            event.preventDefault()
            setLoading(true)
            clearErrorMsg()
            reset()
            setForgotPassword(false)
            setLoading(false)
        }
    }

    const loadContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <AiOutlineLoading3Quarters className="text-blue-500 animate-spin" size={30} />
                </div>
            )
        } else if (forgotPasword) {
            return (
                <ForgotPasword />
            )
        } else {
            return (
                <>
                    <Dialog.Title className="mt-8 text-lg lg:text-[30px] font-medium text-mauve12 dark:text-white text-center lg:text-start">
                        Entre no webvox
                    </Dialog.Title>
                    <div className="mt-8 flex flex-col justify-center items-center gap-8">

                        <div className="flex flex-col gap-4 w-full">
                            <Input.Text register={register} name="email" placeholder="E-mail" className="rounded-md px-2 p-4 outline-none text-white placeholder:text-gray-500 border bg-black focus:border-blue-500" />
                            <Input.Password register={register} name="senha" placeholder="Senha" />
                            <p className="text-red-500 text-center" hidden={!errorMsg}>{errorMsg}</p>
                        </div>

                        <p className="border-b border-gray-500 w-full" />

                        <Card className="flex-col w-full gap-6 mt-1">
                            <button className="bg-black dark:bg-white dark:text-black text-white text-base rounded-3xl py-1 hover:bg-gray-200 font-semibold h-[36px] disabled:bg-gray-500" disabled={m.trim().length < 1 || s.trim().length < 1} onClick={submit}>Login</button>
                            <button className="text-black dark:text-white text-base border rounded-3xl py-1 hover:bg-custom-bg-x font-semibold h-[36px]" onClick={() => setForgotPassword(true)}>Esqueceu sua senha?</button>
                        </Card>

                        <div className="m-4">
                            <button className=" text-blue-500 hover:underline hover:decoration-blue-500" onClick={() => {changeModals ? changeModals() : undefined}}>Não tem uma conta? Inscreva-se</button>
                        </div>

                    </div>

                </>

            )
        }
    }

    useEffect(() => {
        setErrorMsg("")
        reset()
    }, [state])


    return (

        <Dialog.Root open={state} onOpenChange={stateMng}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Dialog.Content
                    className={contentStyle}
                    >

                    {loadContent()}
                    <Dialog.Close asChild>
                        <button
                            className="absolute left-2.5 top-2.5 inline-flex size-[26px] appearance-none items-center justify-center rounded-full text-white hover:bg-custom-bg-x hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close"
                            onClick={(e) => clearForgot(e)}
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}