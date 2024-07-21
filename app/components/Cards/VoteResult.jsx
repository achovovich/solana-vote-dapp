"use client";

import React from "react"

import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"

import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";


export default function VoteResult({ proposal }) {

    let options = proposal.options
    console.log(proposal)

    const sum = options.reduce((acc, current) => {
        const value = Number(current.count) || 0;
        return acc + value;
    }, 0);

    return (
        <Card className="w-[500px]">
            <CustomCardHeader
                title={"Résultats"}
                description={'Participations : ' + proposal.voteCount + ' utilisateurs'}>
            </CustomCardHeader>
            {proposal.voteCount > 0 ? (
                <>
                    <CardContent>
                        <h3>Ce vote a reçu un total de {Math.round(sum / 100 * 10) / 10} votes</h3>
                        <h3>Les utilisateurs ont utilisés en moyenne {Math.round(sum / proposal.voteCount * 100) / 100}% de leur voix</h3>
                        <form className="mt-5">
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">

                                    {options.map((option, i) => (

                                        <div key={i} className="">

                                            <div className="flex my-5">
                                                <AnimatedCircularProgressBar
                                                    max={sum}
                                                    min={0}
                                                    value={option.count}
                                                    gaugePrimaryColor="#6d28d9"//"rgb(79 70 229)"
                                                    gaugeSecondaryColor="#67e8f9"//"rgba(0, 0, 0, 0.1)"
                                                />
                                                <div>
                                                    <Label htmlFor={`option-${i}`} className="text-xl  border-b-2 border-cyan-600">
                                                        {option.label + ' ' + Math.round(option.count / proposal.voteCount * 100) / 100}%
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between flex-row-reverse">

                    </CardFooter>
                </>
            ) : (<div className="text-center p-4">Aucune participation</div>)}

        </Card >
    )
}
