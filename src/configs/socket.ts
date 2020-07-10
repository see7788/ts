import { machineId } from "node-machine-id";
import { to_base64, from_base64 } from "../fun";
import WebSocket from 'ws';
import { SocketSend, SocketRes, SocketParamDb } from "./type";
import  CryptoJS from "crypto-js";
const socketHost = 'ws://39.97.216.195:8889';
export const initSocket = (): Promise<never> => new Promise(async ok => {
    global.istate.nodeUid_login = await machineId();
    const ws = new WebSocket(socketHost);
    const socketSend: SocketSend = (cmd, db) => new Promise((o, err) => {
        ws.send(
            {
                nodeUid_login: global.istate.nodeUid_login,
                tel_login: global.istate.tel_login,
                cmd,
                db
            },
           v=> err(v)
        );
        o(cmd)
    })
    // ws.onclose = () => socketSend('login', '').catch(console.log)
    // ws.onerror = () => socketSend('login', '').catch(console.log)
    ws.onopen = () => {
        socketSend('login', '');
        setTimeout(function timeout() {
            socketSend('setTimeout', '');
        }, 500);
    }
    ws.onmessage = ({ data}) => {
        const { id_socket, cmd, db } = data as unknown as SocketRes;
        switch (cmd) {
            case '':
                global.pcTips(db)
                break;
            case 'login':
                global.istate.id_socket = db as SocketParamDb['login'][1];
                break;
            case 'setTimeout':
            default:
                global.pcConsole('socket消息', db);
            // console.log(__dirname, global.istate);
        }
    }
    global.pcConsole('在线通讯启动', __filename);
    ok()
});