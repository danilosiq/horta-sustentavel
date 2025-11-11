import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, IdCard, Leaf, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
// REMOVIDO: import InputMask from 'react-input-mask'; // Causava erro de resolução e foi substituído por mascaramento manual

// React Hook Form & Zod Imports

import { useAuth } from "@/hooks/use-auth";
import { PostLogin } from "@/service/PostLogin";
import { PostSignIn } from "@/service/PostSignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

// --- FUNÇÕES DE MASCARAMENTO MANUAL PARA GARANTIR COMPILAÇÃO E MÁSCARA ---

// Função para mascarar CPF (999.999.999-99)
const maskCPF = (value: string): string => {
  // Limpa o valor, mantendo apenas dígitos
  const cleaned = value.replace(/\D/g, "").substring(0, 11);
  // Aplica a máscara
  const finalMasked = cleaned
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3}\.\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, "$1-$2")
    .substring(0, 14);

  return finalMasked;
};

// Função para mascarar Telefone ((99) 99999-9999)
const maskPhone = (value: string): string => {
  // Limpa o valor, mantendo apenas dígitos
  const cleaned = value.replace(/\D/g, "").substring(0, 11);

  // Aplica a máscara
  const finalMasked = cleaned
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .substring(0, 15);

  return finalMasked;
};

// --- 1. DEFINIÇÃO DO SCHEMA ZOD PARA CADASTRO ---
const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  // Valida o CPF pela string de 14 caracteres (999.999.999-99)
  cpf: z.string().length(14, "CPF inválido. Use o formato 999.999.999-99."),
  // Valida o telefone pela string de 15 caracteres ((99) 99999-9999)
  phone: z
    .string()
    .length(15, "Telefone inválido. Use o formato (99) 99999-9999."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),

  // Perguntas de Segurança
  q1: z.string().min(1, "A pergunta 1 é obrigatória."),
  a1: z.string().min(1, "A resposta 1 é obrigatória."),
  q2: z.string().min(1, "A pergunta 2 é obrigatória."),
  a2: z.string().min(1, "A resposta 2 é obrigatória."),
});

//DEFININDO SCHEMA DE AOZ PARA LOGIN
const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(1, "Preencha este campo"),
});

