import { Endereco } from "./endereco";
import { Role } from "./role";

export interface Usuario {
  idUser: number;
  username: string;
  nome: string;
  identificacao: string;
  celular?: string;
  telefone?: string;
  dataCriacao: string;
  dataAtualizacao: string;
  endereco: Endereco;
  roles: Role[];
}
