import React, { useState } from "react"
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"
import { Textarea } from "@/components/ui/textarea"

import { z } from "zod"

export default function SpaceAdd() {

    const { handleSubmit, register, errors } = useForm();
    const onSubmit2 = (data) => {
        console.log(`input value: ${data.name}`);
        console.table(data);
    }

    return (
        <Card className="w-[500px]">
            <CustomCardHeader title={"Créez un espace de vote"} description={''}></CustomCardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit2)} >
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nom de l'espace</Label>
                            <Input id="name" placeholder="Titre l'espace de vote" ref={register()} />
                            {/* {errors.name && <span>The email is required</span>} */}
                        </div>
                        <Label htmlFor="whitelist">Adresses authorisées à voter:</Label>
                        <Textarea placeholder="1 adresse par ligne" id="whitelist" />
                    </div>
                    <div className="flex justify-between flex-row-reverse mt-4">
                        <Button type="submit">Creer</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
