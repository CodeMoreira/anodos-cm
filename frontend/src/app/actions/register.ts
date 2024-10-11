"use server";

export default async function register(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("senha") as string;
  const confirmarSenha = formdata.get("confirmarSenha") as string;

  if (!email || !password || !confirmarSenha) {
    return { erro: "Por favor, preencha todos os campos." };
  }

  if (password !== confirmarSenha) {
    return { erro: "As senhas não coincidem." };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return {
      erro: "Ocorreu um erro ao criar a conta. Por favor, tente novamente.",
    };
  }

  return { sucesso: true };
}
