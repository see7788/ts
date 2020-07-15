import { machineId } from "node-machine-id";
import { to_base64, from_base64 } from "../fun";
import WebSocket from 'ws';
import { SocketSend, SocketRes, SocketParamDb } from "./type";
import  CryptoJS from "crypto-js";
const socketHost = 'ws://39.97.216.195:8889';
export const initSocket = (): Promise<never> => new Promise(async ok => {
    global.istate.nodeUid_login = await machineId();
    const ws = new WebSocket(socketHost);
    const socketSend: SocketSend = (cmd, db,toid_socket) => new Promise((o, err) => {
        ws.send(
            {
                nodeUid_login: global.istate.nodeUid_login,
                tel_login: global.istate.tel_login,
                cmd,
                db,
                toid_socket:toid_socket?toid_socket:0
            },
           v=> err(v)
        );
        o(cmd)
    }).catch(
        v=>global.pcConsole('socket有错误'+__filename,v)
    )
    ws.onclose = () => socketSend('login', '')
    ws.onerror = () => socketSend('login', '')
    ws.onopen = () => {
        socketSend('login', '');
        setTimeout(function timeout() {
            socketSend('setTimeout', '');
        }, 500);
    }
    ws.onmessage = ({ data}) => {
        const { cmd, db,fromid_socket} = data as unknown as  SocketRes;
        switch (cmd) {
            case '':
                global.pcTips(db,__filename)
                break;
            case 'login':
                global.istate.id_socket = db as SocketParamDb['login'][1];
                break;
            case 'setTimeout':
            default:
                global.pcConsole('socket消息', db);
        }
    }
    global.pcConsole('在线通讯启动', __filename);
    ok()
});