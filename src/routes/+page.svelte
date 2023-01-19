<script>
// @ts-nocheck

    import {get_user_scope_function} from '../services/test';
    import { onMount } from "svelte/internal";
    import { goto } from "$app/navigation";
    let email = null;
    let password = null;
    let login_data = {
        email: null,
     password : null

    }
    import {user_data_store} from '../stores/user_store';
    import { SvelteToast, toast } from "@zerodevx/svelte-toast";
    import {
        success_toast,
        error_toast,
        warning_toast,
    } from "../services/toast_theme";
    import {login_user} from '../services/login_services';

    onMount(async()=>{
        let temp = await get_user_scope_function();
        console.log("temp",temp);
        // success_toast("hii")
    })
    function goto_signupform(){
        let replaceState = false;
        goto("/pravesh-ui/signupform", { replaceState  });
    }
    async function login_user_fun(){
        let valid = true;
        if(!login_data.email){
            error_toast('Please enter Email ID')
            valid = false;
        }else{


        }
        if(!login_data.password){
            error_toast("Please enter Password")
            valid = false;
        }else{

        }

        if (valid){
            let login_user_response = await login_user(login_data)
        console.log("login_user_response",login_user_response);
        if(login_user_response.body.status == "green"){
            success_toast("User logged in")
            $user_data_store = login_user_response.body.data;
            console.log("$user_data_store",$user_data_store);
            let replaceState = false;
            goto("/pravesh-ui/dashboard", { replaceState  });
           
        }else{
            error_toast(login_user_response.body.message)
        }

        }
        
    }


</script>
<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h1 class="toastSuccessText">test</h1> -->

<div>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="/pravesh-ui/credit_logo.png" alt="logo">
                Credit APP   
            </div>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" bind:value={login_data.email} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" >
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" bind:value={login_data.password} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                        </div>
                        <div class="flex items-center justify-between">
                            <!-- <div class="flex items-start">
                                <div class="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" >
                                </div>
                                <div class="ml-3 text-sm">
                                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div> -->
                            <button  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</button>
                        </div>
                        <button on:click|preventDefault={()=>{login_user_fun()}}  class="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <button on:click|preventDefault={()=>{goto_signupform()}} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</button>
                        </p>
                  
                </div>
            </div>
        </div>
      </section>
</div>
<SvelteToast />

