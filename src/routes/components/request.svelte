<script>
    import { onMount } from "svelte/internal";
   import { goto } from "$app/navigation";
   import { SvelteToast, toast } from "@zerodevx/svelte-toast";
   import {
       success_toast,
       error_toast,
       warning_toast,
   } from "../../services/toast_theme";
   import {user_data_store} from '../../stores/user_store';

    import {request_amount} from '../../services/request_amount_services';
   let request_amount_data ={
       amount: null,
       duration: null,
       requested_date:null,
       borrower_email: null,
       borrower_first_name: null,
       borrower_last_name: null,
       borrower_upi_id: null

   }
   onMount(async()=>{
       
       // success_toast("hii")
   })

   async function request_amount_function(){
       let valid = true;
       let date = new Date()
       request_amount_data.requested_date = String(date.getFullYear())+"-"+("0"+String(date.getMonth()+1)).slice(-2)+"-"+("0"+String(date.getDate())).slice(-2)
       console.log("date",date);
   
       if(!request_amount_data.amount)
       {
           valid = false;
           error_toast("Amount can not be empty");
       }

       if(!request_amount_data.duration)
       {
           valid = false;
           error_toast("Duration can not be empty");
       }
       request_amount_data.borrower_email = $user_data_store.email_id;
       request_amount_data.borrower_first_name = $user_data_store.first_name;
       request_amount_data.borrower_last_name = $user_data_store.last_name;
       request_amount_data.borrower_upi_id = $user_data_store.upi_id;

       console.log("request_amount_data",request_amount_data);

       if(valid){
        let request_amount_function_response = await request_amount(request_amount_data)
       console.log("request_amount_function_response",request_amount_function_response);
       if(request_amount_function_response.body.status == "green"){
           success_toast(request_amount_function_response.body.message)
           request_amount_data.amount = null;
           request_amount_data.duration = null;
       }else{
           error_toast("Error in raising Request")
       }

       }

       



   }
   
</script>
<div class="w-full px-4 py-2 bg-gray-200 lg:w-full">
    <div class="container mx-auto mt-12">
        <div class="grid gap-4 lg:grid-cols-3">
            <div class="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                <div class="p-3 bg-indigo-600 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="mx-4">
                    <h4 class="text-2xl font-semibold text-gray-700">
                        {#if $user_data_store.balance}
                        {$user_data_store.balance}
                        {:else}
                        0
                        {/if}
                    </h4>
                    <div class="text-gray-500">Balance</div>
                </div>
            </div>
            <div class="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                <div class="p-3 bg-indigo-600 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </div>
                <div class="mx-4">
                    <h4 class="text-2xl font-semibold text-gray-700">
                        {#if $user_data_store.credit}
                        {$user_data_store.credit}
                        {:else}
                        0
                        {/if}</h4>
                    <div class="text-gray-500">Total Credit Amount</div>
                </div>
            </div>
            <div class="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                <div class="p-3 bg-indigo-600 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </div>
                <div class="mx-4">
                    <h4 class="text-2xl font-semibold text-gray-700">
                        30</h4>
                    <div class="text-gray-500">Total Lending Amount</div>
                </div>
            </div>
           
        </div>
        <div class="flex flex-col mt-8">
            <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    
                      
            
                      <div class="lg:col-span-2">
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            
          
                          <!-- <div class="md:col-span-5">
                            <label for="full_name">Full Name</label>
                            <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                          </div> -->
            
                          <div class="md:col-span-5">
                            <label for="email">Amount</label>
                            <input type="number" name="amount" id="amount" bind:value={request_amount_data.amount}  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  min="1" />
                          </div>
          
                          <div class="md:col-span-5">
                              <label for="email">Duration in days</label>
                              <input type="number" name="duration" id="duration" bind:value={request_amount_data.duration}   class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" min="1"  />
                          </div>
    
                          <div class="md:col-span-5 text-center p-2">
                            <div class="inline-flex items-end">
                              <button on:click|preventDefault={()=>{request_amount_function()}}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Request</button>
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
