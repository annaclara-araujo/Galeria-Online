import './Galeria.css'
import icon from "../../assets/img/upload.svg"
import { Botao } from "../../components/botao/Botao"
import { Card } from "../../components/card/Card"

export const Galeria = () => {
    return (
        <>
            <h className='tituloGaleria'> Galeria Online</h>
            <form className='formulario' onSubmit="">
                <div className='campoNome'>
                    <label>Nome</label>
                    <input type="text" className='inputNome' />
                </div>
                <div className='campoImagem'>
                    <label className='arquivoLabel'>
                        <i><img src={icon} alt="icone de upload de imagem" /></i>
                        <input type="file" className='arquivoInput' />
                    </label>
                </div>
                <Botao nomeBotao="Cadastar" />
            </form>
            <div className='campoCards'>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
                <Card tituloCard="gatooooo"/>
            </div>
        </>
    )
}