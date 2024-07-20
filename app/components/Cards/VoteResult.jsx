"use client";

import React, { useState, useCallback, useEffect } from "react"
import { useAppContext } from "../../context/context";
import { struct, u8, u16 } from '@solana/buffer-layout';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"

import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";


export default function VoteResult({ proposal }) {

    let options = proposal.options

    const { createVote } = useAppContext();

    return (
        <Card className="w-[500px]">
            <CustomCardHeader
                title={"Résultats"}
                description={'Participations : 53 utilisateurs'}>
            </CustomCardHeader>

            <CardContent>

                <form  >
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">

                            {options.map((option, i) => (
                                <div key={i} className="mb-10">

                                    <Label htmlFor={`option-${i}`} className="text-l  border-b-2 border-cyan-600">{option.label + ' ' + ((i + 1) * 15)}%</Label>
                                    <div className="flex">
                                        <AnimatedCircularProgressBar
                                            max={"100"}
                                            min={0}
                                            value={(i + 1) * 15}
                                            gaugePrimaryColor="#6d28d9"//"rgb(79 70 229)"
                                            gaugeSecondaryColor="#67e8f9"//"rgba(0, 0, 0, 0.1)"
                                        />
                                        <div>
                                            Stats ...
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

        </Card>
    )
}
