export default function Versao() {
    return (
        <div className="h-full w-full justify-center items-center p-4 gap-8">
            <div className="h-full flex flex-col justify-center items-center gap-4">
                <p className="text-xl text-white text-center">
                   Versão atual: 1.0
                </p>
                <p className="text-xl text-white text-center">
                    Pela forma que o site de hospedagem gratuito trabalha com o back-end utilizado, algumas funcionalidades foram cortadas ao custo de deixar o site mais estático para manter o funcionamento.
                    As requisições também também são influenciadas por uma latência mais alta, implicando em um site bem mais lento que o normal.
                </p>
            </div>
        </div>
    )
}