use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct CommunitySpace {
    #[max_len(25)]
    pub name: String,
    pub proposal_count: u32,
    pub user_count: u32,
}