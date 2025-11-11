import { api } from "@/lib/axios";

export interface ForgotPasswordRequest {
  email: string;
  pergunta1: string;
  resposta1: string;
  pergunta2: string;
  resposta2: string;
  novaSenha: string;
  confirmarSenha: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Envia os dados para o endpoint forgot_pass.php
 */
export async function PostforgotPasswordRequest(data: ForgotPasswordRequest) {
  const response = await api.post<ForgotPasswordResponse>(
    "/forgot_pass.php",
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
}
