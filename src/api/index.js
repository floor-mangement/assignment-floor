import axios from "axios";
import React from "react";

const client = axios.create({
    baseURL: "http://localhost:8000"
})




// const userApi = {

//     getUsers: () => {
//         console.log("call API");
//         try {
//             const Users = client.get('/api/user/all-user');
//             console.log(Users);
//             return Users;
            
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     setUsers: () => {
//         console.log("call API");
//         try {
//             const Users = client.get('/api/user/all-user');
//             console.log(Users);
//             return Users;
            
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        const accessToken = JSON.parse(token);
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.data?.message) toast.error(error.response.data.message);
      return Promise.reject(error);
    }
  );
  
  const responseBody = (response) => response.data;
  


export const requests=() =>{
    
}