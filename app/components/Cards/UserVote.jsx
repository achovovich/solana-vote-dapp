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

export default function UserVote({ proposal }) {

    let options = proposal.options

    const { createVote } = useAppContext();

    const [progressValue, setProgressValue] = useState(0);
    const [progressColor, setProgressColor] = useState();
    const [error, setError] = useState('');
    const [totalVote, setTotalVote] = useState(0);
    const [vote, setVote] = useState(Array(5).fill(''));

    const handleVoteChange = (value, index) => {
        const updatedVote = [...vote];
        updatedVote[index] = value;
        setVote(updatedVote);
    };

    useEffect(() => {
        const sum = vote.reduce((acc, current) => {
            const value = Number(current) || 0;
            return acc + value;
        }, 0);

        if (sum > 100) {
            setTotalVote(0)
            setProgressColor('text-red-600')
            setError('Votre participation est trop importante : ' + sum + '%')
            setProgressValue(100)
        } else {
            setTotalVote(sum)
            setProgressColor('')
            setProgressValue(sum)
            setError('')
        }

    }, [vote]);




    return (
        <Card className="w-[500px]">
            <CustomCardHeader
                title={"Vous avez déjà participé à ce vote"}
                description={'Voici vos résultats'}>
            </CustomCardHeader>

            <CardContent>
                <span className={progressColor}>{error}</span>
                <h3>Vous avez utilisez 80% de votre voix</h3>
                <Progress value="80" className="bg-cyan-200 mb-6" />
                <form  >
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">

                            {options.map((option, i) => (
                                <div key={i}>
                                    <Label htmlFor={`option-${i}`} className="my-2">{option.label + ' ' + (i * 10)}%</Label>
                                    <Progress value={i * 10} className="bg-cyan-200" />
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
