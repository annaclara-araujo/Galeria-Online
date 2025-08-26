import './Galeria.css'
import icon from "../../assets/img/upload.svg"
import { Botao } from "../../components/botao/Botao"
import { Card } from "../../components/card/Card"
import { useEffect, useState } from 'react'
import api from "../../Services/services"

export const Galeria = () => {
    const [cards, setCards] = useState([]);
    const [imagem, setImagem] = useState(null)
    const [nomeImagem, setNomeImagem] = useState("")

    //************* FUNÇÃO CADASTRAR */
    async function cadastrarCard(e) {
        e.preventDefault()
        if (imagem && nomeImagem) {
            try {
                //FormData e uma interface JS que permite construir um conjunto de pares chave/valor representando os dados de um form HTML
                const formData = new FormData();
                //append: anexar/acrescentar/adicionar
                formData.append("Nome", nomeImagem);
                formData.append("Arquivo", imagem);

                //necessário quando for fazer uploads de arquivos
                await api.post("Imagem/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                alert("Eba cadastrou!")

            } catch (error) {
                alert("Não foi possível realizar o cadastro!")
                console.log(error);

            }
        } else {
            alert("Preencha os campos de nome e imagem!")
        }
    }

    //************* FUNÇÃO LISTAR 
    async function listarCards() {
        try {
            const resposta = await api.get("Imagem");
            //console.log(resposta.data);
            setCards(resposta.data)

        } catch (error) {
            console.error(error);
            alert("Erro ao listar!");
        }
    }

    //************* FUNÇÃO EDITAR */
   function editarCard(id, nomeAntigo) {
        const novoNome = prompt("Digite o novo nome da imagem:", nomeAntigo);

        const inputArquivo = document.createElement("input");
        inputArquivo.type = "file";
        //Aceita imagens independente das extensões
        inputArquivo.accept = "image/*";
        inputArquivo.style = "display: none";
        // <input type="file" accept="image/*"></input>

        // Define o que acontece quando o usuário selecionar um arquivo
        inputArquivo.onchange = async (e) => {
            const novoArquivo = e.target.files[0];

            const formData = new FormData();
            //adicionar o novo nome no formData:
            formData.append("Nome", novoNome);
            formData.append("Arquivo", novoArquivo);

            if (formData) {
                try {
                    await api.put(`Imagem/${id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    alert("Ebaaa deu boom!😁✨");
                    listarCards();
                } catch (error) {
                    alert("Não foi possível alterar o card!");
                    console.error(error);
                }
            }
        };


        inputArquivo.click();

    }


    // ************ FUNÇÃO EXCLUIR
    async function excluirCard(id) {
        try {
            await api.delete(`Imagem/${id}`)
            alert("Excluido!")
        } catch (error) {
            alert("Erro ao excluir o card!")
            console.log(error);

        }
    }



    useEffect(() => {
        listarCards();
    })




    return (
        <>
            <h className='tituloGaleria'> Galeria Online</h>
            <form className='formulario' onSubmit={cadastrarCard}>
                <div className='campoNome'>
                    <label>Nome</label>
                    <input type="text" className='inputNome' onChange={(e) => setNomeImagem(e.target.value)} value={nomeImagem} />
                </div>
                <div className='campoImagem'>
                    <label className='arquivoLabel'>
                        <i><img src={icon} alt="icone de upload de imagem" /></i>
                        <input type="file" className='arquivoInput' onChange={(e) => setImagem(e.target.files[0])} />
                    </label>
                </div>
                <Botao nomeBotao="Cadastrar" />
            </form>
            <div className='campoCards'>
                {cards.length > 0 ? (
                    cards.map((e) => (
                        <Card
                            key={e.id}
                            tituloCard={e.nome}
                            imgCard={`https://localhost:7056/${e.caminho.replace("wwwroot/", "")}`}
                            funcaoExcluir={() => excluirCard(e.id)}
                            funcaoEditar={() => editarCard(e.id, e.nome)}

                        />
                    ))
                ) : <p>Nenhum card cadastrado</p>}


            </div>
        </>
    )
}
