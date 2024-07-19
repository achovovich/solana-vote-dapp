"use client";

import React, { useState } from "react"
import { useAppContext } from "../../context/context";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"


export default function ProposalAdd({ space }) {


    const currentTimestamp = new Date().getTime() / 1000;
    const durationInSeconds = parseInt(1) * 24 * 60 * 60;
    const d = parseInt(currentTimestamp + durationInSeconds);
    // const o = 'option1, option2, option3, option4, option5';
    // const optionsArray = o.split(',').map(option => option.trim());
    // console.log("optionsArray", optionsArray);

    const { createProposal } = useAppContext();

    const [title, setTitle] = useState('titre');
    const [desc, setDesc] = useState('desc');
    const [options, setOptions] = useState(['option1', 'option2', 'option3', 'option4', 'option5']);//useState(Array(5).fill(''));
    const [deadline, setDeadline] = useState(d);

    const handleOptionChange = (value, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const saveProposal = async () => {

        const currentTimestamp = new Date().getTime() / 1000;
        const durationInSeconds = parseInt(deadline) * 24 * 60 * 60;
        console.log(currentTimestamp, durationInSeconds)
        let d = parseInt(currentTimestamp + durationInSeconds);
        d = Number(deadline) || 0;

        let p = await createProposal(title, desc, options, d, space);
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

                            <Label htmlFor="deadline">Durée du vote (en jours)</Label>
                            <Input id="deadline" placeholder="" onChange={(e) => setDeadline(e.target.value)} tabIndex="2" />
                            {/* {errors.name && <span> ... required</span>} */}
                            {options.map((option, i) => (
                                <div key={i}>
                                    <Label htmlFor={`option-${i}`} className="my-2">Option {i + 1}</Label>
                                    <Input
                                        id={`option-${i}`}
                                        placeholder={`Option ${i + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(e.target.value, i)}
                                        tabIndex="{i+4}"
                                        className="my-2"
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
