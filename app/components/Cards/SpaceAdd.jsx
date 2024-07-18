"use client";

import React, { useState } from "react"
import { useAppContext } from "../../context/context";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"
import { Textarea } from "@/components/ui/textarea"
import { set } from "@project-serum/anchor/dist/cjs/utils/features";

export default function SpaceAdd({ app }) {

    const { createSpace, setRefresh } = useAppContext();

    const [spaceName, setName] = useState('');

    const saveSpace = async () => {
        
        console.group("spaceAdd");
        console.log("app", app);
        console.log("Nom du space", spaceName);

        let index = app.spaceCount;
        console.log('saveSpace', spaceName, index, app);

        let s = await createSpace(spaceName, app);
        //console.log("return", s);
        console.groupEnd("spaceAdd");
        setRefresh(true);
        //return s;
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
                        {/* <Label htmlFor="whitelist">Adresses authorisées à voter:</Label> */}
                        {/* <Textarea placeholder="1 adresse par ligne" id="whitelist" onChange={(e) => setSpaceList(e.target.value)} /> */}
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between flex-row-reverse">
                <Button onClick={saveSpace}>Creer</Button>
            </CardFooter>
        </Card>
    )
}
