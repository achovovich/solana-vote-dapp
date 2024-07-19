"use client";

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';

function Logo() {
    return (
        <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" />
            {/* <AvatarImage src="/vox_liquida3_transparent.png" /> */}
            {/* <AvatarImage src="/vox_liquida3_mini.png" /> */}
            <AvatarFallback>SV</AvatarFallback>
        </Avatar>
    )
}

export default Logo