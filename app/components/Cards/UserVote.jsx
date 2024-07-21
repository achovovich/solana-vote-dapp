"use client";

import React, { useState, useCallback, useEffect } from "react"
import { useAppContext } from "../../context/context";
import { struct, u8, u16 } from '@solana/buffer-layout';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomCardHeader from "./CardHeader"
import { Progress } from "@/components/ui/progress"

export default function UserVote({ proposal, userVote }) {

    const options = proposal.options
    const votes = userVote.hasVotedFor;
    const sum = votes.reduce((acc, current) => {
        const value = Number(current) || 0;
        return acc + value;
    }, 0);

    return (
        <Card className="w-[500px]">
            <CustomCardHeader
                title={"Vous avez déjà participé à ce vote"}
                description={'Voici vos résultats'}>
            </CustomCardHeader>

            <CardContent>
                <h3>Vous avez utilisez {sum}% de votre voix</h3>
                <Progress value="{sum}" className="bg-cyan-200 mb-6" />
                <form  >
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">

                            {options.map((option, i) => (
                                <div key={i}>
                                    <Label htmlFor={`option-${i}`} className="my-2">{option.label + ' ' + votes[i]}%</Label>
                                    <Progress value={votes[i]} className="bg-cyan-200" />
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
