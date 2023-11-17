import { loadingAction } from "../LoadingAction";
import {userMarkCourseModuleCompleteService } from '../../../Services/UserSocketioService'
import { SOCKET_EMIT_START_STOP_MODULE_SUCCESS, SOCKET_TIMER_SUCCESS, 
    SOCKET_ERROR, SOCKET_OPEN_CLOSE_SUCCESS, SOCKET_CLOSE_RESPONSE_SUCCESS, 
    SOCKET_TIMER_UP, SOCKET_NON_INTERACTIVE_START, MARK_COURSE_MODULE_COMPLETE, SOCKET_CONNECT_SUCCESS
} from '../ActionTypes/UserSocketioServiceType';
import {MODULE_TIMER,NON_INTERACTIVE_START, START_MODULE,STOP_MODULE,TIMER_UP} from './SocketEvents'

    
export const  socketConnectAction =(socket)=>{
    return (dispatch)=>{
            socket.on('connect', () => {
                dispatch({
                    type: SOCKET_CONNECT_SUCCESS,
                    payload: {socketInstance:socket}
                });
            })
    }
}

export const  socketDisconnectAction =(socket)=>{
    socket.disconnect()
    return (dispatch)=>{
        socket.on('disconnect', (reason)=>{
            dispatch({
                type: SOCKET_OPEN_CLOSE_SUCCESS,
                payload: {connected:false}
            });
            dispatch({
                type: SOCKET_CLOSE_RESPONSE_SUCCESS,
                payload: reason
            })
        })
    }
}

export const  socketEmitStartModuleAction =(socket,module_id)=>{
   
    socket.emit(START_MODULE, {module_id: module_id}) // event emit
    return (dispatch)=>{
        socket.on(START_MODULE, (response)=>{
            dispatch({
                type: SOCKET_EMIT_START_STOP_MODULE_SUCCESS,
                payload: response
            });
        })
        
        socket.on(MODULE_TIMER, (response)=>{
            dispatch({
                type: SOCKET_TIMER_SUCCESS,
                payload: response
            });
        })

        socket.on(TIMER_UP, (response)=>{
            dispatch({
                type: SOCKET_TIMER_UP,
                payload: response
            });
        })
    }
}

export const  socketEmitStopModuleAction =(socket,module_id)=>{
    socket.emit('STOP_MODULE', {module_id: module_id})
    return (dispatch)=>{
        socket.on('STOP_MODULE', (response)=>{
            if (response.message == "Module stoped"){
               
                dispatch({
                    type: SOCKET_TIMER_UP,
                    payload: {}
                });
            //     dispatch({
            //         type: SOCKET_TIMER_SUCCESS,
            //         payload: {}
            //     });
            }
        })
    }
}

export const  socketEmitNonInteractiveTimeAction =(module_id)=>{
    // socket.emit(NON_INTERACTIVE_START, {module_id: module_id})
    return (dispatch)=>{
        // socket.on(NON_INTERACTIVE_START, (response)=>{
      
        //     dispatch({
        //         type: SOCKET_NON_INTERACTIVE_START,
        //         payload: response
        //     });
        // })
    }
}


//  Socket Error catch

export const  socketErrorAction =(socket)=>{
    return (dispatch)=>{
        socket.on('error', (response)=>{
      
            dispatch({
                type: SOCKET_ERROR,
                payload: response
            });
        })
    }
}

export const socketMarkModuleComplete = (socket, module_id) => {
  
    socket.emit('MODULE_COMPLETE', {module_id: module_id})
    return (dispatch)=>{
        socket.on('MODULE_COMPLETE', (response)=>{
              
            if (response.message == "Module stoped"){
               
                dispatch({
                    type: SOCKET_TIMER_UP,
                    payload: {}
                });
            //     dispatch({
            //         type: SOCKET_TIMER_SUCCESS,
            //         payload: {}
            //     });
            }
        })
    }
}
