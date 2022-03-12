// libraries
use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct MerchantVault {
    pub owner: Pubkey,
    pub mint: Pubkey,
    pub collateral: u64
}