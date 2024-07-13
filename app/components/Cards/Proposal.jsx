import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProposalCard() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Proposer un vote</CardTitle>
                <CardDescription>Déployez votre vote en 1 click</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nom</Label>
                            <Input id="name" placeholder="Titre du vote" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="desc">Description</Label>
                            <Input id="desc" placeholder="Description du vote" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="desc">TODO Options</Label>
                            <Input id="desc" placeholder="Options séparé par ';'" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between flex-row-reverse">
                <Button>Creer</Button>
            </CardFooter>
        </Card>
    )
}
