import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"
import { Textarea } from "@/components/ui/textarea"

export default function SpaceAdd() {

    const [spaceName, setName] = useState('');
    const [spaceList, setSpaceList] = useState('');

    const createSpace = () => {
        console.log(spaceName);
        console.log(spaceList);
    }

    return (
        <Card className="w-[500px]">
            <CustomCardHeader title={"Créez un espace de vote"} description={''}></CustomCardHeader>

            <CardContent>
                <form  > {/* onSubmit={handleSubmit(onSubmit2)} */}
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nom de l'espace</Label>
                            <Input id="name" placeholder="Titre l'espace de vote" onChange={(e) => setName(e.target.value)} />
                            {/* {errors.name && <span>The email is required</span>} */}
                        </div>
                        <Label htmlFor="whitelist">Adresses authorisées à voter:</Label>
                        <Textarea placeholder="1 adresse par ligne" id="whitelist" onChange={(e) => setSpaceList(e.target.value)} />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between flex-row-reverse">
                <Button onClick={createSpace}>Creer</Button>
            </CardFooter>
        </Card>
    )
}
