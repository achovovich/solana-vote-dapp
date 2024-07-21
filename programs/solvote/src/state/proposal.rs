use anchor_lang::prelude::*;

#[account]
pub struct Proposal {
    pub space_key: Pubkey,
    pub title: String,
    pub description: String,
    pub options: Vec<VoteOption>,
    pub deadline: u64,
    pub vote_count: u32,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct VoteOption {
    pub label: String,
    pub count: u32,
}
