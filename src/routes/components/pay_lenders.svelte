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
   import {get_lender_list} from '../../services/request_amount_services';
   import { pay_lender} from '../../services/request_amount_services';
   import {get_user_info} from '../../services/request_amount_services';
   let lender_list=[];

   onMount(async()=>{
       let get_lender_list_response = await get_lender_list($user_data_store.email_id)
       console.log("get_lender_list_response",get_lender_list_response);
       if(get_lender_list_response.body.status == 'green'){
           lender_list = get_lender_list_response.body.data;
           lender_list = lender_list;
       }
       
       // success_toast("hii")
   })

   async function pay_back_lender_function(lender)
   {
       let pay_lender_data = {
           name: null,
           returned_date : null

       }
       pay_lender_data.name = lender.name;
       let date = new Date()
       pay_lender_data.returned_date = String(date.getFullYear())+"-"+("0"+String(date.getMonth()+1)).slice(-2)+"-"+("0"+String(date.getDate())).slice(-2)
       let pay_lender_response = await pay_lender(pay_lender_data)
       if(pay_lender_response.body.status == "green"){
           success_toast("Money paid back to lender")
           for(let i =0;i<lender_list.length;i++){
               if (lender_list[i]['name'] == lender.name)
               {
                   lender_list.splice(i,1)
                   break

               }
           }
           lender_list = lender_list;

           let get_user_info_response = await get_user_info($user_data_store.email_id)
            if( get_user_info_response.body.status == 'green'){
                $user_data_store = get_user_info_response.body.data;
            }

       }

       console.log("pay_lender_data",pay_lender_data);
       
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
                <div
                    class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table class="min-w-full">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Name</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Email</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Borrowed Date</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Amount</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Duration</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Pay Back</th>
                            </tr>
                        </thead>

                        <tbody class="bg-white">
                            {#each lender_list as lender }
                                
                       
                            <tr>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="flex items-center">
                                        <!-- <div class="flex-shrink-0 w-10 h-10">
                                            <img class="w-10 h-10 rounded-full"
                                                src="https://source.unsplash.com/user/erondu"
                                                alt="admin dashboard ui">
                                        </div> -->

                                        <div class="ml-4">
                                            <div class="text-sm font-medium leading-5 text-gray-900">
                                                {lender.lender_first_name} {lender.lender_last_name}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-500">{lender.lender_email}</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-500">{lender.borrowed_date}</div>
                                    <!-- <span
                                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span> -->
                                </td>

                                <td
                                    class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg> -->
                                    <div class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{lender.amount}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <!-- <span
                                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span> -->
                                        <div class="text-sm leading-5 text-gray-500">{lender.duration}</div>

                                </td>
                                <td
                                    class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg> -->
                                    <button on:click={()=>{pay_back_lender_function(lender)}} ><img src="/pravesh-ui/pay.png" alt="pay_logo" height="30" width="30"></button>
                                    
                                </td>
                            </tr>
                            {/each}
                           
                           
                           
                            

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<SvelteToast />