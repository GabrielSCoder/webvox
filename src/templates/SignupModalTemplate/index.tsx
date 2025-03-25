import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { modalProps } from "../../components/Dialog Alert"
import useDebounce from "../../hooks/useDebounce";
import { SignupModalEtapaUm } from "./EtapaUm";
import { SignupModalEtapaDois } from "./EtapaDois";
import { signup, verifyEmail, verifyPassword, verifyUsername } from "../../services/user";
import EtapaConclusao from "./EtapaConclusao";
import CadastroConcluido from "./CadastroConcluido";

const contentStyle = "md:p-12 lg:px-32 fixed left-1/2 top-1/2 h-[80dvh] lg:h-[700px] xl:h-[700px] max-h-[100vh] w-[90dvw] md:w-[500px] lg:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow overflow-hidden";

const innerContentStyle = "h-full max-h-full overflow-y-auto";

export default function SignupModalTemplate(props: modalProps) {

    const { stateMng, state } = props
    const [loading, setLoading] = useState(false)
    const [loadingVerify, setLoadingVerify] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [etapaUm, setEtapaUm] = useState(false)
    const [etapaDois, setEtapaDois] = useState(false)
    const [etapaUmCompleta, setEtapaUmCompleta] = useState(false)
    const [etapaDoisCompleta, setEtapaDoisCompleta] = useState(false)
    const [cadastroConcluido, setCadastroConcluido] = useState(false)

    const { register, handleSubmit, reset, watch, getValues, control, formState: { errors }, setError, clearErrors } = useForm({
        defaultValues: {
            nome: "",
            username: "",
            data_nascimento: "",
            email: "",
            genero: "",
            senha: "",
            senha_confirmacao: "",
            termos: false
        }
    })

    const senha = watch("senha");
    const senhaConfirmacao = watch("senha_confirmacao");
    const email = watch("email")
    const nome = watch("nome")
    const genero = watch("genero")
    const data_nascimento = watch("data_nascimento")
    const username = watch("username")
    const cookieCheck = watch("termos")

    const sign = async () => {
        clearErrors()
        setLoading(true)
        handleSubmit(async data => {
            const item = { ...data }
            const resp = await signup(item)
            if (resp.data.success) {
                setCadastroConcluido(true)
                // reset()
                resetEtapas()
            }
        })()
        setLoading(false)
        // setCadastroConcluido(true)
    }

    const resetEtapas = () => {
        setEtapaUm(false)
        setEtapaDois(false)
        // setCadastroConcluido(false)
        setValidEmail(false)
        setValidUsername(false)
        setValidPassword(false)
    }

    const manageEtapa = (etapa: number) => {
        if (etapa == 1) {
            setEtapaUm(true)
        } else if (etapa == 2) {
            setEtapaDois(true)
        } else if (etapa == 0) {
            setLoading(true)
            setEtapaUm(false)
            setEtapaDois(false)
            setInterval(() => setLoading(false), 2000)
        }
    }

    // const handleUmSub = useDebounce(etapaUmBtn, 1000)

    const handleVerifyEmail = async () => {
        setLoadingVerify(true)
        const resp = await verifyEmail({ email: getValues("email") })
        if (!resp.data.succes) {
            setError("email", { type: "custom", message: resp.data.message })
            setValidEmail(false)
        } else {
            setError("email", { type: "custom", message: "true" })
            setValidEmail(true)
        }
        setLoadingVerify(false)
    }

    const handleVerifyUsername = async () => {
        setLoadingVerify(true)
        const resp = await verifyUsername({ username: getValues("username") })
        if (!resp.data.succes) {
            setError("username", { type: "custom", message: resp.data.message })
            setValidUsername(false)
        } else {
            setError("username", { type: "custom", message: "true" })
            setValidUsername(true)
        }
        setLoadingVerify(false)
    }

    const handleVerifyPassword = async () => {
        setLoadingVerify(true)
        const resp = await verifyPassword({ password: getValues("senha") })
        if (!resp.data.success) {
            setError("senha", { type: "custom", message: resp.data.message })
            // setValidPassword(false)
        } else {
            setError("senha", { type: "custom", message: "true" })
            // setValidPassword(true)
        }
        setLoadingVerify(false)
    }


    const handleVerifyEmailDebounce = useDebounce(handleVerifyEmail, 2000)
    const handleVerifyUsernameDebounce = useDebounce(handleVerifyUsername, 2000)
    const handleVerifyPasswordDebounce = useDebounce(handleVerifyPassword, 2000)
    const handleSignUpDebounce = useDebounce(sign, 1000)


    useEffect(() => {
        if (getValues("email").length > 0) {
            if (validEmail) {
                setValidEmail(false)
                clearErrors("email")
            }
            handleVerifyEmailDebounce()
        }
    }, [watch("email")])


    useEffect(() => {
        if (getValues("username").length > 0) {

            if (validUsername) {
                setValidUsername(false)
                clearErrors("username")
            }
            handleVerifyUsernameDebounce()
        }
    }, [watch("username")])

    useEffect(() => {
        if (getValues("senha").length > 0) {
            if (validPassword) {
                setValidPassword(false)
                clearErrors("senha")
            }
            handleVerifyPasswordDebounce()
        }
    }, [watch("senha")])


    useEffect(() => {
        clearErrors()
        reset()
    }, [state])

    useEffect(() => {
        if (nome != "" && email != "" && data_nascimento != "" && genero != "") {
            setEtapaUmCompleta(true)
        } else {
            setEtapaUmCompleta(false)
        }
    }, [nome, email, data_nascimento, genero])

    useEffect(() => {
        if (username != "" && senha != "" && senhaConfirmacao != "" && cookieCheck == true) {
            setEtapaDoisCompleta(true)
        } else {
            setEtapaDoisCompleta(false)
        }
    }, [username, senha, senhaConfirmacao, cookieCheck])


    useEffect(() => {
        if (senhaConfirmacao) {
            if (senha === senhaConfirmacao) {
                clearErrors("senha_confirmacao");
                setValidPassword(true)
            } else {
                setError("senha_confirmacao", { message: "As senhas são diferentes" });
                setValidPassword(false)
            }
        }
    }, [senha, senhaConfirmacao]);

    const loadContent = () => {
        return (
            <div className="h-[600px] flex justify-center items-center">
                <AiOutlineLoading3Quarters size={50} className="text-blue-500 animate-spin" />
            </div>
        )
    }

    const CC = () => {
        return (
            <CadastroConcluido />
        )
    }

    const closeBTN = (event: any) => {

        if (cadastroConcluido) {
            event.preventDefault()
            stateMng(!state)
            setCadastroConcluido(false)
        }

    }

    const content = () => {

        return (
            <>
                <Dialog.Title className="mt-2 md:mt-0 xl:mt-2 text-[30px] font-medium text-mauve12 dark:text-white text-start">
                    Criar sua conta
                </Dialog.Title>

                <div className="mt-8 md:mt-2 xl:mt-6 flex flex-col justify-center items-center gap-8">

                    {!loading && !etapaUm && <SignupModalEtapaUm register={register} control={control} errors={errors} manageF={manageEtapa} validEmail={validEmail} etapaUmCompleta={etapaUmCompleta} loadingVerify={loadingVerify} />}
                    {!loading && etapaUm && !etapaDois && <SignupModalEtapaDois register={register} control={control} errors={errors} validPassword={validPassword} validUsername={validUsername} etapaDoisCompleta={etapaDoisCompleta} manageF={manageEtapa} loadingVerify={loadingVerify} />}
                    {!loading && etapaUm && etapaDois && <EtapaConclusao email={email} nome={nome} senha={senha} username={username} data_nascimento={data_nascimento} genero={genero} manageF={manageEtapa} manageF2={handleSignUpDebounce} />}
                    {/* {!loading && etapaUm && etapaDois && cadastroConcluido && <CadastroConcluido />} */}
                </div>

            </>
        )
    }

    return (

        <Dialog.Root open={state} onOpenChange={stateMng}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Dialog.Content
                    className={contentStyle}
                    onPointerDownOutside={(e) => e.preventDefault()}>

                    <div className={innerContentStyle}>
                        {cadastroConcluido ? CC() : loading ? loadContent() : content()}
                    </div>

                    <Dialog.Close asChild onClick={closeBTN}>
                        <button
                            className="absolute left-2.5 top-2.5 inline-flex size-[26px] appearance-none items-center justify-center rounded-full text-white hover:bg-custom-bg-x hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

