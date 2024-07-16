use anchor_lang::prelude::*;

declare_id!("G2QUq2BW1CJ8UDxm7RGQ9CWYNEJtTrPcL1gtNshgcmzv");

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use crate::state::HasVotedFor;

use instructions::*;

#[program]
mod solvote {
    use super::*;

    pub fn init_app(ctx: Context<CreateApp>) -> Result<()> {
        instructions::init_app(ctx)
    }

    pub fn create_space(ctx: Context<CreateSpace>, name: String) -> Result<()> {
        instructions::create_space(ctx, name)
    }

    pub fn create_proposal(
        ctx: Context<CreateProposal>,
        space_key: Pubkey,
        title: String,
        description: String,
        options: Vec<String>,
        deadline: u64,
    ) -> Result<()> {
        instructions::create_proposal(ctx, space_key, title, description, options, deadline)
    }

    pub fn cast_vote(ctx: Context<CastVote>, options: Vec<HasVotedFor>) -> Result<()> {
        instructions::cast_vote(ctx, options)
    }

}
