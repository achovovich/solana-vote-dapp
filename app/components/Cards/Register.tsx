import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function Register() {
    return (
        <Card className="w-[900px]">
            <CardHeader>
                <CardTitle>Creer votre compte</CardTitle>
                <CardDescription>Associez votre adresse Solana à votre compte</CardDescription>
            </CardHeader>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Creation de compte</h1>
                            <p className="text-balance text-muted-foreground">
                                Inscrivez votre email et l'adresse de votre portefeuille Solana
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Adresse</Label>
                                </div>
                                <Input id="address" type="text" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Enregistrer
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block bg-black">
                    <Image
                        src="/Solana-Logo.png"
                        alt="Solana"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </Card>
    )
}
