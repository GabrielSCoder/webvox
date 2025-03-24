import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";
import FixedInput from "../Inputs/FixedLenghtInputs";

type props = {
    register: any
    control: any
    useWatch: any
    isDisabled: boolean
    handleFunction : Function
}

export function Content(props: props) {

    const { register, control, useWatch, isDisabled, handleFunction } = props

    return (
        <Card className="flex flex-col">
            <TitleTag.Sub className="text-white absolute top-4 left-20">Reportar problema</TitleTag.Sub>

            <Card className="flex-col h-full w-full my-20">

                <Card className="flex-col gap-10 ">
                    <FixedInput.InputText maxLenght={20} name="titulo" placeholder="Título" register={register} innerPlaceholder="Título" value={""}
                        useWatch={useWatch} control={control} required />
                    <FixedInput.InputText maxLenght={20} name="nome" placeholder="Seu nome (não obrigatório)" innerPlaceholder="Nome" register={register}
                        value={""} useWatch={useWatch} control={control} />
                    <FixedInput.InputText maxLenght={20} name="tela" placeholder="Tela onde o problema ocorre" innerPlaceholder="Tela" register={register}
                        value={""} useWatch={useWatch} control={control} required />
                    <FixedInput.TextArea maxLenght={300} name="conteudo" rows={5} placeholder="Descrição do problema" innerPlaceholder="conteudo" register={register}
                        value={""} useWatch={useWatch} control={control} required />
                    {/* <input type="text" {...register("nome")}/> */}
                </Card>

            </Card>

            <input type="button"
             className="absolute top-4 right-4 text-white dark:text-black dark:bg-white bg-black rounded-3xl py-0 px-4 font-semibold text-lg hover:bg-slate-200 disabled:bg-gray-600"
                value="Salvar" onClick={() => handleFunction()} disabled={!isDisabled} />

        </Card>

    )
}