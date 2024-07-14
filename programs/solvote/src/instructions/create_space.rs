use anchor_lang::prelude::*;

use crate::state::{App, CommunitySpace};

pub fn create_space(ctx: Context<CreateSpace>, name: String) -> Result<()> {
    let app_account = &mut ctx.accounts.app;
    app_account.space_count += 1;

    let space_account = &mut ctx.accounts.community_space;
    space_account.name = name;

    Ok(())
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateSpace<'info> {
    #[account(mut, seeds = [b"app"], bump)]
    pub app: Account<'info, App>,
    #[account(
        init, 
        payer = signer,
        space = 8 +  CommunitySpace::INIT_SPACE, 
        seeds = [b"space".as_ref(), &(app.space_count + 1).to_le_bytes()], 
        bump
        )]
    pub community_space: Account<'info, CommunitySpace>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
