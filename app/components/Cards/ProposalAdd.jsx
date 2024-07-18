"use client";

import React, { useState } from "react"
import { useAppContext } from "../../context/context";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"


export default function ProposalAdd({ space }) {

    const { createSpace } = useAppContext();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [options, setOptions] = useState(Array(5).fill(''));

    const handleOptionChange = (value, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const saveProposal = async () => {

        console.log("app", app);
        console.log("titre du proposal", title);

        let index = space.proposalCount;
        console.log('save', title, desc, options, index);

        // let s = await createSpace(spaceName, app);
        // console.log("return", s);

        return s;
    }



    return (
        <Card className="w-[500px]">
            <CustomCardHeader title={"Créez un vote"} description={''}></CustomCardHeader>

            <CardContent>
                <form  > {/* onSubmit={handleSubmit(onSubmit2)} */}
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Titre du vote</Label>
                            <Input id="name" placeholder="Saisissez ici le titre du vote" onChange={(e) => setTitle(e.target.value)} tabIndex="0" />
                            {/* {errors.name && <span> ... is required</span>} */}

                            <Label htmlFor="desc">Description du vote</Label>
                            <Input id="desc" placeholder="Saisissez ici les informations sur le vote" onChange={(e) => setDesc(e.target.value)} tabIndex="1" />
                            {/* {errors.name && <span> ... required</span>} */}

                            {options.map((option, i) => (
                                <div key={i}>
                                    <Label htmlFor={`option-${i}`}>Option {i + 1}</Label>
                                    <Input
                                        id={`option-${i}`}
                                        placeholder={`Option ${i + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(e.target.value, i)}
                                        tabIndex="{i+3}"
                                    />
                                </div>
                            ))}

                        </div>
                        {/* <Label htmlFor="whitelist">Adresses authorisées à voter:</Label> */}
                        {/* <Textarea placeholder="1 adresse par ligne" id="whitelist" onChange={(e) => setSpaceList(e.target.value)} /> */}
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between flex-row-reverse">
                <Button onClick={saveProposal}>Creer</Button>
            </CardFooter>
        </Card>
    )
}
