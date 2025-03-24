import * as Dialog from "@radix-ui/react-dialog"
import LoadingItemTemplate from "../LoadingItem"
import { useEffect, useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useForm, useWatch } from "react-hook-form"
import { Content } from "./modal"
import { postReportAsync } from "../../services/report"


const contentStyle = "p-2 lg:p-8 px-10 lg:px-24 fixed left-1/2 top-1/2 max-h-[100vh] min-h-[70dvh] h-[80dvh] w-[400px] md:w-[500px] lg:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow z-50"

type props = {
    state: boolean
    setState: any
}



export default function ReportModal(props: props) {

    const { setState, state } = props
    const [loading, setLoading] = useState(false)
    const [conclusao, setConclusao] = useState(false)
    const [dis, setDis] = useState(false)
    const { register, reset, control, getValues } = useForm({
        defaultValues: {
            titulo: "",
            nome: "",
            conteudo: "",
            tela: ""
        }
    })

    const persistData = async () => {
        const data = getValues()
        const resp = await postReportAsync({ ...data })
        console.log(resp)
        if (resp.data.success) {
            setConclusao(true)
        }
    }

    const delay = async () => {

        setLoading(true)
        const dl = new Promise(resolve => setTimeout(resolve, 2000))
        await Promise.all([dl, persistData()])
        setLoading(false)
    }

    const Concluido = () => {
        return (
            <div className="h-full flex justify-center items-center">
                <p className="text-md text-white">Obrigado pelo feedback!</p>
            </div>
        )
    }

    const IsLoading = () => {
        return (
            <div className="h-full">
                <LoadingItemTemplate />
            </div>
        )
    }


    const titulo = useWatch({ control, name: "titulo" });
    const conteudo = useWatch({ control, name: "conteudo" });
    const tela = useWatch({ control, name: "tela" });

    useEffect(() => {
        setDis(titulo.trim() !== "" && conteudo.trim() !== "" && tela.trim() !== "");
    }, [titulo, conteudo, tela]);


    return (

        <Dialog.Root open={state} onOpenChange={setState}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Dialog.Content
                    className={contentStyle}
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <Dialog.Title></Dialog.Title>

                    {loading ? <IsLoading /> : conclusao ? <Concluido /> : <Content register={register} control={control} useWatch={useWatch} isDisabled={dis} handleFunction={delay} />}

                    <Dialog.Close asChild >
                        <button
                            className="absolute left-2.5 top-4 inline-flex size-[26px] appearance-none items-center justify-center rounded-full text-white hover:bg-custom-bg-x hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close" onClick={() => {reset(); setConclusao(false)}} disabled={loading}
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}