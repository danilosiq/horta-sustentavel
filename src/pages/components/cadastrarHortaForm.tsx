import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { PostCreateHorta } from "@/service/PostCreateHorta";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Sprout } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// --- 🧠 Schema de validação com Zod ---
const hortaSchema = z.object({
  nome_horta: z
    .string()
    .min(3, "O nome da horta deve ter pelo menos 3 caracteres."),
  descricao: z.string().min(1, "Preencha esse campo"),
  cnpj: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{14}$/.test(val), {
      message: "O CNPJ deve conter exatamente 14 números.",
    }),
  rua: z.string().min(3, "Informe a rua."),
  bairro: z.string().min(3, "Informe o bairro."),
  cep: z.string().regex(/^\d{8}$/, "O CEP deve conter exatamente 8 números."),
  cidade: z.string().min(2, "Informe a cidade."),
  estado: z.string().min(2, "Informe o estado."),
  pais: z.string().min(2, "Informe o país."),
  visibilidade: z.coerce.number().default(1),
});

// --- 🧩 Tipagem inferida ---
export type HortaFormData = z.infer<typeof hortaSchema>;

// --- 🌿 Componente principal ---
export function CadastrarHortaForm() {
  const { toast } = useToast();
  const { userId } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<HortaFormData>({
    resolver: zodResolver(hortaSchema),
    defaultValues: {
      visibilidade: 1,
    },
  });

  const { mutate } = useMutation({
    mutationFn: PostCreateHorta,
    onSuccess: (msg) => {
      toast({
        title: "Sucesso!",
        description: "Horta criada com sucesso!",
      });
      console.log(msg);

      //   reset();
    },
  });

  const onSubmit = async (data: HortaFormData) => {
    console.log("✅ Dados enviados:", data);
    mutate({
      id_produtor: userId,
      bairro: data.bairro,
      cep: data.cep,
      cidade: data.cidade,
      cnpj: data.cnpj === "" && null,
      descricao: data.descricao,
      estado: data.estado,
      nome_horta: data.nome_horta,
      pais: data.pais,
      rua: data.rua,
      visibilidade: data.visibilidade,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border flex flex-col gap-4 rounded-md p-6 w-full max-w-3xl mx-auto bg-white shadow-sm"
    >
      <div className="flex flex-col items-center text-center">
        <Sprout className="text-green-600 w-10 h-10 mb-2" />
        <p className="font-semibold text-xl">Cadastrar Horta</p>
        <p className="text-sm text-slate-500">
          Preencha os campos abaixo para registrar sua horta e vincular ao seu
          produtor.
        </p>
      </div>

      {/* --- Layout Responsivo em 2 colunas --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nome da Horta */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Nome da Horta *</label>
          <input
            type="text"
            {...register("nome_horta")}
            placeholder="Ex: Horta Verde Vida"
            className="border rounded-md p-2 w-full focus:outline-green-600"
          />
          {errors.nome_horta && (
            <p className="text-red-500 text-sm">{errors.nome_horta.message}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Descrição *</label>
          <textarea
            {...register("descricao")}
            placeholder="Fale um pouco sobre sua horta..."
            className="border rounded-md p-2 w-full focus:outline-green-600 h-24 resize-none"
          />
          {errors.descricao && (
            <p className="text-red-500 text-sm">{errors.descricao.message}</p>
          )}
        </div>

        {/* CNPJ */}
        <div>
          <label className="text-sm font-medium">CNPJ (opcional)</label>
          <input
            type="text"
            {...register("cnpj")}
            placeholder="Apenas números"
            className="border rounded-md p-2 w-full focus:outline-green-600"
          />
          {errors.cnpj && (
            <p className="text-red-500 text-sm">{errors.cnpj.message}</p>
          )}
        </div>

        {/* Rua */}
        <div>
          <label className="text-sm font-medium">Rua *</label>
          <input
            type="text"
            {...register("rua")}
            placeholder="Ex: Rua das Palmeiras"
            className="border rounded-md p-2 w-full focus:outline-green-600"
          />
          {errors.rua && (
            <p className="text-red-500 text-sm">{errors.rua.message}</p>
          )}
        </div>

        {/* Bairro */}
        <div>
          <label className="text-sm font-medium">Bairro *</label>
          <input
            type="text"
            {...register("bairro")}
            placeholder="Ex: Jardim Primavera"
            className="border rounded-md p-2 w-full focus:outline-green-600"
          />
          {errors.bairro && (
            <p className="text-red-500 text-sm">{errors.bairro.message}</p>
          )}
        </div>

        {/* CEP */}
        <div>
          <label className="text-sm font-medium">CEP *</label>
          <input
            type="text"
            {...register("cep")}
            placeholder="Ex: 13050000"
            className="border rounded-md p-2 w-full focus:outline-green-600"
          />
          {errors.cep && (
            <p className="text-red-500 text-sm">{errors.cep.message}</p>
          )}
        </div>

        {/* Cidade */}
        <div>
          <label className="text-sm font-medium">Cidade *</label>
          <input
            type="text"
            {...register("cidade")}
            placeholder="Ex: Campinas"
            className="border rounded-md p-2 w-full focus:outline-green-600"
          />
          {errors.cidade && (
            <p className="text-red-500 text-sm">{errors.cidade.message}</p>
          )}
        </div>

        {/* Estado */}
        <div>
          <label className="text-sm font-medium">Estado *</label>
          <input
            type="text"
            {...register("estado")}
            placeholder="Ex: SP"
            maxLength={2}
            className="border rounded-md p-2 w-full focus:outline-green-600"
          />
          {errors.estado && (
            <p className="text-red-500 text-sm">{errors.estado.message}</p>
          )}
        </div>

        {/* País */}
        <div>
          <label className="text-sm font-medium">País *</label>
          <input
            type="text"
            {...register("pais")}
            placeholder="Ex: Brasil"
            className="border rounded-md p-2 w-full focus:outline-green-600"
          />
          {errors.pais && (
            <p className="text-red-500 text-sm">{errors.pais.message}</p>
          )}
        </div>

        {/* Visibilidade */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Visibilidade</label>
          <select
            {...register("visibilidade")}
            className="border rounded-md p-2 w-full focus:outline-green-600"
          >
            <option value={1}>Pública</option>
            <option value={0}>Privada</option>
          </select>
        </div>
      </div>

      {/* Botão */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700 transition-all text-white w-full py-3 rounded-md text-lg mt-4 disabled:opacity-60"
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar Horta"}
      </button>
    </form>
  );
}
