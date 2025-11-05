import { PostCalendarioVerde } from "@/service/postCalendarioVerde";
import { useMutation } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, RefreshCw } from "lucide-react";
import { useRef, useState } from "react";

export function GreenCalendarPrompt() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: PostCalendarioVerde,
  });

  const [city, setCity] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  // 🔹 Referência ao conteúdo que será exportado em PDF
  const pdfRef = useRef<HTMLDivElement>(null);

  // Gera tendências de plantio
  function handleGenerateRecipe() {
    mutate({
      cidade: city,
      data:
        (date.getDate() + 1).toString().padStart(2, "0") +
        "/" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        date.getFullYear(),
    });
  }

  // 🔹 Função para gerar e baixar PDF
  async function handleDownloadPDF() {
    if (!pdfRef.current) return;

    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Calendario-Verde-${city || "sem-cidade"}.pdf`);
  }

  return (
    <div className="flex-1 h-screen flex md:flex-row flex-col">
      {/* SEÇÃO ESQUERDA */}
      <div className="md:w-[46%] relative p-7">
        <p className="text-xl shadow-slate-9 font-semibold">Calendário Verde</p>

        <div className="sticky top-10 shadow-2xl h-[80vh] gap-5 flex flex-col p-4 rounded-lg bg-white">
          <div className="flex-1 flex items-center justify-center flex-col">
            {/* Campo cidade */}
            <div className="items-center gap-2 flex flex-col mb-5">
              <p className="text-center w-[70%]">
                Quais são as tendências de plantio para quem mora em...
              </p>
              <input
                className="border-b text-[#247C45] border-b-primary w-full focus:outline-none text-center text-2xl font-semibold placeholder:text-primary/50"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Insira aqui sua cidade"
              />
            </div>

            {/* Campo data */}
            <div className="items-center gap-2 flex flex-col mb-5">
              <p className="text-center w-[70%]">Data personalizada para plantio</p>
              <input
                className="border-b text-[#247C45] border-b-primary w-full focus:outline-none text-center text-2xl font-semibold placeholder:text-primary/50"
                type="date"
                onChange={(e) => setDate(new Date(e.target.value))}
                defaultValue={new Date().toISOString().split("T")[0]}
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

      {/* SEÇÃO DIREITA */}
      <div className="flex-1 pb-[400px] p-3 bg-[#49DE80]/30 overflow-y-auto">
        {/* Botão de download PDF */}
        {data && (
          <div
            className="no-print w-[200px] mb-3 cursor-pointer ml-auto p-2 text-white flex gap-2 items-center justify-center rounded-md bg-[#247C45]"
            onClick={handleDownloadPDF}
          >
            <Download width={20} height={20} />
            Salvar como PDF
          </div>
        )}

        {/* Conteúdo exportável */}
        <div ref={pdfRef} className="bg-white rounded-tr-xl rounded-b-xl p-8">
          {data && (
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Lista de tendências de plantio ({city} -{" "}
              {(date.getDate() + 1).toString().padStart(2, "0") +
                "/" +
                (date.getMonth() + 1).toString().padStart(2, "0") +
                "/" +
                date.getFullYear()}
              )
            </h2>
          )}

          <div className="gap-4 flex flex-col">
            {data ? (
              data?.sugestoes?.map((item, i) => (
                <div key={i} className="flex flex-col gap-2 border-b pb-3">
                  <p className="font-semibold text-lg text-[#247C45]">
                    {item.produto}
                  </p>
                  <div className="ml-4">
                    <p className="font-semibold">Sazonalidade</p>
                    <p className="text-sm text-slate-600">
                      {item.motivo_sazonalidade}
                    </p>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Mercado</p>
                    <p className="text-sm text-slate-600">
                      {item.motivo_mercado}
                    </p>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Dica de Cultivo</p>
                    <p className="text-sm text-slate-600">
                      {item.dica_cultivo}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              isPending && (
                <div className="flex items-center justify-center h-full">
                  <RefreshCw
                    className="animate-spin text-[#247C45]"
                    size={30}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}