#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, log};

#[contracttype]
#[derive(Clone)]
pub struct ContractInfo {
    pub employer: Address,
    pub worker: Address,
    pub token: Address,
    pub savings_pct: u32,
    pub severance_pct: u32,
    pub savings_balance: i128,
    pub severance_balance: i128,
    pub total_deposited: i128,
    pub deposit_count: u32,
    pub is_terminated: bool,
}

#[contracttype]
enum DataKey {
    Employer,
    Worker,
    Token,
    SavingsPct,
    SeverancePct,
    SavingsBalance,
    SeveranceBalance,
    TotalDeposited,
    DepositCount,
    IsTerminated,
}

#[contract]
pub struct ContratoJusto;

#[contractimpl]
impl ContratoJusto {
    /// Initialize the labor contract with employer, worker, and split percentages.
    /// savings_pct + severance_pct must equal 100.
    pub fn initialize(
        env: Env,
        employer: Address,
        worker: Address,
        token: Address,
        savings_pct: u32,
        severance_pct: u32,
    ) {
        assert!(savings_pct + severance_pct == 100, "percentages must sum to 100");

        env.storage().instance().set(&DataKey::Employer, &employer);
        env.storage().instance().set(&DataKey::Worker, &worker);
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::SavingsPct, &savings_pct);
        env.storage().instance().set(&DataKey::SeverancePct, &severance_pct);
        env.storage().instance().set(&DataKey::SavingsBalance, &0_i128);
        env.storage().instance().set(&DataKey::SeveranceBalance, &0_i128);
        env.storage().instance().set(&DataKey::TotalDeposited, &0_i128);
        env.storage().instance().set(&DataKey::DepositCount, &0_u32);
        env.storage().instance().set(&DataKey::IsTerminated, &false);

        log!(&env, "ContratoJusto initialized: employer={}, worker={}", employer, worker);
    }

    /// Employer deposits USDC. Auto-splits into savings and severance pools.
    pub fn deposit(env: Env, from: Address, amount: i128) {
        from.require_auth();

        let employer: Address = env.storage().instance().get(&DataKey::Employer).unwrap();
        assert!(from == employer, "only employer can deposit");
        assert!(amount > 0, "amount must be positive");

        let is_terminated: bool = env.storage().instance().get(&DataKey::IsTerminated).unwrap();
        assert!(!is_terminated, "contract is terminated");

        let token_addr: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let savings_pct: u32 = env.storage().instance().get(&DataKey::SavingsPct).unwrap();
        let severance_pct: u32 = env.storage().instance().get(&DataKey::SeverancePct).unwrap();

        // Transfer USDC from employer to this contract
        let contract_addr = env.current_contract_address();
        token::Client::new(&env, &token_addr).transfer(&from, &contract_addr, &amount);

        // Split into pools
        let savings_amount = amount * (savings_pct as i128) / 100;
        let severance_amount = amount - savings_amount; // avoid rounding loss

        let mut savings: i128 = env.storage().instance().get(&DataKey::SavingsBalance).unwrap();
        let mut severance: i128 = env.storage().instance().get(&DataKey::SeveranceBalance).unwrap();
        let mut total: i128 = env.storage().instance().get(&DataKey::TotalDeposited).unwrap();
        let mut count: u32 = env.storage().instance().get(&DataKey::DepositCount).unwrap();

        savings += savings_amount;
        severance += severance_amount;
        total += amount;
        count += 1;

        env.storage().instance().set(&DataKey::SavingsBalance, &savings);
        env.storage().instance().set(&DataKey::SeveranceBalance, &severance);
        env.storage().instance().set(&DataKey::TotalDeposited, &total);
        env.storage().instance().set(&DataKey::DepositCount, &count);

        log!(&env, "Deposit: {} USDC (savings={}, severance={})", amount, savings_amount, severance_amount);
    }

    /// Worker claims accumulated savings. Works at ANY time (before or after termination).
    /// The savings belong to the worker regardless of contract status.
    pub fn claim_savings(env: Env, to: Address) {
        to.require_auth();

        let worker: Address = env.storage().instance().get(&DataKey::Worker).unwrap();
        assert!(to == worker, "only worker can claim savings");

        let savings: i128 = env.storage().instance().get(&DataKey::SavingsBalance).unwrap();
        assert!(savings > 0, "no savings to claim");

        let token_addr: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let contract_addr = env.current_contract_address();
        token::Client::new(&env, &token_addr).transfer(&contract_addr, &to, &savings);

        env.storage().instance().set(&DataKey::SavingsBalance, &0_i128);

        log!(&env, "Savings claimed: {} USDC to worker", savings);
    }

    /// Employer terminates contract. Severance is released to worker.
    pub fn terminate(env: Env, from: Address) {
        from.require_auth();

        let employer: Address = env.storage().instance().get(&DataKey::Employer).unwrap();
        assert!(from == employer, "only employer can terminate");

        let is_terminated: bool = env.storage().instance().get(&DataKey::IsTerminated).unwrap();
        assert!(!is_terminated, "already terminated");

        let severance: i128 = env.storage().instance().get(&DataKey::SeveranceBalance).unwrap();
        let worker: Address = env.storage().instance().get(&DataKey::Worker).unwrap();
        let token_addr: Address = env.storage().instance().get(&DataKey::Token).unwrap();

        if severance > 0 {
            let contract_addr = env.current_contract_address();
            token::Client::new(&env, &token_addr).transfer(&contract_addr, &worker, &severance);
            env.storage().instance().set(&DataKey::SeveranceBalance, &0_i128);
        }

        env.storage().instance().set(&DataKey::IsTerminated, &true);

        log!(&env, "Contract terminated. Severance {} USDC released to worker", severance);
    }

    /// Read current balances (view function, no auth needed).
    pub fn get_balance(env: Env) -> (i128, i128, i128, u32) {
        let savings: i128 = env.storage().instance().get(&DataKey::SavingsBalance).unwrap_or(0);
        let severance: i128 = env.storage().instance().get(&DataKey::SeveranceBalance).unwrap_or(0);
        let total: i128 = env.storage().instance().get(&DataKey::TotalDeposited).unwrap_or(0);
        let count: u32 = env.storage().instance().get(&DataKey::DepositCount).unwrap_or(0);
        (savings, severance, total, count)
    }

    /// Read full contract info (view function).
    pub fn get_info(env: Env) -> ContractInfo {
        ContractInfo {
            employer: env.storage().instance().get(&DataKey::Employer).unwrap(),
            worker: env.storage().instance().get(&DataKey::Worker).unwrap(),
            token: env.storage().instance().get(&DataKey::Token).unwrap(),
            savings_pct: env.storage().instance().get(&DataKey::SavingsPct).unwrap(),
            severance_pct: env.storage().instance().get(&DataKey::SeverancePct).unwrap(),
            savings_balance: env.storage().instance().get(&DataKey::SavingsBalance).unwrap_or(0),
            severance_balance: env.storage().instance().get(&DataKey::SeveranceBalance).unwrap_or(0),
            total_deposited: env.storage().instance().get(&DataKey::TotalDeposited).unwrap_or(0),
            deposit_count: env.storage().instance().get(&DataKey::DepositCount).unwrap_or(0),
            is_terminated: env.storage().instance().get(&DataKey::IsTerminated).unwrap_or(false),
        }
    }
}

#[cfg(test)]
mod test;
