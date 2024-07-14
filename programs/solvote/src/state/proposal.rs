use anchor_lang::prelude::*;

#[account]
pub struct Proposal {
    pub space: Pubkey,
    pub name: String,
    pub description: String,
    pub options: Vec<Option>,
    pub deadline: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Option {
    pub label: String,
    pub count: u64,
}