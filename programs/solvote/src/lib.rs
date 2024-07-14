use anchor_lang::prelude::*;

declare_id!("G2QUq2BW1CJ8UDxm7RGQ9CWYNEJtTrPcL1gtNshgcmzv");

//pub mod constants;
//pub mod errors;
pub mod instructions;
pub mod state;

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

}
