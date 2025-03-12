"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard"
  const error = searchParams?.get("error")

  const handleSignIn = async (provider: string) => {
    setIsLoading(true)
    await signIn(provider, { callbackUrl })
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Sign in to your FrameIt account to manage your devices.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <div className="p-4 text-sm text-red-500 bg-red-50 rounded-md">
              {error === "OAuthSignin" && "Error signing in with OAuth provider."}
              {error === "OAuthCallback" && "Error during OAuth callback."}
              {error === "OAuthCreateAccount" && "Error creating OAuth account."}
              {error === "EmailCreateAccount" && "Error creating email account."}
              {error === "Callback" && "Error during callback."}
              {error === "OAuthAccountNotLinked" && "Account not linked to an OAuth provider."}
              {error === "EmailSignin" && "Error sending email sign in link."}
              {error === "CredentialsSignin" && "Invalid credentials."}
              {error === "SessionRequired" && "Please sign in to access this page."}
              {![
                "OAuthSignin",
                "OAuthCallback",
                "OAuthCreateAccount",
                "EmailCreateAccount",
                "Callback",
                "OAuthAccountNotLinked",
                "EmailSignin",
                "CredentialsSignin",
                "SessionRequired",
              ].includes(error) && "An error occurred during sign in."}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" onClick={() => handleSignIn("google")} disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <Button variant="outline" onClick={() => handleSignIn("github")} disabled={isLoading}>
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-xs text-center text-muted-foreground">
            By signing in, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

