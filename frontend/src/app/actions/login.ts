"use server";

import { signIn } from "../auth/providers";

export default async function login(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("senha") as string;

  if (!email || !password) {
    return { erro: "Por favor, preencha todos os campos." };
  }

  try {
    await signIn("credentials", { email, password, redirect: false });
    return { sucesso: true };
  } catch (error) {
    console.error((error as Error).message);
    return {
      erro: "Login ou senha inválidos, caso o problema persista contate o administrador.",
    };
  }
}
