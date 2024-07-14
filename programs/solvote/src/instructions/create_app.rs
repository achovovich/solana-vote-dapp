use anchor_lang::prelude::*;

use crate::state::App;

pub fn init_app(ctx: Context<CreateApp>) -> Result<()> {
    ctx.accounts.app.space_count = 0;
    Ok(())
}

//check if the space for Vec<pubkey> is enought
#[derive(Accounts)]
pub struct CreateApp<'info> {
    #[account(init, payer = signer, space = 8 + 32 + 32, seeds = [b"app"], bump)]
    pub app: Account<'info, App>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
