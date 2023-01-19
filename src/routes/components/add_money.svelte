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

    import {request_amount,add_amount} from '../../services/request_amount_services';
   let add_amount_data ={
       email_id : null,
       amount: null
   }
   onMount(async()=>{
       
       // success_toast("hii")
   })

   async function add_amount_function(){
       let valid = true;
       if(!add_amount_data.amount){
           error_toast("Amount can not be empty");
           valid = false;
       }

    add_amount_data.email_id = $user_data_store.email_id;

    let add_money_response = await add_amount(add_amount_data)
    if(add_money_response.body.status == 'green'){
        success_toast('Amount added')
        add_amount_data.amount = null;

        $user_data_store = add_money_response.body.data;
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
                            <input type="number" name="amount" id="amount" bind:value={add_amount_data.amount}  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  min="1" />
                          </div>
          
                          <!-- <div class="md:col-span-5">
                              <label for="email">Duration in days</label>
                              <input type="number" name="duration" id="duration" bind:value={request_amount_data.duration}   class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" min="1"  />
                          </div> -->
    
                          <div class="md:col-span-5 text-center p-2">
                            <div class="inline-flex items-end">
                              <button on:click|preventDefault={()=>{add_amount_function()}}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Funds</button>
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