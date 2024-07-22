"use client";

import React, { useState } from "react"
import { useAppContext } from "../../context/context";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"
import { useRouter } from 'next/router';


export default function ProposalAdd({ space }) {

    const { createProposal, setRefresh } = useAppContext();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [options, setOptions] = useState(Array(5).fill(''));
    const [deadline, setDeadline] = useState();
    const [error, setError] = useState('');

    const handleOptionChange = (value, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const saveProposal = async () => {

        setError('');
        const currentTimestamp = new Date().getTime() / 1000;
        const durationInSeconds = parseInt(deadline) * 24 * 60 * 60;

        if (!durationInSeconds || durationInSeconds < 1) {
            setError('La durée du vote doit être d\'au moins 1 jour');
            return false;
        }

        let d = parseInt(currentTimestamp + durationInSeconds);
        const filteredOptions = options.filter(option => option !== null && option !== undefined && option !== '');

        const errorMessage = await createProposal(title, desc, filteredOptions, d, space);
        setError(errorMessage);
        if (errorMessage === '') {
            router.reload();
        }
    }

    return (
        <Card className="w-[500px]">
            <CustomCardHeader title={"Créez un vote"} description={''}></CustomCardHeader>

            <CardContent>
                <h3 className="text-red-600 mb-2">{error}</h3>
                <form  >
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Titre du vote</Label>
                            <Input id="name" placeholder="Saisissez ici le titre du vote" onChange={(e) => setTitle(e.target.value)} tabIndex="0" />
                            {/* {errors.name && <span> ... is required</span>} */}

                            <Label htmlFor="desc">Description du vote</Label>
                            <Input id="desc" placeholder="Saisissez ici les informations sur le vote" onChange={(e) => setDesc(e.target.value)} tabIndex="1" />
                            {/* {errors.name && <span> ... required</span>} */}

                            <Label htmlFor="deadline" >Durée du vote (en jours)</Label>
                            <Input id="deadline" placeholder="" onChange={(e) => setDeadline(e.target.value)} tabIndex="2" />
                            {/* {errors.name && <span> ... required</span>} */}
                            {options.map((option, i) => (
                                <div key={i}>
                                    <Label htmlFor={`option-${i}`} className="my-2">Option {i + 1}</Label>
                                    <Input
                                        id={`option-${i}`}
                                        // placeholder={`Option ${i + 1}`}
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
