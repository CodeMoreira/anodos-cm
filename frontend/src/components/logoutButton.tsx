import { signOut } from "@/app/auth/providers";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

export default function LogoutButton({ children='Logout', ...props }: ComponentProps<typeof Button>) {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <Button {...props} type="submit">{children}</Button>
        </form>
    )
}
