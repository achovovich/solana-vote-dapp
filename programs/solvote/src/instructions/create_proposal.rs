use anchor_lang::prelude::*;
use crate::constants::MAX_PROPOSAL_OPTIONS;
use crate::errors::VoteError;

use crate::state::{CommunitySpace, Proposal, VoteOption};

pub fn create_proposal(
    ctx: Context<CreateProposal>,
    space_key: Pubkey,
    title: String,
    description: String,
    options: Vec<String>,
    deadline: u64,
) -> Result<()> {
    let proposal_account = &mut ctx.accounts.proposal;
    let space_account: &mut Account<CommunitySpace> = &mut ctx.accounts.community_space;

    space_account.proposal_count += 1;

    // check if the number of options are in the limit range.
    require!(
        options.len() <= MAX_PROPOSAL_OPTIONS,
        VoteError::ProposalOptionsExceeded
    );

    proposal_account.space_key = space_key;
    proposal_account.title = title;
    proposal_account.description = description;
    proposal_account.deadline = deadline;
    proposal_account.vote_count = 0;

    let mut vec_options = Vec::new();

    for option in options {
        let option = VoteOption {
            label: option,
            count: 0,
        };

        vec_options.push(option);
    }

    proposal_account.options = vec_options;

    Ok(())
}

#[derive(Accounts)]
pub struct CreateProposal<'info> {
    #[account(mut)]
    pub community_space: Account<'info, CommunitySpace>,
    #[account(
        init,
        payer = signer,
        space = 8 + 32  + 32 + 32 + 4 + (32 + 4) * MAX_PROPOSAL_OPTIONS + 8 + 4,
        seeds = [b"proposal".as_ref(), &(community_space.proposal_count+1).to_le_bytes()],
        bump
    )]
    pub proposal: Account<'info, Proposal>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
