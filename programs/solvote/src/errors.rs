use anchor_lang::prelude::*;
#[error_code]
pub enum VoteError {
    #[msg("Proposal is closed")]
    ProposalIsOver,
    #[msg("Choice index invalid")]
    ChoiceIndexOutOfScope,
    #[msg("Already voted")]
    AlreadyVoted,
    #[msg("Vote ratio exceeded")]
    VoteRatioExceeded,
    #[msg("Too many options")]
    ProposalOptionsExceeded,

}