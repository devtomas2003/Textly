import { useEffect, useState } from "react";
import type { IMessage } from "../Types/Message";
import api from "../services/api";
import { MdForum } from "react-icons/md";

function processDate(date: string){
    const sysDate = new Date(date);
    const dateSimple = sysDate.getDate().toString().padStart(2, "0") + "/" + (sysDate.getMonth()+1).toString().padStart(2, "0") + "/" + sysDate.getFullYear()
    const timeSimple = sysDate.getHours().toString().padStart(2, "0") + ":" + sysDate.getMinutes().toString().padStart(2, "0") + ":" + sysDate.getSeconds().toString().padStart(2, "0");
    return dateSimple + " às " + timeSimple;
}

export default function Forum(){

    const [messages, setMessages] = useState<IMessage[]>();

    useEffect(() => {
        async function getMessages(){
            api.get('/messages').then((res) => {
                setMessages(res.data);
            }).catch((err) => {
                if("response" in err){
                    alert(err.response.data.message);
                }else{
                    alert("Ocorreu um erro na visualização! Por favor, tente novamente!");
                }
            });
        }
        getMessages();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="w-2/3 mt-8">
                <div className="flex items-center space-x-2">
                    <MdForum className="w-12 h-12 text-zinc-800" />
                    <h1 className="text-5xl font-roboto font-medium text-zinc-800">Forum</h1>
                </div>
                { messages && messages.length > 0 ?
                <div className="flex flex-col mt-4 space-y-4">
                    { messages.map((message) => {
                        return(
                            <div className="font-roboto bg-zinc-100 border border-zinc-200 p-4 rounded-lg flex flex-col space-y-2" key={message.id}>
                                <p className="text-zinc-800 font-light text-justify">{message.autor} - {processDate(message.date)}</p>
                                <h1 className="font-medium text-xl text-zinc-800">{message.titulo}</h1>
                                <p className="text-zinc-800 font-light text-justify">{message.message}</p>
                            </div>
                        );
                    })}
                </div>
                : <p className="font-roboto text-zinc-800 font-bold text-2xl mt-2">Não foram encontradas mensagens!</p> }
            </div>
        </div>
    );
}