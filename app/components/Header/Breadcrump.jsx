"use client";

import React, { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function LiquidBreadcrumb({ space, proposal, vote }) {

    const textColor = "text-purple-600";
    const sepColor = "text-cyan-600"

    return (
        <Breadcrumb className="my-2">
            <BreadcrumbList>
                <BreadcrumbItem >
                    <BreadcrumbLink href="/" className={textColor}>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className={sepColor} />

                <BreadcrumbItem >
                    <BreadcrumbLink href="/spaces/list" className={textColor}>Espaces</BreadcrumbLink>
                </BreadcrumbItem>
                {(space || proposal) ? (
                    <>
                        <BreadcrumbSeparator className={sepColor} />

                        <BreadcrumbItem >
                            {space ? (
                                <>
                                    {/* <BreadcrumbPage className={textColor}>{space.name}</BreadcrumbPage> */}
                                    <BreadcrumbLink href={"/spaces/" + space.publicKey} className={textColor}>{space.name}</BreadcrumbLink>
                                </>
                            ) : (
                                <BreadcrumbLink href={"/spaces/" + proposal.spaceKey.toString()} className={textColor}>Votes</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {proposal ? (
                            <>
                                <BreadcrumbSeparator className={sepColor} />

                                <BreadcrumbItem>
                                    <BreadcrumbPage className={textColor}>{proposal.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        ) : null}
                    </>
                ) : null}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

