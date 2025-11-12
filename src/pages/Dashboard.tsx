import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from "recharts";

const Dashboard = () => {
  const chartData = [
    { month: "Jan", entrada: 10, saida: 2 },
    { month: "Fev", entrada: 15, saida: 10 },
    { month: "Mar", entrada: 7, saida: 12 },
    { month: "Abr", entrada: 24, saida: 19 },
    { month: "Mai", entrada: 10, saida: 13 },
    { month: "Jun", entrada: 24, saida: 14 },
    { month: "Jul", entrada: 14, saida: 4 },
    { month: "Ago", entrada: 12, saida: 34 },
    { month: "Set", entrada: 6, saida: 14 },
    { month: "Out", entrada: 7, saida: 9 },
    { month: "Nov", entrada: 19, saida: 12 },
    { month: "Dez", entrada: 8, saida: 4 },
  ];

  // Gráfico de pizza
  const chartDataPie = [
    { name: "Entradas", value: 100, fill: "#4ade80" },
    { name: "Saídas", value: 30, fill: "#f87171" },
  ];

  const chartConfig = {
    entrada: { label: "Entradas", color: "#4ade80" },
    saida: { label: "Saídas", color: "#f87171" },
  };

  // Mock para hortaliças com quantidades cultivadas
  const listMock = [
    { name: "Tomate", quantidade: 120 },
    { name: "Alface", quantidade: 95 },
    { name: "Cenoura", quantidade: 80 },
    { name: "Rúcula", quantidade: 70 },
    { name: "Espinafre", quantidade: 65 },
    { name: "Coentro", quantidade: 55 },
    { name: "Salsa", quantidade: 45 },
    { name: "Cebolinha", quantidade: 40 },
    { name: "Pepino", quantidade: 38 },
    { name: "Pimentão", quantidade: 35 },
  ];

  const chartConfigHortalicas: ChartConfig = {
    quantidade: {
      label: "Quantidade",
      color: "#22c55e",
    },
  };

  return (
    <div className="min-h-screen bg-green-50 p-10 flex flex-col gap-10">
      <div className="shadow-xl bg-white p-6 max-w-[600px] mx-auto rounded-md text-center">
        <p className="text-lg font-bold">Bem-vindo ao Dashboard!</p>
        <p className="text-sm text-slate-500">
          Aqui você pode visualizar seus resultados em gráficos.
        </p>
        <p className="text-red-600 font-bold">ALERTA: ISSO É APENAS UM PROTÓTIPO, COMO IDEIA FUTURA DE INTEGRAÇÃO</p>
      </div>

      <div className="flex max-sm:flex-col gap-5 ">
        {/* 📊 Gráfico de barras principal */}
        <div className="shadow-xl w-full bg-white p-6 max-w-[600px] mx-auto rounded-md">
          <p className="text-center text-lg font-semibold">
            Entradas e saídas ao longo do ano
          </p>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="entrada" fill="#4ade80" radius={4} />
              <Bar dataKey="saida" fill="#f87171" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>

        {/* 🥧 Gráfico de pizza */}
        <div className="shadow-xl bg-white p-6 w-full max-w-[600px] mx-auto rounded-md">
          <p className="text-center text-lg font-semibold">
            Entradas e saídas no ano
          </p>

          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartDataPie}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                label
              />
            </PieChart>
          </ChartContainer>
          <div className="mt-4 flex gap-3 flex-row items-center pt-4 border-t border-green-500">
            <p>Info:</p>
            <div className="flex items-center gap-1">
              <div className="bg-green-500 w-3 h-3 rounded-full" />
              <p>Entradas</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-red-500 w-3 h-3 rounded-full" />
              <p>Saídas</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📈 Hortaliças com gráfico lateral */}
      <div className="flex max-sm:flex-col items-center gap-3">
        <div className="shadow-xl rounded-md bg-green-600 text-center text-white p-10">
          <p className="text-sm">Você gerou no total</p>
          <p className="text-2xl font-bold">14</p>
          <p>Receitas!</p>
        </div>

        <div className="shadow-xl bg-white p-6 w-full rounded-md">
          <p className="text-lg font-semibold text-center">
            Top 10 Hortaliças que você mais cultivou!
          </p>

          <ChartContainer config={chartConfigHortalicas} className="min-h-[300px] w-full">
            <BarChart
              layout="vertical"
              data={listMock}
              margin={{ left: 80, right: 20, top: 20, bottom: 20 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis type="number" />
              <YAxis
                dataKey="name"
                type="category"
                width={80}
                tick={{ fill: "#374151", fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="quantidade" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;