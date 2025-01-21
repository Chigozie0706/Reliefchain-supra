module module_addr::relief_center_management { 
    use supra_framework::event;
    use std::string::String;
    use aptos_std::table::Table;
    use std::signer;
    use aptos_std::table::{Self};
    use supra_framework::account;
    use supra_framework::supra_coin;
    use supra_framework::coin;

    struct ReliefCenterManagement has key {
        centers: Table<u64, ReliefCenter>,
        add_center_event: event::EventHandle<ReliefCenter>,
        donation_event: event::EventHandle<DonationRecord>, // Add the donation_event field
        center_counter: u64,
        donations: Table<u64, DonationRecord>
    }


    struct ReliefCenter has store, drop, copy {
        center_id: u64,
        address: address,
        name: String,
        location: String,
        city: String,
        state: String,
        active: bool,
        total_donations: u64, // New: Track total donations

    }



    struct DonationRecord has store, drop {
        donor: address,
        amount: u64, // Amount donated
        timestamp: u64, // Timestamp of donation
    }

    

    // Initialize the ReliefCenterManagement system
    public entry fun create_management(account: &signer) {
        let management = ReliefCenterManagement {
            centers: table::new(),
            add_center_event: account::new_event_handle<ReliefCenter>(account),
            donation_event: account::new_event_handle<DonationRecord>(account), // Create event handle for donations
            center_counter: 0,
            donations: table::new(),
        };
        // Move the ReliefCenterManagement resource under the signer account
        move_to(account, management);
    }



    // Add a new relief center
    public entry fun add_center(
        account: &signer,
        name: String,
        location: String,
        city: String,
        state: String
    ) acquires ReliefCenterManagement {
        // Get the signer's address
        let signer_address = signer::address_of(account);
        // Get the ReliefCenterManagement resource
        let management = borrow_global_mut<ReliefCenterManagement>(signer_address);
        // Increment the center counter
        let counter = management.center_counter + 1;
        // Create a new ReliefCenter
        let new_center = ReliefCenter {
            center_id: counter,
            address: signer_address,
            name,
            location,
            city,
            state,
            active: true,
            total_donations: 0, // Initialize total donations

        };
        // Add the new center to the centers table
        table::upsert(&mut management.centers, counter, new_center);
        // Update the center counter
        management.center_counter = counter;
        // Fire a new center added event
        event::emit_event<ReliefCenter>( 
            &mut borrow_global_mut<ReliefCenterManagement>(signer_address).add_center_event,
            new_center,
        );
    }


  // Donate to a relief center
    public entry fun donate_to_center(account: &signer, center_id: u64, amount: u64) acquires ReliefCenterManagement {
        let signer_address = signer::address_of(account);
        let management = borrow_global_mut<ReliefCenterManagement>(signer_address);
        let center_record = table::borrow_mut(&mut management.centers, center_id);

        let donation_record = DonationRecord {
            donor: signer_address,
            amount,
            timestamp: 123456789, // Placeholder for timestamp logic
        };

        // Add the donation record to the donations table
        table::upsert(&mut management.donations, center_id, donation_record);
        center_record.total_donations = center_record.total_donations + amount;

         // Transfer SupraCoin from donor to relief center
        coin::transfer<supra_coin::SupraCoin>(account, center_record.address, amount);

event::emit_event<DonationRecord>(
    &mut borrow_global_mut<ReliefCenterManagement>(signer_address).donation_event,
    DonationRecord {
        donor: signer_address,
        amount,
        timestamp: 123456789, // Same timestamp logic
    },
);


    }



    // Deactivate a relief center
    public entry fun deactivate_center(account: &signer, center_id: u64) acquires ReliefCenterManagement {
        // Get the signer's address
        let signer_address = signer::address_of(account);
        // Get the ReliefCenterManagement resource
        let management = borrow_global_mut<ReliefCenterManagement>(signer_address);
        // Get the center matching the center_id
        let center_record = table::borrow_mut(&mut management.centers, center_id);
        // Update the center as inactive
        center_record.active = false;
    }

public entry fun update_center(
    account: &signer,
    center_id: u64,
    new_name: String,
    new_location: String,
    new_city: String,
    new_state: String
) acquires ReliefCenterManagement {
    // Get the signer's address
    let signer_address = signer::address_of(account);
    // Get the ReliefCenterManagement resource
    let management = borrow_global_mut<ReliefCenterManagement>(signer_address);
    // Get the center matching the center_id
    let center_record = table::borrow_mut(&mut management.centers, center_id);

    // Directly update the fields
    center_record.name = new_name;
    center_record.location = new_location;
    center_record.city = new_city;
    center_record.state = new_state;
}




    // View a specific relief center
    #[view]
    public fun view_center(owner: address, center_id: u64): ReliefCenter acquires ReliefCenterManagement {
        let management = borrow_global<ReliefCenterManagement>(owner);
        let center_ref = table::borrow(&management.centers, center_id);
        *center_ref
    }


    // Function to view the balance of an address
    #[view]
    public fun view_balance(address: address): u64 {
        coin::balance<supra_coin::SupraCoin>(address)
    }
}
