import { aditionalsList } from "@/mock/aditionalsList";
import { foodListMock } from "@/mock/foodList";
import { foodRestriction } from "@/mock/foodRestriction";
import { Download } from "lucide-react";
import { useState } from "react";
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
  const [finalPrompTags, setFinalPrompTags] = useState<RecipeRequest>();
  function handleSelectFoods(food: string) {
    if (!selectedFoods.includes(food)) {
      setSelectedFoods([...selectedFoods, food]);
    } else {
      setSelectedFoods((prev) => prev.filter((data) => data != food));
    }
  }

  function handleSelectRestrictions(restriction: string) {
    if (!restrictions.includes(restriction)) {
      setRestrictions([...restrictions, restriction]);
    } else {
      setRestrictions((prev) => prev.filter((data) => data != restriction));
    }
  }

  function handleSelectAditionals(aditional: string) {
    if (!aditionals.includes(aditional)) {
      setAditionals([...aditionals, aditional]);
    } else {
      setAditionals((prev) => prev.filter((data) => data != aditional));
    }
  }

  function handleGenerateRecipe() {
    setFinalPrompTags({
      foods: selectedFoods,
      aditionals: aditionals,
      restrictions: restrictions,
    });
  }
  return (
    <div className="flex-1  h-screen flex md:flex-row    flex-col">
      <div className="md:w-[46%] relative p-7">
        <p className="text-xl shadow-slate-9 font-semibold">
          Monte sua receita
        </p>

        <div className="sticky top-10 shadow-2xl h-[80vh] gap-5 flex flex-col p-4 rounded-lg bg-white">
          {/* Tabs */}
          <div className="flex flex-row  gap-3 justify-center">
            {tabs.map((tab, i) => (
              <div
                onClick={() => setCurrentTab(tab)}
                key={i}
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
              <div className="border flex-1 p-2  w-full overflow-y-scroll">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                  {foodListMock
                    .filter((data) =>
                      data
                        .toLowerCase()
                        .normalize("NFD") // separa letras e acentos
                        .replace(/[\u0300-\u036f]/g, "") // remove os acentos
                        .includes(searchCriteria.toLocaleLowerCase())
                    )
                    .map((food, i) => {
                      const isSelected = selectedFoods.includes(food);
                      return (
                        <div
                          onClick={() => handleSelectFoods(food)}
                          key={i}
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
                    onClick={() => handleSelectFoods(food)}
                    key={i}
                    className="flex-shrink-0 px-4 py-2 cursor-pointer flex items-center justify-center text-center rounded-md bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                  >
                    {food}
                  </p>
                ))}
              </div>
            </>
          )}

          {currentTab === "Restrições" && (
            <>
              <div className="flex-1 ">
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
                        } text-sm justify-center items-center  flex flex-col cursor-pointer text-center border rounded-lg p-3`}
                      >
                        <Icon className="" />
                        <p>{restriction.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="py-2 gap-2 w-full flex flex-row overflow-x-auto">
                {restrictions.map((restriction, i) => (
                  <p
                    onClick={() => handleSelectRestrictions(restriction)}
                    key={i}
                    className="flex-shrink-0 px-4 py-2 cursor-pointer flex items-center justify-center text-center rounded-md bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                  >
                    {restriction}
                  </p>
                ))}
              </div>
            </>
          )}

          {currentTab === "Adicionais" && (
            <>
              <div className="flex-1 ">
                <div className="grid grid-cols-2 items-center justify-center mt-10  gap-3">
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
                        } text-sm justify-center items-center  flex flex-col cursor-pointer text-center border rounded-lg p-3`}
                      >
                        <Icon className="" />
                        <p>{aditional.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="py-2 gap-2 w-full flex flex-row overflow-x-auto">
                {aditionals.map((restriction, i) => (
                  <p
                    onClick={() => handleSelectRestrictions(restriction)}
                    key={i}
                    className="flex-shrink-0 px-4 py-2 cursor-pointer flex items-center justify-center text-center rounded-md bg-[#49DE80]/50 text-[#247C45] border-[#247C45]"
                  >
                    {restriction}
                  </p>
                ))}
              </div>
            </>
          )}

          {/* Botão */}
          <div
            onClick={() => handleGenerateRecipe()}
            className="bg-[#49DE80] text-xl w-[80%] mx-auto text-center py-3 p-2 cursor-pointer rounded-md border font-semibold text-[#247C45] border-[#49DE80]"
          >
            Gerar
          </div>
        </div>
      </div>

      <div className="flex-1 pb-[400px] p-10 bg-[#49DE80]/30 overflow-y-auto">
        <div className="bg-white  rounded-tr-xl rounded-b-xl p-8 ">
          <div className=" w-[200px] cursor-pointer ml-auto  p-2 text-white flex gap-2 rounded-md bg-primary">
            <Download width={20} height={20} />
            Salvar como PDF
          </div>
          {JSON.stringify(finalPrompTags)}
         
        </div>
      </div>
    </div>
  );
}
