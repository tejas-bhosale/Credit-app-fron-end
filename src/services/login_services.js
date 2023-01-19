import {request} from './interceptor';


let login_user_url = '/api/method/credit_app.api_folder.routes.user.login_user';
const login_user = (user_data) =>{
    return request(login_user_url,{method:"POST",body : JSON.stringify(user_data)},true,false)
 }

export{
    login_user
}