// Tipagem baseada no schema
type RegisterFormData = z.infer<typeof registerSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, userId } = useAuth();

  useEffect(() => {
    if (userId) {
      navigate("/producer");
    }
  }, []);

  // Estado para o Login (mantido com useState)

  // NOVO: Estado para controlar a aba ativa (login ou register)
  const [activeTab, setActiveTab] = useState("login");

  // React Hook Form para o Cadastro
  const {
    register: SignInRegister,
    handleSubmit: handleSignIn,
    control: signInControl,
    formState: { errors: signInErrors },
    reset: seretSignIn,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register: RegisterLogin,
    handleSubmit: handleSubmitLogin,
    control: loginControl,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: PostSignIn,
    onError: (err) => {
      toast({
        title: "Ops!",
        description: `Deu algo de errado: ${err.message}`,
      });
    },
    onSuccess: () => {
      seretSignIn();
      // NOVO: Alterna para a aba de login após o sucesso do cadastro
      setActiveTab("login");
      toast({
        title: "Sucesso!",
        description:
          "Seu cadastro foi efeituado com sucesso! Por favor, faça seu login.",
      });
    },
  });

  const { mutate: MutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: PostLogin,
    onError: (err) => {
      toast({
        title: "Ops!",
        description: `Deu algo de errado: ${err.message}`,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      if (data?.token && data?.id) {
        // Usa o login do AuthContext para salvar e atualizar estado global
        // login(data.token, data.id);
        login(data.id, data.token);
        toast({
          title: "Sucesso!",
          description: "Login efetuado com sucesso! 🎉",
        });
        navigate("/");
      } else {
        toast({
          title: "Erro inesperado",
          description: "Resposta inválida do servidor.",
          variant: "destructive",
        });
      }
    },
  });

  const { toast } = useToast();

  // Função de Cadastro (agora usando dados validados pelo RHF)
  const handleRegister = (data: RegisterFormData) => {
    // AQUI VOCÊ FARIA A CHAMADA À API DE CADASTRO
    console.log("Dados de Cadastro VÁLIDOS (Prontos para API):", data);

    mutate({
      email_produtor: data.email,
      nome_produtor: data.name,
      // Remove a máscara do CPF antes de enviar
      nr_cpf: (data.cpf || "").replace(/\D/g, ""),
      pergunta_1: data.q1,
      pergunta_2: data.q2,
      telefone_produtor: data.phone,
      resposta_1: data.a1,
      resposta_2: data.a2,
      senha: data.password,
    });
  };

  function handleLogin(data: LoginFormData) {
    console.log(data);

    MutateLogin({
      email: data.email,
      senha: data.password,
    });
  }

  // Função de erro do formulário (executada se a validação falhar)
  const onRegisterError = (err: any) => {
    console.error("Erros de Validação:", err);
    toast({
      title: "Erro de Cadastro",
      description: "Por favor, preencha todos os campos corretamente.",
      variant: "destructive",
    });
  };

  // Helper para exibir erros do RHF
  const ErrorMessage = ({
    fieldName,
  }: {
    fieldName: keyof RegisterFormData;
  }) => {
    return signInErrors[fieldName] ? (
      <p className="text-sm text-red-500 mt-1">
        {signInErrors[fieldName]?.message}
      </p>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Botão Voltar (Link removido por não estar no escopo da Canvas) */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Button>

        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#49DE80] to-[#2ecc71] rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Horta Comunitária
            </CardTitle>
            <CardDescription>
              Entre na sua conta ou cadastre-se para começar
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* NOVO: Controlando o valor da aba com o estado local */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>

              {/* Login Tab (Mantido com useState) */}
              <TabsContent value="login" className="space-y-4 mt-6">
                <form
                  onSubmit={handleSubmitLogin(handleLogin)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        {...RegisterLogin("email")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Sua senha"
                        className="pl-10"
                        {...RegisterLogin("password")}
                        required
                      />
                    </div>
                    <Link to={"/forgot-password"} className="text-sm mt-1 hover:underline text-green-600">
                      <p>Esqueci minha senha</p>
                    </Link>
                  </div>

                  <Button
                    disabled={isPendingLogin || !!userId}
                    type="submit"
                    className="w-full bg-[#49DE80] hover:bg-[#38c16d]"
                  >
                    Entrar
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab (Implementado com Zod + RHF) */}
              <TabsContent value="register" className="space-y-4 mt-6">
                <form
                  onSubmit={handleSignIn(handleRegister, onRegisterError)}
                  className="space-y-4"
                >
                  {/* Nome Completo */}
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Seu nome completo"
                        className="pl-10"
                        {...SignInRegister("name")}
                      />
                    </div>
                    <ErrorMessage fieldName="name" />
                  </div>

                  {/* E-mail */}
                  <div className="space-y-2">
                    <Label htmlFor="register-email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        {...SignInRegister("email")}
                      />
                    </div>
                    <ErrorMessage fieldName="email" />
                  </div>

                  {/* Telefone (AGORA USANDO INPUT PADRÃO COM MÁSCARA MANUAL) */}
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Telefone</Label>
                    <Controller
                      name="phone"
                      control={signInControl}
                      render={({ field }) => (
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id="register-phone"
                            placeholder="(99) 99999-9999"
                            // Remove qualquer caractere não numérico e aplica a máscara
                            onChange={(e) =>
                              field.onChange(maskPhone(e.target.value))
                            }
                            type="tel" // Adicionado para melhor UX
                            className="pl-10"
                          />
                        </div>
                      )}
                    />
                    <ErrorMessage fieldName="phone" />
                  </div>

                  {/* CPF (AGORA USANDO INPUT PADRÃO COM MÁSCARA MANUAL) */}
                  <div className="space-y-2">
                    <Label htmlFor="register-cpf">CPF</Label>
                    <Controller
                      name="cpf"
                      control={signInControl}
                      render={({ field }) => (
                        <div className="relative">
                          <IdCard className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            {...field}
                            id="register-cpf"
                            placeholder="CPF"
                            // Remove qualquer caractere não numérico e aplica a máscara
                            onChange={(e) =>
                              field.onChange(maskCPF(e.target.value))
                            }
                            type="text"
                            className="pl-10"
                          />
                        </div>
                      )}
                    />
                    <ErrorMessage fieldName="cpf" />
                  </div>

                  {/* Senha */}
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Crie uma senha segura"
                        className="pl-10"
                        {...SignInRegister("password")}
                      />
                    </div>
                    <ErrorMessage fieldName="password" />
                  </div>

                  {/* Perguntas de Segurança (Simples Input - Agora integrados ao RHF) */}
                  <div className="space-y-4 pt-2">
                    <Label>Perguntas de Segurança</Label>
                    <p className="text-sm text-slate-400">
                      Essas perguntas serão importantes para recuperar sua
                      senha. Crie suas próprias perguntas, responda e memorize!
                    </p>

                    <div className="gap-2 flex flex-col border-b pb-3">
                      <Input
                        type="text"
                        placeholder="Pergunta número 1"
                        {...SignInRegister("q1")}
                        className={signInErrors.q1 ? "border-red-500" : ""}
                      />
                      <Input
                        type="text"
                        placeholder="Resposta 1"
                        {...SignInRegister("a1")}
                        className={signInErrors.a1 ? "border-red-500" : ""}
                      />
                      <ErrorMessage fieldName="q1" />
                      <ErrorMessage fieldName="a1" />
                    </div>

                    <div className="gap-2 flex flex-col">
                      <Input
                        type="text"
                        placeholder="Pergunta número 2"
                        {...SignInRegister("q2")}
                        className={signInErrors.q2 ? "border-red-500" : ""}
                      />
                      <Input
                        type="text"
                        placeholder="Resposta 2"
                        {...SignInRegister("a2")}
                        className={signInErrors.a2 ? "border-red-500" : ""}
                      />
                      <ErrorMessage fieldName="q2" />
                      <ErrorMessage fieldName="a2" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || !!userId}
                    className="w-full bg-[#49DE80] hover:bg-[#38c16d]"
                  >
                    Cadastrar
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
