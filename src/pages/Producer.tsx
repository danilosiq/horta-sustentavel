import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { GetEstoque } from "@/service/getEstoque";
import { GetHorta } from "@/service/getHorta";
import { PostAddEstoque } from "@/service/postAdd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Building,
  HeartHandshake,
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

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["Horta"],
    mutationFn: GetHorta,
    onSuccess: (msg) => console.log(msg),
  });
  const queryClient = useQueryClient();
  const {
    mutate: MutateGetEstoque,
    data: DataGetEstoque,
    isPending: isPendingEstoque,
  } = useMutation({
    mutationKey: ["Horta"],
    mutationFn: GetEstoque,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["Horta"] });
    },
  });

  useEffect(() => {
    if (userId) {
      MutateGetEstoque({
        id_produtor: userId,
      });
    }
  }, [userId]);

  const { mutate: MutateAddMov, reset: resetAddMov } = useMutation({
    mutationFn: PostAddEstoque,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Sua entrada foi realizada com sucesso!",
      });
      resetAddMov();
    },
    onError: (err) => {
      toast({
        title: "Erro!",
        description: `Erro: ${err}`,
      });
    },
  });

  function handleAddMov(data: AddHortaSchemaType) {
    console.log(data);
    MutateAddMov({
      token: token,
      descricao_produto: data.desc,
      dt_colheita: data.dt_colheita,
      dt_plantio: data.dt_plantio,
      motivo: data.motivo,
      nome_produto: data.name,
      quantidade: data.valor,
      unidade: data.medida,
    });
  }

  // Reset motivo quando typeMov mudar
  useEffect(() => {
    resetField("motivo");
  }, [typeMov]);

  useEffect(() => {
    mutate({ id_produtor: userId.toString() });
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const [isActive, setIsActive] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gap-10 relative flex flex-col bg-background px-10 pt-3">
      {isActive && (
        <div className=" p-3 border fixed bottom-10 right-10 border-green-500 rounded-md shadow-xl shadow-green-400  bg-green-50   flex flex-col gap-3">
          <div className="flex justify-between ">
            <p className="text-secondary text-lg font-bold">
              Esta sobrando alimentos? Doe!
            </p>
            <X
              className="text-green-900 cursor-pointer"
              onClick={() => setIsActive(false)}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-secondary w-[60%]">
              Fazendo esta ação voce evita disperdicios e ajuda o proximo! Veja
              as ONGs que recomendamos
            </p>
            <HeartHandshake size={40} className="text-white bg-red-600 p-2 rounded-full"/>
          </div>
          <Button onClick={() => navigate("/ongs")}>Ver ONGs</Button>
        </div>
      )}

      <div className="flex flex-col items-center text-3xl font-bold">
        <div className="p-3 bg-green-600 rounded-full">
          <Building className="text-white" />
        </div>
        <h1>Área do Produtor</h1>
      </div>

      {isPending ? (
        <RefreshCw className="animate-spin mx-auto text-[#247C45]" size={30} />
      ) : data?.horta ? (
        <div className="flex flex-col items-center">
          <Cardhorta data={data.horta} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <CadastrarHortaForm />
        </div>
      )}

      <div className="mx-auto w-full">
        <div className="text-green-600 text-lg flex flex-col items-center">
          <Sprout />
          <p className="font-bold">Controle de colheita</p>
        </div>
        {data?.horta &&
           (
            <Dialog>
              <DialogTrigger className="w-full flex justify-center">
                <div className="">
                  <span className="flex flex-row p-2 border-green-600 text-green-600 border items-center  rounded-md ">
                    <Plus size={20} className="" />
                    <p>Adicionar Hortaliça</p>
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit(handleAddMov)} className="w-full">
                  <div className=" gap-4 flex flex-col border rounded-sm p-3">
                    <p className="text-xl font-semibold">Adicionar Hortaliça</p>

                    <label className="flex flex-col">
                      Nome
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Batata"
                        className="p-1 border rounded-sm w-full"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </label>

                    <label className="flex flex-col">
                      Descrição da hortaliça
                      <input
                        {...register("desc")}
                        type="text"
                        placeholder="Cor vermelha"
                        className="p-1 border rounded-sm w-full"
                      />
                    </label>

                    <label className="flex flex-col">
                      Tipo da movimentação
                      <select
                        {...register("typeMov")}
                        className="border rounded-md p-2 w-full focus:outline-green-600"
                      >
                        <option value="entrada">Entrada</option>
                      </select>
                    </label>

                    <label className="flex flex-col">
                      Data do plantio
                      <input
                        {...register("dt_plantio")}
                        type="date"
                        className="p-1 border rounded-sm w-full"
                      />
                    </label>

                    <label className="flex flex-col">
                      Data da última colheita
                      <input
                        {...register("dt_colheita")}
                        type="date"
                        className="p-1 border rounded-sm w-full"
                      />
                    </label>

                    <label className="flex flex-col">
                      Valor
                      <div className="flex gap-2">
                        <input
                          {...register("valor")}
                          type="number"
                          placeholder="0"
                          className="p-1 border rounded-sm w-full"
                        />
                        <select
                          {...register("medida")}
                          className="border rounded-md p-2 w-full focus:outline-green-600"
                        >
                          <option value="kg">Kg</option>
                          <option value="unidade">Unidade</option>
                        </select>
                      </div>
                    </label>

                    <label className="flex flex-col">
                      Motivo
                      <select
                        {...register("motivo")}
                        className="border rounded-md p-2 w-full focus:outline-green-600"
                      >
                        {typeMov === "saida" ? (
                          <>
                            <option value="venda">Venda</option>
                            <option value="consumo">Consumo</option>
                            <option value="perda/disperdicio">
                              Perda/Disperdício
                            </option>
                          </>
                        ) : (
                          <>
                            <option value="colheita">Colheita</option>
                            <option value="compra">Compra</option>
                          </>
                        )}
                      </select>
                    </label>

                    <Button type="submit" className="w-full">
                      Adicionar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}

        <div className="flex gap-3 max-sm:flex-col w-full shadow-xl p-10 rounded-md">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2 flex-1 overflow-y-auto max-h-[650px]">
            {DataGetEstoque?.horta?.produtos &&
            DataGetEstoque.horta.produtos.length > 0 ? (
              DataGetEstoque.horta.produtos.map((data, i) => (
                <Dialog key={i}>
                  <DialogTrigger>
                    <div className="bg-green-500 hover:bg-green-600 transition-all justify-between flex flex-col text-white flex-shrink-0 max-h-[200px] p-2 rounded-lg">
                      <div>
                        <p className="text-xl font-semibold">
                          {data.nm_produto}
                        </p>
                        <p className="text-sm">
                          {data.ds_quantidade} {data.unidade_medida_padrao}
                        </p>
                      </div>
                      <div>
                        <p>{data.descricao}</p>
                      </div>
                      <div className="border-t mt-3 pt-3">
                        <p className="text-sm">
                          Última colheita: {data.dt_colheita}
                        </p>
                        <p className="text-sm">
                          Último plantio: {data.dt_plantio}
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="w-full">
                    <ProductDialogContent
                      product={data}
                      token={token}
                      onSuccess={() => {
                        queryClient.invalidateQueries({ queryKey: ["Horta"] });
                        MutateGetEstoque({ id_produtor: userId });
                      }}
                    />
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              <div className="text-center text-slate-500 col-span-full py-10">
                <p className="text-lg font-medium">
                  Nenhuma hortaliça cadastrada no estoque ainda 🌱 Certifique-se
                  sua horta ja foi cadastrada!
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
