import { PostGerarReceita } from "@/service/PostGerarReceita";
import { useMutation } from "@tanstack/react-query";
import { Download, RefreshCw } from "lucide-react";



export function GreenCalendarPrompt() {


  const { mutate, isPending, data } = useMutation({
    mutationFn: PostGerarReceita,
  });





  function handleGenerateRecipe() {


  }



  return (
    <div className="flex-1 h-screen flex md:flex-row flex-col">
      {/* SEÇÃO ESQUERDA */}
      <div className="md:w-[46%] relative p-7">
        <p className="text-xl shadow-slate-9 font-semibold">
          Monte sua receita
        </p>

        <div className="sticky top-10 shadow-2xl h-[80vh] gap-5 flex flex-col p-4 rounded-lg bg-white">
          <div className="flex-1 flex items-center justify-center flex-col">
            <div className="items-center gap-2 flex flex-col mb-5">
              <p className="text-center w-[70%]">
                Quais sao as tendencias de plantio para quem mora em...
              </p>
              <input
                className="border-b border-b-primary w-full focus:outline-none text-center text-2xl font-semibold placeholder:text-primary/50"
                type="text"
                placeholder="insira aqui sua cidade"
              />
            </div>
          </div>

          {/* Botão Gerar */}
          <div
            onClick={() => !isPending && handleGenerateRecipe()}
            className={`${
              isPending
                ? "bg-slate-200 text-slate-400"
                : "bg-[#49DE80] cursor-pointer text-[#247C45] border-[#49DE80]"
            } text-xl w-[80%] mx-auto text-center py-3 p-2 rounded-md border font-semibold`}
          >
            {isPending ? "Gerando..." : "Gerar"}
          </div>
        </div>
      </div>

      {/* SEÇÃO DIREITA (RECEITA GERADA) */}
      <div className="flex-1 pb-[400px] p-3 bg-[#49DE80]/30 overflow-y-auto">
        <div
    
          className="no-print w-[200px] mb-3 cursor-pointer ml-auto p-2 text-white flex gap-2 items-center justify-center rounded-md bg-[#247C45]"
        >
          <Download width={20} height={20} />
          Salvar como PDF
        </div>
        <div
          
          className="bg-white rounded-tr-xl rounded-b-xl p-8"
        >
          {data ? (
            <>
              <h2 className="text-2xl font-bold mt-5 mb-3">
                {data.NomeDaReceita}
              </h2>
              <p className="mb-5">{data.Descricao}</p>

              <h3 className="text-xl font-semibold mb-2">Ingredientes</h3>
              <ul className="list-disc ml-5 mb-5">
                {data.Ingredientes.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-2">Instruções</h3>
              <ol className="list-decimal ml-5 mb-5">
                {data.Instrucoes.map((step: string, i: number) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>

              <p className="mb-2">
                <strong>Tempo de Preparo:</strong> {data.TempoDePreparo}
              </p>
              <p className="mb-5">
                <strong>Porções:</strong> {data.Porcoes}
              </p>

              <h3 className="text-xl font-semibold mb-2">Tabela Nutricional</h3>
              <ul className="list-disc ml-5">
                <li>
                  <strong>Calorias:</strong> {data.TabelaNutricional.Calorias}
                </li>
                <li>
                  <strong>Carboidratos:</strong>{" "}
                  {data.TabelaNutricional.Carboidratos}
                </li>
                <li>
                  <strong>Proteínas:</strong> {data.TabelaNutricional.Proteinas}
                </li>
                <li>
                  <strong>Gorduras:</strong> {data.TabelaNutricional.Gorduras}
                </li>
              </ul>
            </>
          ) : (
            isPending && (
              <div className="flex items-center justify-center h-full">
                <RefreshCw className="animate-spin text-[#247C45]" size={30} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
