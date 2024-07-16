use anchor_lang::prelude::*;

#[account]
pub struct Vote {
    pub proposal: Pubkey,
    pub user: Pubkey,
    pub has_voted_for: Vec<HasVotedFor>,
    pub has_voted: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct HasVotedFor {
    pub index: u8,
    pub ratio: u16,
}