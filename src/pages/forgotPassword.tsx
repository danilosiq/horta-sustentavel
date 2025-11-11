import { useToast } from "@/hooks/use-toast";
import { ForgotPasswordRequest, PostforgotPasswordRequest } from "@/service/postForgotPass";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const forgotPasswordSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    pergunta1: z.string().min(1, "Pergunta 1 é obrigatória"),
    resposta1: z.string().min(1, "Resposta 1 é obrigatória"),
    pergunta2: z.string().min(1, "Pergunta 2 é obrigatória"),
    resposta2: z.string().min(1, "Resposta 2 é obrigatória"),
    novaSenha: z.string().min(1, "Campo obrigatório"),
    confirmarSenha: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
    const navigate = useNavigate();
    const {toast} = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: PostforgotPasswordRequest,
    onSuccess: (data) => {
      
      if (data.success) {
        navigate("/login");
        reset();
        toast({
        title: "Senha alterada",
        description: `Sua senha foi alterada com sucesso!`,
        variant: "default",
      });
      }
     
    },
    onError: (error) => {
        console.error("Erro ao enviar o formulário:", error);
      
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutation.mutate(data as ForgotPasswordRequest);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-10 bg-green-100">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
        <div className="flex flex-col gap-6 max-w-[600px]">
          {/* TÍTULO */}
          <div className=" bg-white p-10 rounded-lg shadow-lg ">
            <p className="font-semibold text-lg text-center">Esqueci minha senha</p>
            <p className="text-sm text-gray-500">
              Essa sessão é para restaurar sua senha. Informe seu e-mail e responda as perguntas de segurança cadastradas anteriormente.
            </p>
          </div>

          {/* E-MAIL */}
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <label>
              E-mail
              <input
                type="email"
                {...register("email")}
                className="border p-2 rounded-md w-full focus:outline-green-600 mt-1"
                placeholder="Digite seu e-mail cadastrado"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </label>
          </div>

          {/* PERGUNTAS */}
          <div className="bg-white p-10 rounded-lg shadow-lg ">
            <div className="flex flex-col gap-4 ">
              <label>
                Pergunta 1
                <input
                  type="text"
                  {...register("pergunta1")}
                  className="border p-2 rounded-md w-full focus:outline-green-600 mt-1"
                  placeholder="Digite a primeira pergunta"
                />
                {errors.pergunta1 && (
                  <p className="text-red-500 text-sm">{errors.pergunta1.message}</p>
                )}
              </label>

              <label>
                Resposta 1
                <input
                  type="text"
                  {...register("resposta1")}
                  className="border p-2 rounded-md w-full focus:outline-green-600 mt-1"
                  placeholder="Digite a resposta da primeira pergunta"
                />
                {errors.resposta1 && (
                  <p className="text-red-500 text-sm">{errors.resposta1.message}</p>
                )}
              </label>
            </div>

            <div className="flex flex-col gap-4 border-t pt-4 mt-4 border-green-600">
              <label>
                Pergunta 2
                <input
                  type="text"
                  {...register("pergunta2")}
                  className="border p-2 rounded-md w-full focus:outline-green-600 mt-1"
                  placeholder="Digite a segunda pergunta"
                />
                {errors.pergunta2 && (
                  <p className="text-red-500 text-sm">{errors.pergunta2.message}</p>
                )}
              </label>

              <label>
                Resposta 2
                <input
                  type="text"
                  {...register("resposta2")}
                  className="border p-2 rounded-md w-full focus:outline-green-600 mt-1"
                  placeholder="Digite a resposta da segunda pergunta"
                />
                {errors.resposta2 && (
                  <p className="text-red-500 text-sm">{errors.resposta2.message}</p>
                )}
              </label>
            </div>
          </div>

          {/* SENHAS */}
          <div className="bg-white p-10 rounded-lg shadow-lg ">
            <div className="flex flex-col gap-4 ">
              <label>
                Nova senha
                <input
                  type="password"
                  {...register("novaSenha")}
                  className="border p-2 rounded-md w-full focus:outline-green-600 mt-1"
                  placeholder="Digite a nova senha"
                />
                {errors.novaSenha && (
                  <p className="text-red-500 text-sm">{errors.novaSenha.message}</p>
                )}
              </label>

              <label>
                Confirmar nova senha
                <input
                  type="password"
                  {...register("confirmarSenha")}
                  className="border p-2 rounded-md w-full focus:outline-green-600 mt-1"
                  placeholder="Confirme a nova senha"
                />
                {errors.confirmarSenha && (
                  <p className="text-red-500 text-sm">{errors.confirmarSenha.message}</p>
                )}
              </label>
            </div>
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {mutation.isPending ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}