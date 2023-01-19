import { writable, derived } from 'svelte/store';

export const user_data_store = writable({
    
    first_name: null,
    last_name: null,
    email_id : null,
    mobile_no : null,
    gender: null,
    bank_name: null,
    branch_name: null,
    ifsc_code: null,
    upi_id: null,
    password:null,
    re_password:null
});