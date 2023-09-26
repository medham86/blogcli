import axios from 'axios'

const Api = axios.create(
    {
        baseURL : 'http://localhost:8000/api',
        headers : {
            "content-type" : "application/json"
        },
        withCredentials : true
    }
        
)

export default Api