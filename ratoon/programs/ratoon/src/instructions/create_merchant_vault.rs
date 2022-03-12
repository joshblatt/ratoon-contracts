// libraries
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token};
// local
use crate::{
    states::merchant_vault::MerchantVault,
    constant::*,
};

pub fn handle(
    ctx: Context<CreateMerchantVault>
) -> Result<()> {
    ctx.accounts.merchant_vault.owner = ctx.accounts.authority.key();
    ctx.accounts.merchant_vault.mint = ctx.accounts.mint.key();
    ctx.accounts.merchant_vault.collateral = 0;

    Ok(())
}

#[derive(Accounts)]
pub struct CreateMerchantVault<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [MERCHANT_VAULT_TAG.as_ref()],
        bump,
        payer = authority,
    )]
    pub merchant_vault: Box<Account<'info, MerchantVault>>,

    pub mint: Box<Account<'info, Mint>>,

    //#account[(address = token::ID)]
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}