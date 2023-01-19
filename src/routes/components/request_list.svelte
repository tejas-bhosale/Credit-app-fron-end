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
   import {get_borrow_list} from '../../services/request_amount_services';
   import {pay_borrower} from '../../services/request_amount_services';
   import {get_user_info} from '../../services/request_amount_services';
   let borrow_list = []
   onMount(async()=>{
       let get_borrow_list_response = await get_borrow_list();
       console.log("get_borrow_list_response",get_borrow_list_response);
       if(get_borrow_list_response.body.status = "green"){
           borrow_list = get_borrow_list_response.body.data;
           borrow_list  = borrow_list

       }
       
       
       // success_toast("hii")
   })

   async function pay_borrower_function(borrow_data){
       console.log("borrow_data",borrow_data);
       let valid = true;
       console.log("$user_data_store.balance",$user_data_store.balance);
       console.log("borrow_data.amount",borrow_data.amount);
       console.log("condition", Number( borrow_data.amount) > Number($user_data_store.balance));
       if( Number( borrow_data.amount) > Number($user_data_store.balance) )
       {
           error_toast("Not Enough Balance");
           valid = false;


       }
       if (borrow_data.borrower_email == $user_data_store.email_id){
           valid  = false;
           error_toast("You can not pay to your own request.")
       }

       if(valid)
       {
           let pay_borrower_data = 
           {
               name: null,
               lender_email: null,
               lender_first_name: null,
               lender_last_name: null,
               lender_upi_id: null,
               borrowed_date: null

           }
           pay_borrower_data.name = borrow_data.name;
           pay_borrower_data.lender_email = $user_data_store.email_id;
           pay_borrower_data.lender_first_name = $user_data_store.first_name;
           pay_borrower_data.lender_last_name = $user_data_store.last_name;
           pay_borrower_data.lender_upi_id = $user_data_store.upi_id;
           let date = new Date()
           pay_borrower_data.borrowed_date = String(date.getFullYear())+"-"+("0"+String(date.getMonth()+1)).slice(-2)+"-"+("0"+String(date.getDate())).slice(-2)
        //    console.log("date",date);
        console.log("pay_borrower_data",pay_borrower_data);

        let pay_borrower_response = await pay_borrower(pay_borrower_data);
        console.log("pay_borrower_response ",pay_borrower_response);
        if(pay_borrower_response.body.status == 'green')
        {
            for(let i=0;i<borrow_list.length;i++){
                if (borrow_data.name == borrow_list[i]['name']){
                    borrow_list.splice(i,1);
                    break;


                }
            }
            borrow_list = borrow_list

            success_toast("Money Lended Successfully");

            let get_user_info_response = await get_user_info($user_data_store.email_id)
            if( get_user_info_response.body.status == 'green'){
                $user_data_store = get_user_info_response.body.data;
            }

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
                                    Request Date</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Amount</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Duration</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Pay</th>
                            </tr>
                        </thead>

                        <tbody class="bg-white">
                            {#each borrow_list as borrow }
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
                                                {borrow.borrower_first_name} {borrow.borrower_last_name}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-500">{borrow.borrower_email}</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                    class="text-sm font-medium leading-5 text-gray-900">{borrow.requested_date}</span>
                                </td>

                                <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{borrow.amount}</span>

                                   
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                    class="text-sm font-medium leading-5 text-gray-900">{borrow.duration}</span>
                                </td>
                                <td
                                    class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg> -->
                                    <button on:click={()=>{pay_borrower_function(borrow)}} ><img src="/pravesh-ui/pay.png" alt="pay_logo" height="30" width="30"></button>
                                    
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
