import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";

import { BsSendFill } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";

const submitPostFormSchema = z.object({
    titulo: z.string().min(3, 'O Titulo têm de ter mais de 3 caracteres!'),
    conteudo: z.string().min(8, 'O Conteudo têm de ter mais de 8 caracteres!'),
    autor: z.string().min(3, 'O Autor têm de ter mais de 3 caracteres!')
});

type SubmitPostFormData = z.infer<typeof submitPostFormSchema>;

export default function Post(){

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<SubmitPostFormData>({
        resolver: zodResolver(submitPostFormSchema),
        mode: 'onChange',
    });

    function submitPost(data: SubmitPostFormData){
        reset();

        api.post('/sendMessage', {
            autor: data.autor,
            titulo: data.titulo,
            message: data.conteudo
        }).then((res) => {
            alert(res.data.message);
        }).catch((err) => {
            if("response" in err){
                setError("conteudo", {
                    message: err.response.data.message
                });
            }else{
                setError("conteudo", {
                    message: "Ocorreu um erro no envio! Por favor, tente novamente!"
                });
            }
        });
    }

    function deletePosts(){
        if(confirm("Deseja realmente apagar todas as mensagens?")){
            api.delete('/deleteMessages').then((res) => {
                alert(res.data.message);
            }).catch((err) => {
                if("response" in err){
                    setError("conteudo", {
                        message: err.response.data.message
                    });
                }else{
                    setError("conteudo", {
                        message: "Ocorreu um erro no envio! Por favor, tente novamente!"
                    });
                }
            });
        }
    }

    return (
        <div className="flex justify-center">
            <div className="w-2/3 mt-8">
                <h1 className="text-5xl font-roboto font-medium text-zinc-800">Enviar Post</h1>
                <form className="mt-4 flex flex-col space-y-2 mb-4"  onSubmit={handleSubmit(submitPost)}>
                    <div className="flex flex-col">
                        <p className="font-roboto font-light text-lg">Titulo:</p>
                        <input
                            type="text"
                            className="w-full border border-zinc-300 p-0.5 rounded outline-none"
                            required
                            {...register('titulo')}
                        />
                        { errors.titulo ? <p className="font-roboto font-light text-red-600">{errors.titulo.message}</p> : null }
                    </div>
                    <div className="flex flex-col">
                        <p className="font-roboto font-light text-lg">Autor:</p>
                        <input
                            type="text"
                            className="w-full border border-zinc-300 p-0.5 rounded outline-none"
                            required
                            {...register('autor')}
                        />
                        { errors.autor ? <p className="font-roboto font-light text-red-600">{errors.autor.message}</p> : null }
                    </div>
                    <div className="flex flex-col">
                        <p className="font-roboto font-light text-lg">Mensagem:</p>
                        <textarea
                            className="w-full border h-72 border-zinc-300 p-0.5 rounded outline-none resize-none"
                            required
                            {...register('conteudo')}
                        />
                        { errors.conteudo ? <p className="font-roboto font-light text-red-600">{errors.conteudo.message}</p> : null }
                    </div>
                    <button type="submit" className="bg-[#34A853] hover:bg-[#2C9147] flex p-2 rounded items-center justify-center space-x-4">
                        <BsSendFill className="w-6 h-6 text-white" />
                        <p className="text-white font-roboto font-medium text-lg">Enviar Mensagem</p>
                    </button>
                    <button type="button" className="bg-[#EA4335] hover:bg-[#D93F32] flex p-2 rounded items-center justify-center space-x-4" onClick={() => { deletePosts(); }}>
                        <MdOutlineDeleteOutline className="w-6 h-6 text-white" />
                        <p className="text-white font-roboto font-medium text-lg">Apagar Todas as Mensagens</p>
                    </button>
                </form>
            </div>
        </div>
    );
}