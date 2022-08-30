import { Endereco } from 'src/app/enderecos/models/endereco';
import { User } from 'src/app/user/models/user';

export interface Imovel {
  idImovel?: number;
  dataCriacao?: Date;
  titulo?: string;
  contratoAluguel?: boolean;
  contratoVenda?: boolean;
  valorAluguel?: number;
  valorVenda?: number;
  inativo?: boolean
  area?: number;
  descricao?: string;
  quartos?: number;
  suite?: number;
  banheiros?: number;
  vagas?: number;
  finalidadeImovel?: string;
  tipoImovel?: string;
  caracteristica?: string;
  foto?: Array<string>;
  endereco?: Endereco;
  userVendedor?: User;
}
