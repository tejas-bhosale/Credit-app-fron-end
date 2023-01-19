import {request} from './interceptor';


let request_amount_url = '/api/method/credit_app.api_folder.routes.user.request_amount';
const request_amount = (request_data) =>{
    return request(request_amount_url,{method:"POST",body : JSON.stringify(request_data)},true,false)
 }


const get_borrow_list=()=>{
    let get_borrow_list_url = '/api/method/credit_app.api_folder.routes.user.get_all_borrow_request'
    return request(
        get_borrow_list_url,{
        method: "GET"
        },true) 

}

const pay_borrower = (request_data) =>{
    let pay_borrower_url = '/api/method/credit_app.api_folder.routes.user.pay_borrower'
    return request(pay_borrower_url,{method:"POST",body : JSON.stringify(request_data)},true,false)
 }

const get_user_info=(email)=>{
    let get_user_info_url = '/api/method/credit_app.api_folder.routes.user.get_user_info?email='+email
    return request(
        get_user_info_url,{
        method: "GET"
        },true) 

}

const get_lender_list=(email)=>{
    let get_lender_list_url = '/api/method/credit_app.api_folder.routes.user.get_lenders_info?email='+email
    return request(
        get_lender_list_url,{
        method: "GET"
        },true) 

}

const pay_lender = (request_data) =>{
    let pay_lender_url = '/api/method/credit_app.api_folder.routes.user.pay_lender'
    return request(pay_lender_url,{method:"POST",body : JSON.stringify(request_data)},true,false)
}

const add_amount = (request_data) =>{
    let add_amount_url = '/api/method/credit_app.api_folder.routes.user.add_amount'
    return request(add_amount_url,{method:"POST",body : JSON.stringify(request_data)},true,false)
}

export{
    request_amount,
    get_borrow_list,
    pay_borrower,
    get_user_info,
    get_lender_list,
    pay_lender,
    add_amount

}