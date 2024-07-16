use anchor_lang::prelude::*;

use crate::state::{HasVotedFor, Proposal, Vote};

pub fn cast_vote(ctx: Context<CastVote>, options: Vec<HasVotedFor>) -> Result<()> {
    let proposal_account = &mut ctx.accounts.proposal;
    let vote_account: &mut Account<Vote> = &mut ctx.accounts.vote;

    vote_account.proposal = proposal_account.key();
    vote_account.user = ctx.accounts.signer.key();

    let mut vec_options = Vec::new();

    for option in options {
        let option = HasVotedFor {
            index: option.index,
            ratio: option.ratio,
        };
        vec_options.push(option);
    }

    vote_account.has_voted_for = vec_options;

    Ok(())
}

#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    #[account(init, payer = signer, space = 8 + 32 + 32 + 1 + 1, seeds = [proposal.key().as_ref(), signer.key().as_ref()], bump)]
    pub vote: Account<'info, Vote>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
