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
                    <BreadcrumbLink href="/spaces/list" className={textColor}>Espaces de votes</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className={sepColor} />

                <BreadcrumbItem >
                    <BreadcrumbPage className={textColor}>Space XXX</BreadcrumbPage>
                </BreadcrumbItem>

                <BreadcrumbSeparator className={sepColor} />

                <BreadcrumbItem>
                    <BreadcrumbPage className={textColor}>Votes</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

