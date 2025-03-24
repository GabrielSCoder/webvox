import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";
import FixedInput from "../Inputs/FixedLenghtInputs";

type props = {
    register : any
    handleFunction : Function
    useWatch : any
    control : any
    data : any
    isDisabled : boolean
}

export function EditModal(props : props) {

    const {control, data, handleFunction, register, useWatch, isDisabled} = props

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

            <input type="button" className="absolute top-4 right-4 text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-lg hover:bg-slate-200 disabled:bg-gray-600"
                value="Salvar" onClick={() => handleFunction()} disabled={!isDisabled}/>

        </>

    )
}