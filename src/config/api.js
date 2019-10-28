
let ApiHost = ""

if(process.env.NODE_ENV !== 'production'){
  ApiHost = "/api-local"
}

let ApiConfig = {
  host: ApiHost
}

export default ApiConfig