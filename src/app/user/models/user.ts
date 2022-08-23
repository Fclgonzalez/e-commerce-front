import { Endereco } from "src/app/enderecos/models/endereco"

export interface User {
    idUser?: number
    username: string
    password?: string
    nome?: string
    email?:string
    identificacao?: string
    celular?: string
    telefone?: string
    dataCriacao?: Date
    dataAtualizacao?: Date
    enderecoUser: Endereco
}