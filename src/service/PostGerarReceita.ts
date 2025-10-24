import { api } from "@/lib/axios";

interface PostGerarReceitaRequest {
  Alimentos: string;
  Restrições: string;
  Adicionais: string;
}

export interface ReceitaResponse {
  NomeDaReceita: string;
  Descricao: string;
  Ingredientes: string[];
  Instrucoes: string[];
  TempoDePreparo: string;
  Porcoes: string;
  TabelaNutricional: {
    Calorias: string;
    Carboidratos: string;
    Proteinas: string;
    Gorduras: string;
  };
}

export async function PostGerarReceita({
  Alimentos,
  Adicionais,
  Restrições,
}: PostGerarReceitaRequest) {
  const body = [
    {
      Alimentos,
      Restrições,
      Adicionais,
    },
  ];

  const res = await api.post<ReceitaResponse>("/gerar_receita.php", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}