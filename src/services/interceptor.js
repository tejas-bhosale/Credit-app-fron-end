
export const handleResponse = async (response) =>{
  // console.log( await response.text(),"response"  );
  console.log("response",response);
  if(response.status == 403){
    let domain_name = window.location.hostname;
    console.log('domain',domain_name);
    const res = await request('attendance.override_build_page_for_login_for_oauth?path=login&redirect-to=https://'+domain_name+'/pravesh-ui/&only_url=true',{
            // mode: 'no-cors'
         });
         console.log('res',res);

        //  let a = await res.json();
        //  console.log(window);
        // console.log('a',a);
        
        console.log('body',res.body);
        console.log('message',res.body.message);
        // console.log('url',window.location.hostname);
         window.location = res.body.message;

  }
  
  // let temp = await response.text();
  // console.log("temp",temp);
  
  // let temp = await response.text().then((text) => {
  //   console.log(text);
  // });
  // console.log("temp",temp);
  // response = response.text();
  
    let data = await response.json();
    return {
        body: data
    }

}

export function request(
    url,
    options= {},
    isFullUrlPresent = false,
    syncOfflineFirst = false,
    type= ""
  ) {
    
    // erjs.loadSpinner.show();
    let queryString = "";
    let { body, method } = options;
    console.log("Body is---->",body);
    console.log("Method is--->",method)
    console.log("options is------>",options);
    options = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "dataType" : 'json',
        "Contains-Array" : 'true',
      //   // "Accept": "application/json",
      //   "accept": "application/json"
        
      //   // "Access-Control-Allow-Origin": "https://elasticrun.in",
      //   // "Access-Control-Allow-Origin":" *"
        

      },
      
      ...options,
    };
  
    let endpoint = isFullUrlPresent ? url : `/api/method/${url}`;
  
    // if (!method || method === "GET") {
    //   if (body && typeof body === "object") {
    //     let parts = Object.keys(body).map((current) => {
    //       return `${current}=${body[current]}`;
    //     });
    //     queryString = `?${parts.join("&")}`;
    //   } else {
    //     queryString = "";
    //   }
    //   delete options.body;
    // }
  
    // if (options.body && typeof options.body === "object") {
    //   options.body = JSON.stringify(options.body);
    // }
  
    // if ((method === "POST" || method === "PUT") && syncOfflineFirst) {
    //   // erjs.loadSpinner.hide();
    //   // TODO - Handle Offline DB Sync
    //   console.log("Inside check condition")
    // }
    console.log("Options are: ---->",options)
    // console.log(queryString,"->querystring")
    // console.log(`${endpoint}${queryString || ""}`,"->fullstring")
    return fetch(`${endpoint}${queryString || ""}`, options).then(
      handleResponse
    );
  }