import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Logo() {
    return (
        <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" />
            <AvatarFallback>SV</AvatarFallback>
        </Avatar>
    )
}

export default Logo