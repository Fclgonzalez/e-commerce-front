import { Imovel } from "src/app/imoveis/models/imovel"
import { User } from "src/app/user/models/user"

export interface Visita {
    idVisita?: number
    dataCriacao?: Date
    dataVisita: string
    horarioVisita: string
    statusVisita?: string
    imovel?: Imovel
    userConsumidor?: User
    userVendedor?: User
}