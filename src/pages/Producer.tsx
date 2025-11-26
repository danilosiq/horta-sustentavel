import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { GetEstoque } from "@/service/getEstoque";
import { GetHorta } from "@/service/getHorta";
import { PostAddEstoque } from "@/service/postAdd";
import { EditHorta } from "@/service/PostEditHorta";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building,
  HeartHandshake,
  Pencil,
  Plus,
  RefreshCw,
  Sprout,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { CadastrarHortaForm } from "./components/cadastrarHortaForm";
import { Cardhorta } from "./components/cardHorta";
import { ProductDialogContent } from "./components/ProductDialogContent";

// Schema Zod
const AddHortSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  desc: z.string().optional(),
  typeMov: z.enum(["entrada", "saida"]),
  dt_plantio: z.string(),
  dt_colheita: z.string(),
  valor: z.preprocess((val) => Number(val), z.number()),
  medida: z.enum(["kg", "unidade"]),
  motivo: z.string(),
});

type AddHortaSchemaType = z.infer<typeof AddHortSchema>;

const Producer = () => {
  const { userId, token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();

  // ============= 📦 BUSCA DE DADOS USANDO useQuery (correto) =============

  const {
    data: dataHorta,
    isFetching: isFetchingHorta,
    refetch: refetchHorta,
  } = useQuery({
    queryKey: ["Horta", userId],
    queryFn: async () => {
      if (!userId) return null;
      return await GetHorta({ id_produtor: userId.toString() });
    },
    enabled: !!userId,
  });

  const {
    data: dataEstoque,
    isFetching: isFetchingEstoque,
    refetch: refetchEstoque,
  } = useQuery({
    queryKey: ["Estoque", userId],
    queryFn: async () => {
      if (!userId) return null;
      return await GetEstoque({ id_produtor: userId });
    },
    enabled: !!userId,
  });

  // ============= 🌱 FORM DE ADIÇÃO DE HORTALIÇA =============
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<AddHortaSchemaType>({
    resolver: zodResolver(AddHortSchema),
  });

  const typeMov = watch("typeMov");

  const { mutate: mutateAddMov, reset: resetAddMov } = useMutation({
    mutationFn: PostAddEstoque,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Entrada registrada com sucesso!",
      });
      resetAddMov();
      refetchEstoque();
    },
    onError: (err) => {
      toast({
        title: "Erro!",
        description: `Erro ao adicionar: ${String(err)}`,
      });
    },
  });

  function handleAddMov(data: AddHortaSchemaType) {
    mutateAddMov({
      token,
      descricao_produto: data.desc,
      dt_colheita: data.dt_colheita,
      dt_plantio: data.dt_plantio,
      motivo: data.motivo,
      nome_produto: data.name,
      quantidade: data.valor,
      unidade: data.medida,
    });
  }

  useEffect(() => {
    resetField("motivo");
  }, [typeMov]);

  // ============= 🧱 FORM DE EDIÇÃO DE HORTA =============
  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
  } = useForm<{
    nome?: string;
    descricao?: string;
    visibilidade?: number;
  }>();

  useEffect(() => {
    if (dataHorta?.horta) {
      resetEdit({
        nome: dataHorta.horta.nome,
        descricao: dataHorta.horta.descricao,
        visibilidade: dataHorta.horta.visibilidade,
      });
    }
  }, [dataHorta?.horta, resetEdit]);

  const { mutate: mutateEditHorta, isPending: isEditing } = useMutation({
    mutationFn: (form: {
      id_horta: number;
      nome?: string;
      descricao?: string;
      visibilidade?: number;
    }) => EditHorta(form),
    onSuccess: (res) => {
      toast({
        title: "Sucesso!",
        description: "Horta atualizada com sucesso!",
      });
      refetchHorta();
    },
    onError: (err) => {
      toast({
        title: "Erro",
        description: `Erro ao atualizar horta: ${String(err)}`,
      });
    },
  });

  // ============= 🧭 RENDERIZAÇÃO PRINCIPAL =============
  if (isFetchingHorta) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen gap-10 relative flex flex-col bg-background px-10 pt-3">
      {/* BANNER DE DOAÇÃO */}
      {isActive && (
        <div className="p-3 border fixed bottom-10 right-10 border-green-500 rounded-md shadow-xl shadow-green-400 bg-green-50 flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-secondary text-lg font-bold">
              Está sobrando alimentos? Doe!
            </p>
            <X
              className="text-green-900 cursor-pointer"
              onClick={() => setIsActive(false)}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-secondary w-[60%]">
              Evite desperdícios e ajude o próximo! Veja as ONGs recomendadas.
            </p>
            <HeartHandshake
              size={40}
              className="text-white bg-red-600 p-2 rounded-full"
            />
          </div>
          <Button onClick={() => navigate("/ongs")}>Ver ONGs</Button>
        </div>
      )}

      {/* TÍTULO */}
      <div className="flex flex-col items-center text-3xl font-bold">
        <div className="p-3 bg-green-600 rounded-full">
          <Building className="text-white" />
        </div>
        <h1>Área do Produtor</h1>
      </div>

      {/* HORTA CADASTRADA */}
      {dataHorta?.horta ? (
        <div className="flex flex-col items-center gap-2">
          <Cardhorta data={dataHorta.horta} />

          <Dialog>
            <DialogTitle></DialogTitle>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 mt-2 text-green-600 border-green-600"
              >
                <Pencil size={16} />
                Editar Horta
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md w-full">
              <form
                onSubmit={handleEditSubmit((formData) => {
                  mutateEditHorta({
                    id_horta: dataHorta.horta.id_hortas,
                    ...formData,
                  });
                })}
                className="flex flex-col gap-4"
              >
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  Editar Horta
                </h2>

                <label className="flex flex-col text-sm">
                  Nome
                  <input
                    {...registerEdit("nome")}
                    placeholder="Novo nome da horta"
                    className="border p-2 rounded-md"
                  />
                </label>

                <label className="flex flex-col text-sm">
                  Descrição
                  <textarea
                    {...registerEdit("descricao")}
                    placeholder="Nova descrição"
                    className="border p-2 rounded-md"
                  />
                </label>

                <label className="flex flex-col text-sm">
                  Visibilidade
                  <select
                    {...registerEdit("visibilidade")}
                    className="border p-2 rounded-md"
                  >
                    <option value="">Selecione...</option>
                    <option value="1">Pública</option>
                    <option value="0">Privada</option>
                  </select>
                </label>

                <Button
                  type="submit"
                  className="bg-green-600 text-white w-full"
                  disabled={isEditing}
                >
                  {isEditing ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <CadastrarHortaForm />
      )}

      {/* CONTROLE DE COLHEITA */}
      <div className="mx-auto w-full mt-6">
        <div className="text-green-600 text-lg flex flex-col items-center">
          <Sprout />
          <p className="font-bold">Controle de colheita</p>
        </div>

        {dataHorta?.horta && (
          <Dialog>
                        <DialogTitle></DialogTitle>

            <DialogTrigger className="w-full flex justify-center">
              <div className="">
                <span className="flex flex-row p-2 border-green-600 text-green-600 border items-center rounded-md">
                  <Plus size={20} />
                  <p>Adicionar Hortaliça</p>
                </span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <form
                onSubmit={handleSubmit(handleAddMov)}
                className="w-full flex flex-col gap-4"
              >
                {/* ... form igual ao seu ... */}
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* LISTA DE PRODUTOS */}
        <div className="flex gap-3 max-sm:flex-col w-full shadow-xl p-10 rounded-md">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2 flex-1 overflow-y-auto max-h-[650px]">
            {dataEstoque?.horta?.produtos?.length ? (
              dataEstoque.horta.produtos.map((p, i) => (
                <Dialog key={i}>
                  <DialogTrigger>
                    <div className="bg-green-500 hover:bg-green-600 transition-all justify-between flex flex-col text-white p-2 rounded-lg">
                      <div>
                        <p className="text-xl font-semibold">
                          {p.nm_produto}
                        </p>
                        <p className="text-sm">
                          {p.ds_quantidade} {p.unidade_medida_padrao}
                        </p>
                      </div>
                      <p>{p.descricao}</p>
                      <div className="border-t mt-3 pt-3 text-sm">
                        <p>Última colheita: {p.dt_colheita}</p>
                        <p>Último plantio: {p.dt_plantio}</p>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="w-full">
                    <ProductDialogContent
                      product={p}
                      token={token}
                      onSuccess={() => {
                        refetchHorta();
                        refetchEstoque();
                      }}
                    />
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              <div className="text-center text-slate-500 col-span-full py-10">
                <p className="text-lg font-medium">
                  Nenhuma hortaliça cadastrada 🌱 Cadastre sua horta primeiro!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Producer;