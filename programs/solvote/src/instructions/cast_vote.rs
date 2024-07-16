use anchor_lang::prelude::*;

use crate::constants::{BASE_RATIO_VOTE, MAX_PROPOSAL_OPTIONS};
use crate::errors::VoteError;
use crate::state::{HasVotedFor, Proposal, Vote};


pub fn cast_vote(ctx: Context<CastVote>, options: Vec<HasVotedFor>) -> Result<()> {

    let proposal_account = &mut ctx.accounts.proposal;
    let vote_account: &mut Account<Vote> = &mut ctx.accounts.vote;

    //check if user has access to the community space

    //check if the user has already voted for this proposal
    require!(
        !vote_account.has_voted,
        VoteError::AlreadyVoted,
    );

    //check if proposal is still open to vote
    require!(
        Clock::get()?.unix_timestamp < proposal_account.deadline as i64,
        VoteError::ProposalIsOver
    );

    //should add calculation for delgation of votes
    let total_ratio = BASE_RATIO_VOTE;
    let mut vec_options = Vec::new();

    for option in options {
  
        //check if the option index is valid
        require!(
            option.index < proposal_account.options.len() as u8,
            VoteError::ChoiceIndexOutOfScope,
        );
        //check if there is no overflow of vote ratio
                   
        require!(
            total_ratio + option.ratio <= BASE_RATIO_VOTE,
            VoteError::VoteRatioExceeded,
        );
        
        let option = HasVotedFor {
            index: option.index,
            ratio: option.ratio,
        };

        vec_options.push(option);
    }

    //update proposal count
    for option in &vec_options {
        proposal_account.options[option.index as usize].count +=1; 
    }
  
    vote_account.proposal = proposal_account.key();
    vote_account.user = ctx.accounts.signer.key();
    vote_account.has_voted_for = vec_options;
    vote_account.has_voted = true;

    Ok(())
}

#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    #[account(init, payer = signer, space = 8 + 32 + 32 + (4 + 8 * MAX_PROPOSAL_OPTIONS), seeds = [proposal.key().as_ref(), signer.key().as_ref()], bump)]
    pub vote: Account<'info, Vote>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
