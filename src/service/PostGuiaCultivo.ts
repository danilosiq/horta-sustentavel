import { api } from "@/lib/axios";

interface PostGerarReceitaRequest {
  cidade: string;
  data: string;
  planta: string;
  metodo_cultivo:string
}

export type GuiaPlanta = {
  titulo: string;
  planta: string;
  cidade: string;
  data_considerada: string;
  metodo_cultivo: "Vaso" | "Solo";
  introducao: string;
  modo_cultivo: string;
  rota_irrigacao: string;
  consumo_sol: string;
  tempo_colheita: string;
  recomendacao_epoca: string;
};

export async function PostGerarGuia({
  data,cidade, planta,metodo_cultivo
}: PostGerarReceitaRequest) {


  const res = await api.post<GuiaPlanta>("/guia_cultivo.php", {data,cidade,planta,metodo_cultivo});

  return res.data;
}