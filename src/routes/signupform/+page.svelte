
<script>
    import { onMount } from "svelte/internal";
    import { goto } from "$app/navigation";
    import { SvelteToast, toast } from "@zerodevx/svelte-toast";
    import {
        success_toast,
        error_toast,
        warning_toast,
    } from "../../services/toast_theme";
    import {create_user_function} from '../../services/create_user_service';
    let user_data={
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


    }
    var ifsc_code_check = /^[A-Z]{4}[0][A-Z0-9]{6}$/;

    var email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // var pincode_pattern = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
    var name_format = /^[a-zA-Z_\s]{2,50}$/;
    var mobile_no_pattern = /^[6-9]{1}[0-9]{9}$/;
    function check_validity(){
        let valid = true
        if (user_data.first_name && user_data.first_name != ""){
            if(!user_data.first_name.match(name_format)){
            error_toast("Invalid First Name")
            return false;
        }
        }else{
            error_toast("Please enter First Name");
            return false;
        }
        

        if (user_data.last_name && user_data.last_name != ""){
            if(!user_data.last_name.match(name_format)){
            error_toast("Invalid Last Name")
            return false;
        }
        }else{
            error_toast("Please enter Last Name");
            return false;
        }

        if (user_data.email_id && user_data.email_id != ""){
            if(!user_data.email_id.match(email_pattern)){
            error_toast("Invalid Email ID")
            return false;
        }

        }else{
            error_toast("Please enter Email ID");
            return false;
        }

        if(!user_data.password){
            error_toast("Please Enter Password")
            return false;
        }

        if(!user_data.re_password ){
            error_toast("Please reenter Password")
            return false
        }else{
            if( user_data.password != user_data.re_password){
                error_toast("Password and Re enter Password do not match")
                return false

            }
        }

        if(user_data.mobile_no && user_data.mobile_no != ""){
            if(!user_data.mobile_no.match(mobile_no_pattern)){
                error_toast("Invalid Mobile Number")
                return false;
            }
        }
        else{
            error_toast("Please enter Mobile Number")
            return false;
        }

        if(!user_data.ifsc_code.match(ifsc_code_check)){
            error_toast("Invalid IFSC code")
            return false;
        }

        return true



        
    }
   
    async function create_user(){
        console.log("user data",user_data);
        let valid = true;
        if(check_validity()){
        let create_user_response = await create_user_function(user_data);
        console.log("create_user_response",create_user_response);
        if (create_user_response.body.status == "green"){
            success_toast("User created");

            let replaceState = false;
            goto("/pravesh-ui/", { replaceState  });



        }

        }
        
    }
</script>

<div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div class="container max-w-screen-lg mx-auto">
      <div>
        <h2 class="font-semibold text-xl text-gray-600">User Creation Form</h2>
        
  
        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600">
        
              <p>Please fill out all the fields.</p>
            </div>
  
            <div class="lg:col-span-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div class="flex md:col-span-5 ">
                    <div class=" md:col-span-5 ">
                        <label for="full_name">First Name</label>
                        <input type="text" name="first_name" id="first_name" bind:value={user_data.first_name} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                      </div>
                      <div class=" md:col-span-5 p-2">
                        <label for="full_name">Last Name</label>
                        <input type="text" name="last_name" id="last_name" bind:value={user_data.last_name} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                      </div>
                  </div>

                <!-- <div class="md:col-span-5">
                  <label for="full_name">Full Name</label>
                  <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                </div> -->
  
                <div class="md:col-span-5">
                  <label for="email">Email Address</label>
                  <input type="text" name="email" id="email" bind:value={user_data.email_id} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="email@domain.com" />
                </div>

                <div class="md:col-span-5">
                    <label for="email">password</label>
                    <input type="password" name="password" id="password" bind:value={user_data.password} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                </div>
                <div class="md:col-span-5">
                    <label for="email">Re-enter password</label>
                    <input type="password" name="re_password" id="re_password" bind:value={user_data.re_password} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                </div>

                <div class="md:col-span-5">
                    <label for="email">Mobile Number</label>
                    <input type="text" name="mobile_no" id="mobile_no" bind:value={user_data.mobile_no} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" maxlength="10" />
                </div>
                
                <div class="md:col-span-5">
                    <label for="email">Gender</label>
                    <!-- <input type="text" name="gender" id="gender" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  /> -->
                    <select name="gender" id="gender" bind:value={user_data.gender} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                        <option value={null}>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>

                       
                    </select>
                </div>
  
                <div class="md:col-span-3">
                  <label for="address">Bank Name</label>
                  <input type="text" name="bank_name" id="bank_name" bind:value={user_data.bank_name} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                </div>

                <div class="md:col-span-3">
                    <label for="address">Branch Name</label>
                    <input type="text" name="branch_name" id="branch_name" bind:value={user_data.branch_name} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                </div>

                <div class="md:col-span-3">
                    <label for="address">IFSC code</label>
                    <input type="text" name="ifsc_code" id="ifsc_code" bind:value={user_data.ifsc_code} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                </div>

                <div class="md:col-span-3">
                    <label for="address">UPI ID</label>
                    <input type="text" name="upi_id" id="upi_id" bind:value={user_data.upi_id} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                </div>
  
                <!-- <div class="md:col-span-2">
                  <label for="city">City</label>
                  <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                </div> -->
  
                <!-- <div class="md:col-span-2">
                  <label for="country">Country / region</label>
                  <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="country" id="country" placeholder="Country" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                    <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                      <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    <button tabindex="-1"  class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                      <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    </button>
                  </div>
                </div> -->
  
                <!-- <div class="md:col-span-2">
                  <label for="state">State / province</label>
                  <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="state" id="state" placeholder="State" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                    <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                      <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    <button tabindex="-1"  class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                      <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    </button>
                  </div>
                </div> -->
  
                <!-- <div class="md:col-span-1">
                  <label for="zipcode">Zipcode</label>
                  <input type="text" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
                </div> -->
  
                <!-- <div class="md:col-span-5">
                  <div class="inline-flex items-center">
                    <input type="checkbox" name="billing_same" id="billing_same" class="form-checkbox" />
                    <label for="billing_same" class="ml-2">My billing address is different than above.</label>
                  </div>
                </div> -->
  
                <!-- <div class="md:col-span-2">
                  <label for="soda">How many soda pops?</label>
                  <div class="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <button tabindex="-1"  class="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <input name="soda" id="soda" placeholder="0" class="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" value="0" />
                    <button tabindex="-1"  class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div> -->
        
                <div class="md:col-span-5 text-center p-2">
                  <div class="inline-flex items-end">
                    <button on:click={()=>{create_user()}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
  
      
    </div>
  </div>
  <SvelteToast />