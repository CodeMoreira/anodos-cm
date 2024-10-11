import { auth } from "@/app/auth/providers"
import LogoutButton from "@/components/logoutButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { LogOut, MoreVertical, Plus, Search, Settings, User } from "lucide-react"

// Tipo para os dados do grupo
type Group = {
  id: number
  title: string
  description: string
  role: string
}

// Dados de exemplo
const groups: Group[] = [
  { id: 1, title: "Desenvolvimento", description: "Equipe responsável pelo desenvolvimento de software e manutenção de sistemas", role: "Desenvolvedor" },
  { id: 2, title: "Design", description: "Equipe criativa focada no design de interfaces e experiência do usuário", role: "Designer" },
  { id: 3, title: "Marketing", description: "Equipe encarregada das estratégias de marketing digital e branding", role: "Analista de Marketing" },
]

export default async function Groups() {
  const session = await auth()
  console.log(session)

  const response = await fetch(`${process.env.BACKEND_URL}/contacts/all?page=1&limit=100`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })

  const data = await response.json()
  console.log(data)

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xl font-bold">Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton variant="ghost">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </LogoutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <div className="p-4 bg-muted">
        <div className="flex items-center space-x-2 max-w-md mx-auto">
          <Input type="search" placeholder="Buscar grupos..." className="flex-grow" />
          <Button variant="secondary">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>

      <main className="flex-grow p-6 bg-background">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Grupos</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Criar Grupo
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id} className="relative">
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
                <CardDescription>{group.role}</CardDescription>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Visualizar</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Deletar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}