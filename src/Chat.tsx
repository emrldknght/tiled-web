import React, {createContext, useContext, useEffect, useState} from "react";
import {action, makeObservable, observable} from "mobx";
import {observer} from "mobx-react";

type Message = { id: number, text:string };
class ChatStore {
    @observable messages: Message[] = [
        { id: 1, text: 'msg 1' },
        { id: 2, text: 'msg 2' }
    ];
    @action addMsg(msg: Message) {
        this.messages.push(msg);
    }

    getLastId() {
        const ids = this.messages.map(m => m.id);
        return Math.max(...ids) + 1;
    }

    constructor() {
        makeObservable(this);
    }
}
const chatStore = new ChatStore();
const ChatContext = createContext<ChatStore>(chatStore)

let conn: WebSocket | null = null;

export const Chat = observer(function Chat() {
    const state = useContext(ChatContext);
    const [message, setMessage] = useState('')
    const handleChange = (e: React.ChangeEvent) => {
        const t = e.target as HTMLInputElement;
        setMessage(t.value)
    }

    const newId = state.getLastId()
    const send = () => {
        const newMsg = { id: newId, text: message };
        state.addMsg(newMsg);
        if(conn) {
            conn.send(JSON.stringify(newMsg))
        }
    }

    if(!conn) {
        conn = new WebSocket('ws://localhost:8080');
    }

    useEffect(() => {
        console.log('chat mounted');
        if(conn) {
            conn.onopen = function (e) {
                console.log('Connected!', e);
            }
            conn.onmessage = function (e) {
                console.log(e.data);
            }
        }
    }, [])

    return(
        <div className="chat-wrapper">
            <ChatContext.Provider value={chatStore}>
                <div className="chat col">
                    <b>Messages</b>
                    {/* <span>{JSON.stringify(state.messages)}</span> */}
                    <div className="messages col">
                        {state.messages.map((msg) =>
                            <span className="message" key={msg.id}>
                                <span>[{msg.id}]</span>
                                <span>{msg.text}</span>
                            </span>
                        )}
                    </div>
                    <div className="row">
                        <input type="text" value={message} onChange={handleChange}/>
                        <button onClick={send}>Send</button>
                    </div>
                </div>
            </ChatContext.Provider>
        </div>
    )
})