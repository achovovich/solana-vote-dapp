use anchor_lang::prelude::*;

#[account]
pub struct Vote {
    pub proposal: Pubkey,
    pub user: Pubkey,
    pub has_voted_for: Vec<HasVotedFor>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct HasVotedFor {
    pub index: u32,
    pub ratio: u32,
}
