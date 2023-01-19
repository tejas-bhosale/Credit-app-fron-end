import {request} from './interceptor';
let get_scope_api_url = '/api/method/pravesh.facility.routes.scope.get_scope';
const get_user_scope_function = () =>{
    return request(get_scope_api_url,{mode: 'no-cors',method:"GET"},true,false)
 }

export{
    get_user_scope_function
}