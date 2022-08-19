import { Enderecos } from "src/app/enderecos/models/endereco"
import { User } from "src/app/user/models/user"

export interface Imovel {
  idImovel?: number
  titulo: string
  dataCriacao: Date
  contratoAluguel: boolean
  contratoVenda: boolean
  valorAluguel: number
  valorVenda: number
  area: number
  descricao: string
  quartos: number
  suite: number
  banheiros: number
  vagas: number
  finalidadeImovel: string
  tipoImovel: string
  caracteristicas: Array<string>
  endereco: Enderecos
  user: User
  foto?: string
}
