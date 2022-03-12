// libraries
use anchor_lang::prelude::*;
// local imports
pub mod constant;
pub mod states;
pub mod instructions;

use crate::instructions::*;

declare_id!("9MxQCa5gT3msBR23kDkXNTGb4ovKuDAufUrvWQK9c2Xx");

#[program]
pub mod ratoon {
    use super::*;

    pub fn create_merchant_vault(
        ctx: Context<CreateMerchantVault>,
    ) -> Result<()> {
        create_merchant_vault::handle(
            ctx,
        )
    }
}
