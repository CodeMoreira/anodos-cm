"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation';
import register from './actions/register';

export default function Home() {
  const router = useRouter()

  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)

  const handleRegister = async (formdata: FormData) => {
    setErro('')
    setSucesso(false)

    const response = await register(formdata)

    if (response.erro) {
      setErro(response.erro)
      return
    }

    console.log('Registro bem-sucedido')
    setSucesso(true)
    setTimeout(() => {
      router.push('/auth/signin')
    }, 3000);
  }

  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>Crie sua nova conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleRegister} method='POST' className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                name="senha"
                type="password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                required
              />
            </div>
            {erro && (
              <Alert variant="destructive">
                <AlertDescription>{erro}</AlertDescription>
              </Alert>
            )}
            {sucesso && (
              <Alert>
                <AlertDescription>Registro realizado com sucesso! Redirecionando para o login...</AlertDescription>
              </Alert>
            )}
            <div className='flex gap-2'>
              <Button disabled={sucesso} type="button" onClick={() => router.push('/auth/signin')} className="w-full" variant="outline">Ir para login</Button>
              <Button disabled={sucesso} type="submit" className="w-full">Registrar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
