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

export default function VoteAdd({ proposal }) {

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

    const HasVotedForLayout = struct([
        u8('index'),
        u16('ratio'),
    ]);

    const serializeOptions = (options) => {
        let o = []

        const bufferSize = options.length * HasVotedForLayout.span;
        let buffer = Buffer.alloc(bufferSize);
        let offset = 0;
        let v;


        // Sérialisation de chaque option
        const bufferHasVotedFor = Buffer.alloc(HasVotedForLayout.span);
        options.forEach(option => {
            // HasVotedForLayout.encode(option, buffer, offset);
            HasVotedForLayout.encode(option, buffer);
            offset += HasVotedForLayout.span;
            // v = HasVotedForLayout.fromArray(option);
            console.log('HasVotedForLayout', HasVotedForLayout)
            o.push(HasVotedForLayout)

        });
        return o;
        return buffer;
    }

    const saveVote = async () => {
        console.log('total', totalVote)
        if (totalVote > 100) {
            setError('votre participation doit etre de 100%')
            return
        }

        const structuredVotes = vote.map((value, index) => {
            if (value !== '') {
                return { index, ratio: parseInt(value, 10) };
            }
            return null;
        })
            .filter(vote => vote !== null);

        const serializedOptions = serializeOptions(structuredVotes);

        console.log('options : ', structuredVotes)
        console.log('serializedOptions : ', serializedOptions)
        let v = await createVote(serializedOptions, proposal.publicKey);
    }

    return (
        <Card className="w-[500px]">
            <CustomCardHeader
                title={"Repartissez votre vote sur les options suivantes"}
                description={'Vous ne pouvez pas dépasser un total de 100%'}>
            </CustomCardHeader>

            <CardContent>
                <span className={progressColor}>{error}</span>
                <h3>Progression de votre participation</h3>
                <Progress value={progressValue} className="bg-cyan-200" />
                <form  >
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">

                            {options.map((option, i) => (
                                <div key={i}>
                                    <Label htmlFor={`option-${i}`} className="my-2">{option.label}</Label>
                                    <Input
                                        id={`option-${i}`}
                                        placeholder='Saisissez la part de votre vote en %'
                                        value={vote[i]}
                                        onChange={(e) => handleVoteChange(e.target.value, i)}
                                        tabIndex="{i + 4}"
                                        className="my-2"
                                    />
                                </div>
                            ))}

                        </div>

                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between flex-row-reverse">
                <Button onClick={saveVote}>Voter</Button>
            </CardFooter>

        </Card>
    )
}
