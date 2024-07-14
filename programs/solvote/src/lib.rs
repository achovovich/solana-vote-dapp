use anchor_lang::prelude::*;

//  declare_id!("FPvAXS7DT9jbfLQtmKfMLJC7V7Jt6Lo6BoRw2xvbjYW7");
declare_id!("BUwN8oMrqe2NXeF9Yxok6j6rHyBFE16SqkiaD8o55arZ");

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

    pub fn create_space(ctx: Context<CreateSpace>,
        space_name: String,
        proposal_count: u32,   
    ) -> Result<()> {
        instructions::create_space(ctx, space_name, proposal_count)
    }

}
