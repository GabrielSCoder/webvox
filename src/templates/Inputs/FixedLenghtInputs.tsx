
import classNames from "../../utils/classNames"

type props = {
    className?: string
}

type inputProps = {
    name: string
    register?: any
    innerPlaceholder ?: string
    placeholder?: string
    maxLenght: number
    value?: string
    required?: boolean
    useWatch ?: any
    control ? : any
    rows ?: number
}


function FixedInput() {
    return (
        <></>
    )
}

const textInput = (props: props & inputProps) => {

    const { name, register, placeholder, maxLenght, required, useWatch, control, innerPlaceholder } = props

    const inputValue = useWatch ? useWatch({control, name}) : "";

    return (
        <div className={classNames("w-full border group rounded-md", required && inputValue.length == 0 ? " focus-within:border-red-500" : "border-gray-300 focus-within:border-blue-500")}>
            <div className="px-2 flex justify-between">
                <p className={classNames("text-gray-500 transition-colors ", required && inputValue.length == 0 ? " group-focus-within:text-red-500" : "group-focus-within:text-blue-500")}>{placeholder}</p>
                <p className={classNames("text-gray-500 transition-colors ", required && inputValue.length == 0 ? " group-focus-within:text-red-500" : "group-focus-within:text-blue-500")}>{inputValue.length} / {maxLenght}</p>
            </div>
            <input type="text" className={classNames("w-full focus:outline-none bg-transparent text-black dark:text-white p-2")} placeholder={innerPlaceholder ?? placeholder} maxLength={maxLenght}
                {...(register ? register(name) : {})} />
                
        </div>
    )
}

const textareaInput = (props: props & inputProps) => {


    const { name, register, placeholder, maxLenght, innerPlaceholder, rows, required, useWatch, control } = props

    const inputValue = useWatch ? useWatch({control, name}) : "";


    return (
        <div className={classNames("w-full border group rounded-md", required && inputValue.length == 0 ? " focus-within:border-red-500" : "border-gray-300 focus-within:border-blue-500")}>
            <div className="px-2 flex justify-between">
            <p className={classNames("text-gray-500 transition-colors ", required && inputValue.length == 0 ? " group-focus-within:text-red-500" : "group-focus-within:text-blue-500")}>{placeholder}</p>
            <p className={classNames("text-gray-500 transition-colors ", required && inputValue.length == 0 ? " group-focus-within:text-red-500" : "group-focus-within:text-blue-500")}>{inputValue.length} / {maxLenght}</p>
            </div>
            <textarea className="w-full focus:outline-none bg-transparent text-black dark:text-white resize-none p-2" placeholder={innerPlaceholder ?? placeholder} maxLength={maxLenght} rows={rows}
                {...(register ? register(name) : {})}  />
        </div>
    )
}

FixedInput.InputText = textInput
FixedInput.TextArea = textareaInput

export default FixedInput