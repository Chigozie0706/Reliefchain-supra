# Relief Center Management Module

This is a Move smart contract module designed for decentralized management of relief centers on a blockchain. The module allows users to create, manage, and donate to relief centers using the `supra_coin` cryptocurrency, ensuring transparency and accountability in relief efforts.

## Features

### 1. **Initialization**

- **Function**: `create_management`
- **Purpose**: Initializes the `ReliefCenterManagement` system for an account.
- Ensures that the system is not already initialized.
- Sets up resources for managing relief centers, donation records, and event tracking.

### 2. **Relief Center Management**

#### Add a Relief Center

- **Function**: `add_center`
- **Purpose**: Adds a new relief center.
- **Parameters**:
  - `name`: Name of the relief center.
  - `imageUrl`: URL for the center’s image.
  - `location`: Specific location of the center.
  - `city`: City where the center is located.
  - `state`: State where the center is located.
- Automatically assigns a unique ID and marks the center as active.

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
- Validates the existence and active status of the center and ensures sufficient balance.
- Transfers the donation amount to the center’s account.

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

- **Purpose**: Main resource managing relief centers and donations.
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
  - `imageUrl`: URL for the center’s image.
  - `location`: Specific location of the center.
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

## Usage Example

1. **Initialize the Management System**:

   ```move
   create_management(&signer);
   ```

2. **Add a Relief Center**:

   ```move
   add_center(&signer, "Center Name", "https://image.url", "123 Main St", "CityName", "StateName");
   ```

3. **Donate to a Relief Center**:

   ```move
   donate_to_center(&signer, 1, 100);
   ```

4. **View Center Details**:

   ```move
   view_center(owner_address, 1);
   ```

5. **View Account Balance**:
   ```move
   view_balance(account_address);
   ```

## License

This project is licensed under the MIT License.
