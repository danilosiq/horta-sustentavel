import Image from "@/assets/calendario.png";
import { CalendarDaysIcon } from "lucide-react";
import { Link } from "react-router-dom";




export function GreenCalendarIntro() {
  return (
    <div className="flex-1 px-10 sm:justify-between pb-[90px] flex sm:flex-row">
      <div className="w-[50%] mt-10">
        <div className="flex flex-row flex-1 items-center">
          <p className="font-bold text-4xl">Calendário verde</p>
          <CalendarDaysIcon width={40} stroke="#49DE80" height={40} />
        </div>
        <div className="gap-3 pl-3 flex flex-col text-gray-800">
          <p className="italic text-gray-600 ">Cultive no Tempo Certo</p>
          <p className="text-gray-700 ">
            Saber a época ideal para plantar é um dos segredos de uma horta de
            sucesso. Cada alimento tem um ciclo de vida e precisa de condições
            específicas de temperatura, umidade e luz para crescer forte e
            saudável. Quando o cultivo é feito fora da época correta, a planta
            pode até germinar, mas dificilmente vai se desenvolver bem,
            resultando em desperdício de sementes, perda de tempo e até
            desmotivação para o cultivador.
          </p>

          <p className="text-gray-700 ">
            É por isso que criamos esta seção: aqui você encontra orientações
            atualizadas sobre o que plantar agora e nos próximos meses, de
            acordo com o clima atual da sua regiao, você terá a segurança de que
            está escolhendo alimentos que realmente vão prosperar no seu vaso,
            canteiro ou horta.
          </p>

          <h3 className="text-xl font-semibold text-green-700 ">
            Além de evitar frustrações, seguir o ritmo do plantio traz vários
            benefícios:
          </h3>
          <ul className="list-disc ml-5">
            <li>
              🌿 Mais produtividade: plantar no tempo certo aumenta as chances
              de colheitas abundantes e saborosas.
            </li>
            <li>
              💧 Uso eficiente de recursos: economiza água, adubo e espaço, pois
              você investe energia em algo que realmente vai crescer.
            </li>
            <li>
              🌍 Sustentabilidade: respeitar os ciclos naturais reduz o impacto
              ambiental e mantém o equilíbrio do solo.
            </li>
            <li>
              🍅 Variedade no prato: cada estação traz alimentos diferentes,
              permitindo uma dieta mais diversa, saudável e sazonal.
            </li>
            <li>
              ✨ Motivação constante: colher algo que você mesmo plantou na
              época certa gera satisfação e incentiva a continuar cultivando.{" "}
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-green-700 ">
            Nosso objetivo é ser o seu calendário verde de confiança, para que
            você sempre saiba:
          </h3>
          <ul className="list-disc ml-5">
            <li>➡️ O que plantar hoje, </li>
            <li>➡️ O que esperar colher futuramente</li>
            <li>➡️ E como aproveitar ao máximo cada estação do ano.</li>
          </ul>

          <p className="">
            Cultivar no tempo certo não é apenas uma técnica — é um jeito de
            estar em sintonia com a natureza e colher resultados muito melhores.
            🌱
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="gap-8 flex  flex-col fixed mt-[80px]">
          <img
            src={Image}
            className="  w-[400px] h-[400px] rounded-full object-cover "
          />
          <Link to="/green-calendar-prompt" className="w-full py-3 text-xl font-semibold cursor-pointer text-secondary bg-[#49DE80]  text-center rounded-md">
            Começar agora!
          </Link>
        </div>
      </div>
    </div>
  );
}
