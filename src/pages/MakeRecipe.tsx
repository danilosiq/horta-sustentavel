import { useAuth } from "@/hooks/use-auth";
import { aditionalsList } from "@/mock/aditionalsList";
import { foodListMock } from "@/mock/foodList";
import { foodRestriction } from "@/mock/foodRestriction";
import { PostGerarReceita } from "@/service/PostGerarReceita";
import { useMutation } from "@tanstack/react-query";
import html2pdf from "html2pdf.js";
import { Download, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface RecipeRequest {
  foods: string[];
  restrictions: string[];
  aditionals: string[];
}

export function MakeRecipe() {
  const [currentTab, setCurrentTab] = useState<string>("Alimentos");
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const tabs = ["Alimentos", "Restrições", "Adicionais"];
  const [searchCriteria, setSearchCriteria] = useState<string>("");
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [aditionals, setAditionals] = useState<string[]>([]);
  const { userId } = useAuth();

  const recipeRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending, data } = useMutation({
    mutationFn: PostGerarReceita,
  });

  function handleSelectFoods(food: string) {
    setSelectedFoods((prev) =>
      prev.includes(food)
        ? prev.filter((item) => item !== food)
        : [...prev, food]
    );
  }

  function handleSelectRestrictions(restriction: string) {
    setRestrictions((prev) =>
      prev.includes(restriction)
        ? prev.filter((item) => item !== restriction)
        : [...prev, restriction]
    );
  }

  function handleSelectAditionals(aditional: string) {
    setAditionals((prev) =>
      prev.includes(aditional)
        ? prev.filter((item) => item !== aditional)
        : [...prev, aditional]
    );
  }

  useEffect(() => {
    if (data) console.log("Receita gerada:", data);
  }, [data]);

  function handleGenerateRecipe() {
    mutate({
      Alimentos: selectedFoods.join(", "),
      Restrições: restrictions.join(", "),
      Adicionais: aditionals.join(", "),
      id_produtor: userId ? userId.toString() : "",
    });
  }

  // 🧾 Função nova — usa html2pdf.js
  async function handleDownloadPDF() {
    if (!recipeRef.current) return;

    const opt = {
      margin: 10,
      filename: `${data?.NomeDaReceita || "receita"}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
    };

    await html2pdf().from(recipeRef.current).set(opt).save();
  }

  return (
    <div className="flex-1 flex md:flex-row flex-col">
      {/* SEÇÃO ESQUERDA */}
      <div className="md:w-[46%] relative p-7">
        <p className="text-xl shadow-slate-9 font-semibold">
          Monte sua receita
        </p>

        <div className="sticky top-10 shadow-2xl h-[80vh] gap-5 flex flex-col p-4 rounded-lg bg-white">
          {/* Tabs */}
          <div className="flex flex-row gap-3 justify-center">
            {tabs.map((tab, i) => (
              <div
                key={i}
                onClick={() => setCurrentTab(tab)}
                className={`p-2 cursor-pointer font-semibold rounded-md border ${
                  tab === currentTab
                    ? "bg-[#49DE80] text-[#247C45] border-[#49DE80]"
                    : "text-slate-400 border-slate-400"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* === ALIMENTOS === */}
          {currentTab === "Alimentos" && (
            <>
              <div>
                <input
                  type="text"
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  placeholder="Procurar"
                  className="w-full h-[40px] border border-slate-400 focus:outline-[#49DE80] px-3 rounded-3xl focus:border-[#49DE80]"
                />
              </div>
              <div className="border flex-1 p-2 w-full overflow-y-scroll">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {foodListMock
                    .filter((food) =>
                      food
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .includes(searchCriteria.toLocaleLowerCase())
                    )
                    .map((food, i) => {
                      const isSelected = selectedFoods.includes(food);
                      return (
                        <div
                          key={i}
                          onClick={() => handleSelectFoods(food)}
                          className={`${
                            isSelected
                              ? "bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                              : "text-slate-500"
                          } text-sm cursor-pointer text-center border rounded-lg p-1`}
                        >
                          {food}
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="py-2 gap-2 w-full flex flex-row overflow-x-auto">
                {selectedFoods.map((food, i) => (
                  <p
                    key={i}
                    onClick={() => handleSelectFoods(food)}
                    className="flex-shrink-0 px-4 py-2 cursor-pointer flex items-center justify-center text-center rounded-md bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                  >
                    {food}
                  </p>
                ))}
              </div>
            </>
          )}

          {/* === RESTRIÇÕES === */}
          {currentTab === "Restrições" && (
            <>
              <div className="flex-1">
                <div className="flex items-center justify-center mt-10 flex-row gap-3">
                  {foodRestriction.map((restriction, i) => {
                    const Icon = restriction.icon;
                    const isSelected = restrictions.includes(restriction.label);
                    return (
                      <div
                        key={i}
                        onClick={() =>
                          handleSelectRestrictions(restriction.label)
                        }
                        className={`${
                          isSelected
                            ? "bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                            : "text-slate-500"
                        } text-sm justify-center items-center flex flex-col cursor-pointer text-center border rounded-lg p-3`}
                      >
                        <Icon />
                        <p>{restriction.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="py-2 gap-2 w-full flex flex-row overflow-x-auto">
                {restrictions.map((restriction, i) => (
                  <p
                    key={i}
                    onClick={() => handleSelectRestrictions(restriction)}
                    className="flex-shrink-0 px-4 py-2 cursor-pointer flex items-center justify-center text-center rounded-md bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                  >
                    {restriction}
                  </p>
                ))}
              </div>
            </>
          )}

          {/* === ADICIONAIS === */}
          {currentTab === "Adicionais" && (
            <>
              <div className="flex-1">
                <div className="grid grid-cols-2 items-center justify-center mt-10 gap-3">
                  {aditionalsList.map((aditional, i) => {
                    const Icon = aditional.icon;
                    const isSelected = aditionals.includes(aditional.label);
                    return (
                      <div
                        key={i}
                        onClick={() => handleSelectAditionals(aditional.label)}
                        className={`${
                          isSelected
                            ? "bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                            : "text-slate-500"
                        } text-sm justify-center items-center flex flex-col cursor-pointer text-center border rounded-lg p-3`}
                      >
                        <Icon />
                        <p>{aditional.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="py-2 gap-2 w-full flex flex-row overflow-x-auto">
                {aditionals.map((item, i) => (
                  <p
                    key={i}
                    onClick={() => handleSelectAditionals(item)}
                    className="flex-shrink-0 px-4 py-2 cursor-pointer flex items-center justify-center text-center rounded-md bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </>
          )}

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
      <div className="flex-1 p-3 pb-[100px] bg-[#49DE80]/30 overflow-y-auto h-screen">
        <div
          onClick={handleDownloadPDF}
          className="no-print w-[200px] mb-3 cursor-pointer ml-auto p-2 text-white flex gap-2 items-center justify-center rounded-md bg-[#247C45]"
        >
          <Download width={20} height={20} />
          Salvar como PDF
        </div>

        <div
          ref={recipeRef}
          className="bg-white rounded-tr-xl rounded-b-xl p-8"
        >
          {data ? (
            <>
              <h2 className="text-2xl font-bold mt-5 mb-3">
                {data?.NomeDaReceita}
              </h2>
              <p className="mb-5">{data?.Descricao}</p>

              <h3 className="text-xl font-semibold mb-2">Ingredientes</h3>
              <ul className="list-disc ml-5 mb-5">
                {data?.Ingredientes.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-2">Instruções</h3>
              <ol className="list-decimal ml-5 mb-5">
                {data?.Instrucoes.map((step: string, i: number) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>

              <p className="mb-2">
                <strong>Tempo de Preparo:</strong> {data?.TempoDePreparo}
              </p>
              <p className="mb-5">
                <strong>Porções:</strong> {data?.Porcoes}
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
