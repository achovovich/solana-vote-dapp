use anchor_lang::prelude::*;

declare_id!("4Cd7TvNJyjF2DFuWeKrMDJWqFtzCSH7Ry2VVM8E2DyeN");

#[program]
pub mod solvote {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
