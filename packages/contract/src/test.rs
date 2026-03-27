#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, token, Address, Env};

fn create_token_contract(env: &Env, admin: &Address) -> (token::Client, token::StellarAssetClient) {
    let contract_address = env.register_stellar_asset_contract_v2(admin.clone());
    (
        token::Client::new(env, &contract_address.address()),
        token::StellarAssetClient::new(env, &contract_address.address()),
    )
}

#[test]
fn test_full_lifecycle() {
    let env = Env::default();
    env.mock_all_auths();

    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let admin = Address::generate(&env);

    // Create USDC token
    let (token_client, token_admin_client) = create_token_contract(&env, &admin);
    let token_addr = token_client.address.clone();

    // Mint USDC to employer
    token_admin_client.mint(&employer, &10_000_0000000); // 10,000 USDC (7 decimals)

    // Deploy contract
    let contract_id = env.register(ContratoJusto, ());
    let client = ContratoJustoClient::new(&env, &contract_id);

    // Initialize: 70% savings, 30% severance
    client.initialize(&employer, &worker, &token_addr, &70, &30);

    // Deposit 1000 USDC
    client.deposit(&employer, &1_000_0000000);

    // Check balance: 700 savings, 300 severance
    let (savings, severance, total, count) = client.get_balance();
    assert_eq!(savings, 700_0000000);
    assert_eq!(severance, 300_0000000);
    assert_eq!(total, 1_000_0000000);
    assert_eq!(count, 1);

    // Worker claims savings
    client.claim_savings(&worker);
    let (savings, severance, _, _) = client.get_balance();
    assert_eq!(savings, 0);
    assert_eq!(severance, 300_0000000);

    // Verify worker received USDC
    assert_eq!(token_client.balance(&worker), 700_0000000);

    // Employer terminates -> severance goes to worker
    client.terminate(&employer);
    let (_, severance, _, _) = client.get_balance();
    assert_eq!(severance, 0);

    // Worker now has 700 + 300 = 1000 USDC
    assert_eq!(token_client.balance(&worker), 1_000_0000000);

    // Verify contract info
    let info = client.get_info();
    assert_eq!(info.is_terminated, true);
    assert_eq!(info.deposit_count, 1);
}

#[test]
fn test_multiple_deposits() {
    let env = Env::default();
    env.mock_all_auths();

    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let admin = Address::generate(&env);

    let (token_client, token_admin_client) = create_token_contract(&env, &admin);
    let token_addr = token_client.address.clone();
    token_admin_client.mint(&employer, &50_000_0000000);

    let contract_id = env.register(ContratoJusto, ());
    let client = ContratoJustoClient::new(&env, &contract_id);

    client.initialize(&employer, &worker, &token_addr, &60, &40);

    // 3 deposits
    client.deposit(&employer, &1_000_0000000);
    client.deposit(&employer, &2_000_0000000);
    client.deposit(&employer, &500_0000000);

    let (savings, severance, total, count) = client.get_balance();
    assert_eq!(total, 3_500_0000000);
    assert_eq!(count, 3);
    assert_eq!(savings, 2_100_0000000); // 60% of 3500
    assert_eq!(severance, 1_400_0000000); // 40% of 3500
}

#[test]
#[should_panic(expected = "percentages must sum to 100")]
fn test_invalid_percentages() {
    let env = Env::default();
    env.mock_all_auths();

    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let token = Address::generate(&env);

    let contract_id = env.register(ContratoJusto, ());
    let client = ContratoJustoClient::new(&env, &contract_id);

    client.initialize(&employer, &worker, &token, &50, &60); // 110% = panic
}

#[test]
fn test_claim_savings_after_termination() {
    let env = Env::default();
    env.mock_all_auths();

    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let admin = Address::generate(&env);

    let (token_client, token_admin_client) = create_token_contract(&env, &admin);
    let token_addr = token_client.address.clone();
    token_admin_client.mint(&employer, &10_000_0000000);

    let contract_id = env.register(ContratoJusto, ());
    let client = ContratoJustoClient::new(&env, &contract_id);

    client.initialize(&employer, &worker, &token_addr, &70, &30);
    client.deposit(&employer, &1_000_0000000);

    // Terminate: severance (300) auto-released to worker
    client.terminate(&employer);

    // Worker can STILL claim savings after termination (savings belong to worker always)
    client.claim_savings(&worker);

    // Verify: savings claimed, worker has both severance (300) + savings (700) = 1000
    let (savings, severance, _, _) = client.get_balance();
    assert_eq!(savings, 0);
    assert_eq!(severance, 0);
    assert_eq!(token_client.balance(&worker), 1_000_0000000);
}

#[test]
#[should_panic(expected = "amount must be positive")]
fn test_deposit_zero_amount() {
    let env = Env::default();
    env.mock_all_auths();

    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let admin = Address::generate(&env);

    let (token_client, token_admin_client) = create_token_contract(&env, &admin);
    let token_addr = token_client.address.clone();
    token_admin_client.mint(&employer, &10_000_0000000);

    let contract_id = env.register(ContratoJusto, ());
    let client = ContratoJustoClient::new(&env, &contract_id);

    client.initialize(&employer, &worker, &token_addr, &70, &30);
    client.deposit(&employer, &0); // zero amount = panic
}

#[test]
#[should_panic(expected = "contract is terminated")]
fn test_deposit_after_termination() {
    let env = Env::default();
    env.mock_all_auths();

    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let admin = Address::generate(&env);

    let (token_client, token_admin_client) = create_token_contract(&env, &admin);
    let token_addr = token_client.address.clone();
    token_admin_client.mint(&employer, &10_000_0000000);

    let contract_id = env.register(ContratoJusto, ());
    let client = ContratoJustoClient::new(&env, &contract_id);

    client.initialize(&employer, &worker, &token_addr, &70, &30);
    client.terminate(&employer);

    // This should panic - can't deposit after termination
    client.deposit(&employer, &1_000_0000000);
}

#[test]
#[should_panic(expected = "already terminated")]
fn test_terminate_twice() {
    let env = Env::default();
    env.mock_all_auths();

    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let admin = Address::generate(&env);

    let (token_client, token_admin_client) = create_token_contract(&env, &admin);
    let token_addr = token_client.address.clone();
    token_admin_client.mint(&employer, &10_000_0000000);

    let contract_id = env.register(ContratoJusto, ());
    let client = ContratoJustoClient::new(&env, &contract_id);

    client.initialize(&employer, &worker, &token_addr, &70, &30);
    client.terminate(&employer);
    client.terminate(&employer); // second terminate = panic
}

#[test]
#[should_panic(expected = "no savings to claim")]
fn test_claim_savings_empty() {
    let env = Env::default();
    env.mock_all_auths();

    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let admin = Address::generate(&env);

    let (_, token_admin_client) = create_token_contract(&env, &admin);
    let token_addr = token_admin_client.address.clone();

    let contract_id = env.register(ContratoJusto, ());
    let client = ContratoJustoClient::new(&env, &contract_id);

    client.initialize(&employer, &worker, &token_addr, &70, &30);
    // No deposit, try to claim = panic
    client.claim_savings(&worker);
}
