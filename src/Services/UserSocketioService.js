import axios from "axios";
import io from "socket.io-client";
import { baseURL } from './BaseApi';


// export const socketService = {
//     startModule: (socket, module_id)=> {
//         socket.emit('START_MODULE',{module_id: moduele_id})
//     }
// }



    const getHeaders = () => {
        const accessToken = sessionStorage.getItem('userAccessToken')
        return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };
      
      }
      
      
      export const userMarkCourseModuleCompleteService = {
      
          markCourseModuleComplete : (data) => {
              return axios.post(baseURL +`/api/course/module/mark-course-module-complete`, data,getHeaders())
          },
      
      }