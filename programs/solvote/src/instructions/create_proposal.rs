use anchor_lang::prelude::*;
use crate::constants::MAX_OPTIONS_VALUE;
//use crate::errors::VoteError;
use crate::state::{Option, Proposal};

pub fn create_proposal(
    ctx: Context<CreateProposal>,
    name: String,
    description: String,
    options: Vec<String>,
    deadline: u64,
) -> Result<()> {
    let proposal_account = &mut ctx.accounts.proposal;
    let space_account : AccountInfo = ctx.accounts.space.clone();

    space_account.proposal_count += 1;

   // check if the number of options are in the limit range. 
    // require!(
    //     choices.len() <= MAX_OPTIONS_VALUE,
    //     VoteError::NotManyChoices
    // );

    proposal_account.space = space_account.key;
    proposal_account.name = name;
    proposal_account.description = description;
    proposal_account.deadline = deadline;

    let mut vec_options = Vec::new();

    for option in options {
        let option = Option {
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
    pub space: Account<'info, Space>,
    #[account(
        init,
        payer = signer,
        space = 8 + 32  + 32 + 32 + (32 + 8) * MAX_OPTIONS_VALUE + 8,
        seeds = [b"proposal", space.key().as_ref(), &(space.proposal_count+1).to_le_bytes],
        bump
    )]
    pub proposal: Account<'info, Proposal>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}


/* 
    pub space: Pubkey,
    pub name: String,
    pub description: String,
    pub options: Vec<Option>,
    pub deadline: u64,
*/