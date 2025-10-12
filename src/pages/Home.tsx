import heroImage from "@/assets/hero-community-garden.jpg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Globe,
  Heart,
  Leaf,
  MapPin,
  Plus,
  Sprout,
  Target,
  Users,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Plus,
      title: "Cadastrar Hortaliças",
      description: "Registre seus produtos e compartilhe com a comunidade",
      link: "/dashboard",
    },
    {
      icon: BookOpen,
      title: "Receber Receitas",
      description: "IA sugere receitas baseadas nas suas hortaliças",
      link: "/recipes",
    },
    {
      icon: MapPin,
      title: "Ver Mapa das Hortas",
      description: "Encontre hortas comunitárias próximas a você",
      link: "/map",
    },
  ];

  const impacts = [
    {
      icon: Target,
      title: "ODS 2 - Fome Zero",
      description:
        "Contribuindo para acabar com a fome e promover agricultura sustentável",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conectando produtores e consumidores locais",
    },
    {
      icon: Heart,
      title: "Impacto Social",
      description: "Fortalecendo a segurança alimentar nas comunidades",
    },
  ];

  const initialActions = [
    {
      label: "Aprenda a cultivar",
      value: "make-recipe",
      icon: Sprout,
    },
    {
      label: "Gere sua receita",
      value: "make-recipe",
      icon: Utensils,
    },
    {
      label: "Descubra as tendências de cultivo",
      value: "make-recipe",
      icon: Calendar,
    },
    {
      label: "Veja hortas perto de você",
      value: "make-recipe",
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-elegant">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Horta Comunitária
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Conectando comunidades através da agricultura sustentável
          </p>

          <div className="grid grid-cols-2 gap-4 ">
            {initialActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <div className="flex flex-col hover:text-green-300 cursor-pointer hover:bg-primary/10 hover:border-secondary ease-in-out transition-all justify-center items-center border border-white bg-white/10 p-2 rounded-lg">
                  <Icon />
                  <p>{action.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-primary mr-2" />
              <span className="text-primary font-semibold">ODS 2 - ONU</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossa Missão
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Promover a segurança alimentar e agricultura sustentável através
              de hortas comunitárias, conectando produtores locais e
              fortalecendo comunidades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <Card
                  key={index}
                  className="text-center border-none shadow-soft"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{impact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {impact.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Sprout className="w-8 h-8 text-primary mr-2" />
              <span className="text-primary font-semibold">
                Funcionalidades
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ferramenta completa para gerenciar sua horta e conectar-se com a
              comunidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-none"
                >
                  <Link to={feature.link}>
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Junte-se à Nossa Comunidade
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Faça parte do movimento de agricultura sustentável e ajude a
            construir um futuro mais verde
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8"
            >
              <Link to="/login">
                <Users className="w-5 h-5 mr-2" />
                Cadastrar-se
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Link to="/producer">
                <Leaf className="w-5 h-5 mr-2" />
                Sou Produtor
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
