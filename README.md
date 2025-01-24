# ReliefChain - Decentralized Relief Center Management

ReliefChain is a Move-based smart contract module designed for decentralized management of relief centers. This solution enables users to create, manage, and donate to relief centers using `supra_coin`, ensuring transparency, accountability, and trust in relief efforts.

## Features

### 1. **Initialization**

#### `create_management`

- **Purpose**: Initializes the ReliefChain system for an account.
- **Details**:
  - Ensures the system is not already initialized.
  - Sets up resources for managing relief centers, donation records, and events.

### 2. **Relief Center Management**

#### Add a Relief Center

- **Function**: `add_center`
- **Purpose**: Adds a new relief center.
- **Parameters**:
  - `name`: Name of the relief center.
  - `imageUrl`: URL of the center’s image.
  - `location`: Specific address of the center.
  - `city`: City where the center is located.
  - `state`: State where the center is located.
- **Features**: Automatically assigns a unique ID and marks the center as active.

#### Update Relief Center Details

- **Function**: `update_center`
- **Purpose**: Updates details of an existing relief center.
- **Parameters**:
  - `center_id`: Unique ID of the center.
  - New details (e.g., `name`, `location`, `city`, `state`, `imageUrl`).

#### Deactivate a Relief Center

- **Function**: `deactivate_center`
- **Purpose**: Marks a relief center as inactive, preventing further donations.
- **Parameters**:
  - `center_id`: Unique ID of the center.

### 3. **Donations**

#### Donate to a Relief Center

- **Function**: `donate_to_center`
- **Purpose**: Facilitates donations to a specific relief center.
- **Parameters**:
  - `center_id`: Unique ID of the center.
  - `amount`: Amount to donate in `supra_coin`.
- **Features**:
  - Validates the existence and active status of the center.
  - Ensures sufficient balance before transferring the donation amount.

### 4. **Viewing Details**

#### View Relief Center Details

- **Function**: `view_center`
- **Purpose**: Retrieves details of a specific relief center.
- **Parameters**:
  - `owner`: Address of the relief center owner.
  - `center_id`: Unique ID of the center.

#### View Account Balance

- **Function**: `view_balance`
- **Purpose**: Retrieves the balance of an account in `supra_coin`.
- **Parameters**:
  - `address`: Address of the account.

## Data Structures

### ReliefCenterManagement

- **Purpose**: Manages relief centers and donations.
- **Fields**:
  - `centers`: Table mapping center IDs to `ReliefCenter` records.
  - `add_center_event`: Event handle for new centers.
  - `donation_event`: Event handle for donations.
  - `center_counter`: Counter for assigning unique center IDs.
  - `donations`: Table mapping center IDs to `DonationRecord` records.

### ReliefCenter

- **Purpose**: Represents a relief center.
- **Fields**:
  - `center_id`: Unique ID of the center.
  - `address`: Address of the owner.
  - `name`: Name of the center.
  - `imageUrl`: URL of the center’s image.
  - `location`: Specific address of the center.
  - `city`: City where the center is located.
  - `state`: State where the center is located.
  - `active`: Status of the center (active/inactive).
  - `total_donations`: Total donations received by the center.

### DonationRecord

- **Purpose**: Represents a donation.
- **Fields**:
  - `donor`: Address of the donor.
  - `amount`: Amount donated.

## Error Handling

- **Error Codes**:
  - `E_NOT_INITIALIZED (1)`: Management system not initialized.
  - `E_CENTER_NOT_FOUND (2)`: Relief center not found.
  - `E_CENTER_INACTIVE (3)`: Relief center is inactive.
  - `E_INSUFFICIENT_BALANCE (4)`: Insufficient balance to make a donation.

## Events

- **New Center Added**: Triggered when a relief center is created.
- **Donation Made**: Triggered when a donation is successfully processed.

## Usage Examples

### 1. Initialize the Management System:

```bash
supra move tool run --function-id '<exampleAddress>::relief_center_management::create_management' \
  --url https://rpc-testnet.supra.com
```

### 2. Add a Relief Center:

```bash
supra move tool run --function-id '<exampleAddress>::relief_center_management::add_center' \
  --args string:"<Center name>" string:"<Image Url>" string:"<Center location>" string:"<Center city>" string:"<Center state>" \
  --url https://rpc-testnet.supra.com
```

### 3. Donate to a Relief Center:

```bash
supra move tool run --function-id '<exampleAddress>::relief_center_management::donate_to_center' \
  --args u64:<Center Id> u64:<Amount> \
  --url https://rpc-testnet.supra.com
```

### 4. Update a Relief Center:

```bash
supra move tool run --function-id '<exampleAddress>::relief_center_management::update_center' \
  --args u64:<Center Id> string:"<Center name>" string:"<Center location>" string:"<Center City>" string:"<Center state>" string:"<ImgUrl>" \
  --url https://rpc-testnet.supra.com
```

### 5. View Center Details:

```bash
supra move tool run --function-id '<exampleAddress>::relief_center_management::view_center' \
  --args address:0xOWNER_ADDRESS u64:1 \
  --url https://rpc-testnet.supra.com
```

### 6. View Account Balance:

```bash
supra move tool run --function-id '<exampleAddress>::relief_center_management::view_balance' \
  --args address:0xACCOUNT_ADDRESS \
  --url https://rpc-testnet.supra.com
```

## Deployment Commands

### Import Key Profile:

```bash
supra key import-profile <PROFILE_NAME> <PRIVATE_KEY>
```

### Compile Smart Contract:

```bash
supra move tool compile --package-dir /supra/configs/move_workspace/relief_chain
```

### Publish Smart Contract:

```bash
supra move tool publish --package-dir /supra/configs/move_workspace/relief_chain \
  --profile <PROFILE_NAME> \
  --url https://rpc-testnet.supra.com
```

you can check this page for complete documentation on how to deploy [here](https://docs.supra.com/move/getting-started)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
