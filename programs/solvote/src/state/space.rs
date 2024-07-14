use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct CommunitySpace {
    #[max_len(25)]
    pub name: String,
    pub propol_count: u32,
    pub users_count: u32,
}
