use anchor_lang::prelude::*;

#[account]
pub struct App {
    pub space_count: u32,
}