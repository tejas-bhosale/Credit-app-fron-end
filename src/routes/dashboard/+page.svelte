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
    import Request from '../components/request_list.svelte';
    import Request_money from '../components/request.svelte';
    import Pay_lenders from '../components/pay_lenders.svelte';
    import Add_amount from '../components/add_money.svelte';
    let show = "request_list"
    onMount(async()=>{
        
        // success_toast("hii")
    })
    function open_request_module(){
        show = "request_money"
    }
    function open_request_list(){
        show = "request_list"

    }
    function open_pay_lenders(){
        show = "pay_lenders"
    }
    function open_add_amount(){
        show = "add_amount"
    }
    
</script>

<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tailwind CSS Simple Admin Dashboard UI Example</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    </head>

    <body>
        <div class="flex h-screen">
            <div class="px-4 py-2 bg-gray-200 bg-indigo-600 lg:w-1/4">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline w-8 h-8 text-white lg:hidden" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div class="hidden lg:block">
                    {#if  $user_data_store.first_name}
                    <div class="my-2 mb-6">
                        <h1 class="text-2xl font-bold text-white">{$user_data_store.first_name} {$user_data_store.last_name}</h1>
                    </div>
                        
                    {/if}
                    
                    <ul>
                        <!-- <li class="mb-6">
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <button type="submit" class="p-1 focus:outline-none">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                            class="w-4 h-4">
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </button>
                                </span>
                                <input type="search" name="search"
                                    class="w-full px-4 py-2 pl-12 rounded shadow outline-none" placeholder="Search...">
                        </li> -->
                        <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <a href="#"  on:click={()=>{open_request_list()}} class="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-6 h-6 mr-2 -mt-2"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </a>
                        </li>
                        <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <a   href="#" on:click={()=>{open_request_module()}} class="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-6 h-6 mr-2 -mt-2"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                        clip-rule="evenodd" />
                                </svg>
                                Make a Request
                            </a>
                        </li>
                        <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <a href="#" on:click={()=>{open_pay_lenders()}} class="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-6 h-6 mr-2 -mt-2"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Pay Lenders
                            </a>
                        </li>
                        <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
                            <a href="#" on:click={()=>{open_add_amount()}} class="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-6 h-6 mr-2 -mt-2"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Add Funds
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
            {#if show == "request_list"}
            <Request />
            {:else if show=="request_money"}
            <Request_money />
            {:else if show =="pay_lenders" }
            <Pay_lenders />
            {:else if show == "add_amount"}
            <Add_amount />
            {/if}
        </div>
    </body>

</html>