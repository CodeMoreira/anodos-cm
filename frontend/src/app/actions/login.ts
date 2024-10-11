"use server";

export default async function login(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("senha") as string;

  if (!email || !password) {
    return { erro: "Por favor, preencha todos os campos." };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return {
      erro: "Ocorreu um erro ao fazer login. Por favor, tente novamente.",
    };
  }

  return { sucesso: true };
}
