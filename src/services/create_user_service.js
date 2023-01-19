import {request} from './interceptor';


let create_user_url = '/api/method/credit_app.api_folder.routes.user.create_user';
const create_user_function = (user_data) =>{
    return request(create_user_url,{method:"POST",body : JSON.stringify(user_data)},true,false)
 }

export{
    create_user_function
}