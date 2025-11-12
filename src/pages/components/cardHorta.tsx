import { useAuth } from "@/hooks/use-auth";
import { Horta } from "@/service/getHorta";
import { Eye, LogOut, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export interface CardHortaPropr {
  data: Horta;
  JustView?: boolean;
}

export function Cardhorta({ data, JustView = false }: CardHortaPropr) {
  const { logout } = useAuth();
  console.log(data);
  

  return (
    <div className="rounded-md p-4 gap-3 flex flex-col shadow-xl mx-auto w-full md:w-[60%]">
      <div className="flex items-start flex-row justify-between">
        <div>
          <p className="text-xl font-semibold">{data.nome}</p>
          <p className="min-h-[100px] w-[80%] text-slate-400">
            {data.descricao}
          </p>
        </div>

        <div className="shadow-xl p-3 text-center rounded-sm">
          <span className="flex text-sm flex-row gap-2 items-center">
            Visibilidade <Eye size={16} />
          </span>
          {data.visibilidade ? (
            <p className="text-green-500 font-bold">Público</p>
          ) : (
            <p className="text-slate-400 font-bold">Privado</p>
          )}
        </div>
      </div>

      <div className="flex justify-between flex-row border-t mt-3 pt-3">
        <div>
          <p>CNPJ</p>
          {data.cnpj ? (
            <p className="text-green-500 font-bold">Possui CNPJ</p>
          ) : (
            <p className="text-slate-400 font-bold">Não cadastrado</p>
          )}
        </div>

        <div className="text-center">
          <p>Receitas geradas</p>
          {data.receitas_geradas ? (
            <p className="text-green-500 font-bold">{data.receitas_geradas}</p>
          ) : (
            <p className="text-slate-400 font-bold">Nenhuma</p>
          )}
        </div>
      </div>

      <div className="justify-between border-t mt-3 pt-3">
        <span className="flex flex-row gap-2 items-center font-semibold">
          Endereço <MapPin size={16} />
        </span>
        <div>
          <p>
            {data.endereco.rua}, {data.endereco.bairro} - {data.endereco.cidade}
            , {data.endereco.estado}
          </p>
        </div>
      </div>

      {!JustView && (
        <div className="flex gap-3 mx-auto">
        <div
          onClick={logout}
          className="bg-red-500 w-[150px]  flex flex-row gap-2 cursor-pointer hover:bg-red-500/50 items-center justify-center rounded-md p-2 text-white"
        >
          <p>Sair</p>
          <LogOut />
        </div>

        <Link className="border border-green-500 p-3 rounded-sm text-green-500" to={'/dashboard'}>
        Dashboard
        </Link>
        </div>
      )}
    </div>
  );
}