import { PostGerarGuia } from "@/service/PostGuiaCultivo";
import { useMutation } from "@tanstack/react-query";
import { Amphora, Download, RefreshCw, Sprout } from "lucide-react";
import { useEffect, useState } from "react";

export function GuidePrompt() {
  const { mutate, isPending, data, variables } = useMutation({
    mutationFn: PostGerarGuia,
  });
  const date = new Date().toISOString().split("T")[0];
  const [selectedPlantForm, setSelectedPlantForm] = useState("");
  const [city, setCity] = useState("");
  const [plant, setPlant] = useState("");

  function handleGenerateRecipe() {
    if (!plant || !city || !selectedPlantForm) {
      alert("Por favor, preencha todos os campos.");
      return;
    } else {
      mutate({
        data: date,
        cidade: city,
        planta: plant,
        metodo_cultivo: selectedPlantForm,
      });
    }
  }

  useEffect(() => {
    console.log(variables);
  }, [variables]);

  const plantingForms = [
    {
      label: "Vaso",
      icon: Amphora,
    },
    {
      label: "Solo",
      icon: Sprout,
    },
  ];

  return (
    <div className="flex-1 h-screen flex md:flex-row flex-col">
      {/* SEÇÃO ESQUERDA */}
      <div className="md:w-[46%]  relative p-7">
        <p className="text-xl shadow-slate-9 font-semibold">
          Guia do cultivo
        </p>

        <div className="sticky top-10 shadow-2xl h-[80vh] gap-5 flex flex-col p-4 rounded-lg bg-white">
          <div className="gap-10 flex justify-center items-center flex-col flex-1">
            <div className="text-center items-center flex flex-col">
              <p>Me ajude a cultivar...</p>
              <input
                onChange={(e) => setPlant(e.target.value)}
                className="border-b border-b-primary w-full focus:outline-none text-center text-2xl font-semibold placeholder:text-primary/50"
                type="text"
                placeholder="insira um alimento"
              />
            </div>

            <div className="text-center items-center flex flex-col">
              <p>Vou plantar em um...</p>
              <div className="flex gap-3 flex-row">
                {plantingForms.map((type, i) => {
                  const Icon = type.icon;
                  return (
                    <div
                      onClick={() => setSelectedPlantForm(type.label)}
                      key={i}
                      className={`px-1 py-2 border rounded-md w-[140px] justify-center flex flex-col items-center ${
                        selectedPlantForm === type.label
                          ? "border-secondary bg-[#49DE80]/40 text-secondary"
                          : "border-slate-400 text-slate-400"
                      } cursor-pointer`}
                    >
                      <Icon size={30} className="" />
                      <p className="font-semibold text-center">{type.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center items-center flex flex-col">
              <p>Resido na cidade de</p>
              <input
                onChange={(e) => setCity(e.target.value)}
                className="border-b border-b-primary w-full focus:outline-none text-center text-2xl font-semibold placeholder:text-primary/50"
                type="text"
                placeholder="insira sua cidade"
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
          {data ? (
            <div>
              <h2 className="text-2xl font-bold mt-5 mb-3">{data.titulo}</h2>
              <p className="mb-5">{data.introducao}</p>

              <div>
                <h3 className="text-xl font-semibold mb-2">Modo de cultivo</h3>
                <p className="mb-5">{data.modo_cultivo}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Irrigação</h3>
                <p className="mb-5">{data.rota_irrigacao}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Consumo de sol</h3>
                <p className="mb-5">{data.consumo_sol}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Tempo de colheita
                </h3>
                <p className="mb-5">{data.tempo_colheita}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Recomendações</h3>
                <p className="mb-5">{data.recomendacao_epoca}</p>
              </div>
            </div>
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
