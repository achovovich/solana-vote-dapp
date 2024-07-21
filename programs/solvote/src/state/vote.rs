use anchor_lang::prelude::*;

#[account]
pub struct Vote {
    pub proposal: Pubkey,
    pub user: Pubkey,
    pub has_voted_for: Vec<u16>,
    pub has_voted: bool,
}