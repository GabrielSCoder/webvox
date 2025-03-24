import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { editUser } from "../../services/user";
import LoadingItemTemplate from "../LoadingItem";
import { EditModal } from "./modal";
const contentStyle = "p-2 lg:p-8 px-10 lg:px-24 fixed left-1/2 top-1/2 max-h-[100vh] min-h-[70dvh] h-[80dvh] w-[400px] md:w-[500px] lg:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow"

type props = {
    state: boolean
    setState: any
    data: any
    userFunc: any
}

export default function ProfileEditModal(props: props) {

    const { setState, state, data, userFunc } = props
    const [loading, setLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
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

    const nome = useWatch({ control, name: "nome" });
    const bio = useWatch({ control, name: "bio" });
    const background = useWatch({ control, name: "background" });
    const avatar = useWatch({ control, name: "avatar" });

    useEffect(() => {
        setIsDisabled(nome.trim() !== "" && bio.trim() !== "" && background.trim() !== "" && avatar.trim() !== "");
    }, [nome, bio, background, avatar]);

    return (

        <Dialog.Root open={state} onOpenChange={setState}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Dialog.Content
                    className={contentStyle}
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <Dialog.Title></Dialog.Title>

                    {loading ? <LoadingItemTemplate /> : <EditModal control={control} data={data} handleFunction={delay} register={register} useWatch={useWatch} isDisabled={isDisabled} />}

                    <Dialog.Close asChild >
                        <button
                            className="absolute left-2.5 top-4 inline-flex size-[26px] appearance-none items-center justify-center rounded-full text-white hover:bg-custom-bg-x hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close" onClick={() => reset()} disabled={loading}
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}