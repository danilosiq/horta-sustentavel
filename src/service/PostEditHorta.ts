import { api } from "@/lib/axios";

interface EditHortaRequest {
  id_horta: number;
  nome?: string;
  descricao?: string;
  endereco_hortas_id_endereco_hortas?: number;
  nr_cnpj?: string;
  visibilidade?: number;
}

interface EditHortaResponse {
  success: boolean;
  message: string;
}

export async function EditHorta(data: EditHortaRequest) {
  const res = await api.post<EditHortaResponse>("/edit_horta.php", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}