use anchor_lang::prelude::*;

use crate::constants::{BASE_RATIO_VOTE, MAX_PROPOSAL_OPTIONS};
use crate::errors::VoteError;
use crate::state::{Proposal, Vote};

pub fn cast_vote(ctx: Context<CastVote>, options: Vec<u16>) -> Result<()> {
    let vote_account = &mut ctx.accounts.vote;
    let proposal_account = &mut ctx.accounts.proposal;

    //check if the user has already voted for this proposal
    require!(!vote_account.has_voted, VoteError::AlreadyVoted,);

    //check if proposal is still open to vote
    require!(
        Clock::get()?.unix_timestamp < proposal_account.deadline as i64,
        VoteError::ProposalIsOver
    );

    let mut total_ratio_count: u16 = 0;
    let mut vec_options: Vec<u16> = Vec::new();

    for (index, value) in options.iter().enumerate() {
        //check if the option index is valid
        require!(
            index <= proposal_account.options.len(),
            VoteError::ChoiceIndexOutOfScope,
        );

        //check if there is no overflow of vote ratio
        require!(
            total_ratio_count + value <= BASE_RATIO_VOTE,
            VoteError::VoteRatioExceeded,
        );

        total_ratio_count += value;

        vec_options.push(*value);
        proposal_account.options[index as usize].count += *value as u32;
    }

    vote_account.proposal = proposal_account.key();
    vote_account.user = ctx.accounts.signer.key();
    vote_account.has_voted_for = vec_options;
    vote_account.has_voted = true;
    proposal_account.vote_count += 1;

    Ok(())
}

#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    #[account(init, payer = signer, space = 8 + 32 + 32 + (4 + 1 + 2 * MAX_PROPOSAL_OPTIONS) + 1, seeds = [b"vote".as_ref(),proposal.key().as_ref(), signer.key().as_ref()], bump)]
    pub vote: Account<'info, Vote>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
