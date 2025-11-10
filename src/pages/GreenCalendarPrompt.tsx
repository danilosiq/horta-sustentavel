import { PostCalendarioVerde } from "@/service/postCalendarioVerde";
import { useMutation } from "@tanstack/react-query";
import { Download, RefreshCw } from "lucide-react";
import { useState } from "react";

export function GreenCalendarPrompt() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: PostCalendarioVerde,
  });

  const [city, setCity] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  function handleGenerateRecipe() {
    mutate({
      cidade: city,
      data:
        (date.getDate()+1).toString().padStart(2, "0") +
        "/" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        date.getFullYear(),
    });
  }

  return (
    <div className="flex-1 h-screen flex md:flex-row flex-col">
      {/* SEÇÃO ESQUERDA */}
      <div className="md:w-[46%] relative p-7">
        <p className="text-xl shadow-slate-9 font-semibold">Calendario verde</p>

        <div className="sticky top-10 shadow-2xl h-[80vh] gap-5 flex flex-col p-4 rounded-lg bg-white">
          <div className="flex-1 flex items-center justify-center flex-col">
            <div className="items-center gap-2 flex flex-col mb-5">
              <p className="text-center w-[70%]">
                Quais sao as tendencias de plantio para quem mora em...
              </p>
              <input
                className="border-b text-[#247C45] border-b-primary w-full focus:outline-none text-center text-2xl font-semibold placeholder:text-primary/50"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="insira aqui sua cidade"
              />
            </div>

            <div className="items-center gap-2 flex flex-col mb-5">
              <p className="text-center w-[70%]">
                Data personalizada para plantio
              </p>
              <input
                className="border-b text-[#247C45] border-b-primary w-full focus:outline-none text-center text-2xl font-semibold placeholder:text-primary/50"
                type="date"
                onChange={(e) => setDate(new Date(e.target.value))}
                defaultValue={new Date().toISOString().split("T")[0]}
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
        <div className="no-print w-[200px] mb-3 cursor-pointer ml-auto p-2 text-white flex gap-2 items-center justify-center rounded-md bg-[#247C45]">
          <Download width={20} height={20} />
          Salvar como PDF
        </div>
        <div className="bg-white rounded-tr-xl rounded-b-xl p-8">
          {data && (
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Listas de tendencias de plantio ({city} -{" "}
              {(date.getDate()+1).toString().padStart(2, "0") +
                "/" +
                (date.getMonth() + 1).toString().padStart(2, "0") +
                "/" +
                date.getFullYear()}
              )
            </h2>
          )}

          <div className="gap-4 flex flex-col">
            {data
              ? data?.sugestoes?.map((item, i) => (
                  <>
                    <div key={i} className="flex flex-col gap-2 border-b">
                      <p className="font-semibold">{item.produto}</p>
                      <div className="ml-4">
                        <p>Sazonalidade</p>
                        <p className="text-sm text-slate-500">
                          {item.motivo_sazonalidade}
                        </p>
                      </div>
                      <div className="ml-4">
                        <p>Mercado</p>
                        <p className="text-sm text-slate-500">
                          {item.motivo_mercado}
                        </p>
                      </div>
                      <div className="ml-4">
                        <p>Dicas</p>
                        <p className="text-sm text-slate-500">
                          {item.dica_cultivo}
                        </p>
                      </div>
                    </div>
                  </>
                ))
              : isPending && (
                  <div className="flex items-center justify-center h-full">
                    <RefreshCw
                      className="animate-spin text-[#247C45]"
                      size={30}
                    />
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
