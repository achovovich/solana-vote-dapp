use anchor_lang::prelude::*;

use crate::state::CommunitySpace;

pub fn create_space(ctx: Context<CreateSpace>, name: String) -> Result<()> {
    let space_account = &mut ctx.accounts.community_space;
    space_account.name = name;
    Ok(())
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateSpace<'info> {
    #[account(
        init, 
        payer = signer,
        space = 8 +  CommunitySpace::INIT_SPACE, 
        seeds = [b"space".as_ref(), signer.key().as_ref()], 
        bump
    )]
    pub community_space: Account<'info, CommunitySpace>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}