import Image from "@/assets/plantio.png";
import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";
export function GuideIntro() {
  return (
    <div className="flex-1 px-10 sm:justify-between pb-[90px] flex sm:flex-row">
      <div className="w-[50%] mt-10">
        <div className="flex flex-row flex-1 items-center">
          <p className="font-bold text-4xl">Guia do cultivo</p>
          <Sprout width={40} stroke="#49DE80" height={40} />
        </div>
        <div className="gap-3 pl-3 flex flex-col text-gray-800">
          <p className="italic text-gray-600 ">
            Aprenda como começar sua horta de forma simples, sustentável e
            prazerosa.
          </p>
          <p className="text-gray-700 ">
            Aqui você encontra orientações simples e práticas para transformar
            pequenos espaços em uma horta cheia de vida. Desde escolher a
            semente certa até colher os primeiros temperos fresquinhos, cada
            etapa é explicada de forma clara para que qualquer pessoa, mesmo
            sem experiência, consiga plantar com sucesso.
          </p>

          <p className="text-gray-700 ">
            Cultivar sua própria horta vai muito além de ter ingredientes sempre
            à mão. É um ato de cuidado com você e com o planeta. Quando você
            planta em casa:
          </p>

          <h3 className="text-xl font-semibold text-green-700 ">
            🌿 Benefícios de cultivar sua própria horta:
          </h3>
          <ul className="list-disc ml-5">
            <li>
              <strong>Ajuda no combate à fome:</strong> Mesmo pequenas hortas
              podem complementar a alimentação com temperos, verduras e legumes
              frescos e nutritivos.
            </li>
            <li>
              <strong>Reduz desperdícios:</strong> Você colhe apenas o que
              precisa, evitando sobras e embalagens plásticas de mercado.
            </li>
            <li>
              <strong>Contribui para o meio ambiente:</strong> Hortas caseiras
              ajudam a melhorar a qualidade do ar, atraem polinizadores e
              diminuem a pegada de carbono ligada ao transporte de alimentos.
            </li>
            <li>
              <strong>Promove bem-estar:</strong> Colocar a mão na terra é
              terapêutico, alivia o estresse e fortalece a conexão com a
              natureza.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-green-700 ">
            🌻 Cuidando da sua horta
          </h3>
          <p className="text-gray-700 ">
            Criando sua própria horta, você pode{" "}
            <strong>cadastrar ela em nosso sistema!</strong>
            Assim, terá um controle completo sobre seu cultivo e acesso a
            recomendações personalizadas.
          </p>

          <p className="text-gray-800 font-semibold ">
            Iremos recomendar a você:
          </p>
          <ul className="list-disc ml-5">
            <li>
              Como cultivar cada alimento (água, adubagem, exposição ao sol);
            </li>
            <li>A melhor época para o cultivo de acordo com sua região.</li>
          </ul>

          <h3 className="text-xl font-semibold text-green-700 ">
            🌼 Conclusão
          </h3>
          <p className="text-gray-700 ">
            A ideia é mostrar que cultivar suas próprias plantinhas é mais fácil
            (e prazeroso) do que parece. 🌱✨
          </p>
          <p className="font-semibold text-green-700 text-lg">
            Bora colocar a mão na terra e colher não só alimentos, mas também
            saúde e consciência!
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="gap-8 flex  flex-col fixed mt-[80px]">
          <img
            src={Image}
            className="  w-[400px] h-[400px] rounded-full object-cover "
          />
          <Link to="/guide-prompt">
          <div className="w-full py-3 text-xl font-semibold cursor-pointer text-secondary bg-[#49DE80]  text-center rounded-md">Começar agora!</div>
        </Link>
        
        </div>
      </div>
    </div>
  );
}
