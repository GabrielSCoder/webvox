import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Card from "../../components/Card";
import { useState } from "react";
import FixedInput from "../Inputs/FixedLenghtInputs";
import TitleTag from "../../components/TitleTags";
import { useForm, useWatch } from "react-hook-form";
import { editUser } from "../../services/user";
import LoadingItemTemplate from "../LoadingItem";
const contentStyle = "p-8 px-20 fixed left-1/2 top-1/2 h-[68vh] max-h-[100vh] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow"

type props = {
    state: boolean
    setState: any
    data: any
    userFunc : any
}

export default function ProfileEditModal(props: props) {

    const { setState, state, data, userFunc } = props
    const [loading, setLoading] = useState(false)
    const { register, reset, handleSubmit, control } = useForm({
        defaultValues: {
            nome: data.nome,
            bio: data.texto_bio ?? "",
            background: data.background_url ?? "",
            avatar: data.img_url ?? ""
        }
    })

  

    const persistData = handleSubmit(async (formdata) => {

        setLoading(true)

        const sendData = {
            ...data,
            img_url: formdata.avatar,
            background_url: formdata.background,
            texto_bio: formdata.bio,
            nome: formdata.nome
        }

        await editUser(sendData)      
    })

    const delay = async () => {
      
        const dl = new Promise(resolve => setTimeout(resolve, 2000))
        await Promise.all([dl, persistData()])
        userFunc()
        setState(false)
    }

    const Content = () => {

        return (
            <>
                <TitleTag.Sub className="text-white absolute top-4 left-20">Edit Profile</TitleTag.Sub>

                <Card className="flex-col h-full w-full my-20">

                    <Card className="flex-col gap-10 ">
                        <FixedInput.InputText maxLenght={200} name="background" placeholder="Url da Imagem de fundo" register={register} value={data.background_url ?? ""} useWatch={useWatch} control={control} />
                        <FixedInput.InputText maxLenght={200} name="avatar" placeholder="Url da Imagem de perfil" register={register} value={data.img_url ?? ""} useWatch={useWatch} control={control} />
                        <FixedInput.TextArea maxLenght={70} name="bio" placeholder="bio" register={register} value={data.texto_bio ?? ""} useWatch={useWatch} control={control} />
                        <FixedInput.InputText key={"nome"} maxLenght={50} name="nome" placeholder="nome" register={register} useWatch={useWatch} control={control} required />
                    </Card>

                </Card>

                <input type="button" className="absolute top-4 right-4 text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-lg hover:bg-slate-200"
                    value="Salvar" onClick={delay} />

            </>

        )
    }



    return (

        <Dialog.Root open={state} onOpenChange={setState}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Dialog.Content
                    className={contentStyle}
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <Dialog.Title></Dialog.Title>

                    {loading ? <LoadingItemTemplate /> : <Content />}

                    <Dialog.Close asChild >
                        <button
                            className="absolute left-2.5 top-4 inline-flex size-[26px] appearance-none items-center justify-center rounded-full text-white hover:bg-custom-bg-x hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close" onClick={() => reset()}
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}