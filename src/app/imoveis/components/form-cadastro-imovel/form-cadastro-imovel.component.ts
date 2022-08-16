import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ImoveisService } from '../../service/imoveis.service';

@Component({
  selector: 'app-form-cadastro-imovel',
  templateUrl: './form-cadastro-imovel.component.html',
  styleUrls: ['./form-cadastro-imovel.component.css'],
})
export class FormCadastroImovelComponent implements OnInit {
  // chamar o model
  // ex: imovel:Imovel[]=[]
  // ex: caracteristica:caracteristicas[]=[]
  tipoImovelEnum: Array<string> = ['aro', 'bro', 'cro', 'dro', 'ero'];
  finalidadeImovelEnum: Array<string> = [
    'aman',
    'eman',
    'iman',
    'oman',
    'uman',
  ];
  caracteristicasLista: Array<string> = [
    'lista',
    'liste',
    'listi',
    'listo',
    'listu',
  ];

  cadastroImovel: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    alugar: [false, Validators.required],
    vender: [false, Validators.required],
    valorAluguel: [0],
    valorVenda: [0],
    tipoImovel: ['', Validators.required],
    finalidadeImovel: ['', Validators.required],
    quarto: [0, Validators.required],
    banheiro: [0, Validators.required],
    suite: [0, Validators.required],
    vaga: [0, Validators.required],
    area: [0, Validators.required],
    caracteristicas: [null],
    descricao: [''],
  });

  cadastroEndereco: FormGroup = this.fb.group({
    logradouro: ['', Validators.required],
    numero: [null, Validators.required],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    uf: ['', [Validators.required, Validators.minLength(2)]],
    cep: [null, [Validators.required, Validators.minLength(8)]],
  });

  /*   input = document.getElementById('valorCep') as HTMLInputElement; */

  dadosConsultaEndereco(dados: any, dadosForm: FormGroup) {
    var cepInput = document.getElementById('cep') as HTMLInputElement;
    dadosForm.setValue({
      cep: cepInput.value,
      logradouro: dados.logradouro,
      numero: null,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf,
    });
  }

  constructor(
    private fb: FormBuilder,
    private imoveisService: ImoveisService
  ) {}

  ngOnInit(): void {}

  async consultaCep(cep: any, form: any) {
    await this.imoveisService.buscar(cep).subscribe((dados) => {
      this.dadosConsultaEndereco(dados, form);
    });
  }

  cadastrarImovel() {
    // regra: transformar o uf em upperCase
    const upper = this.cadastroEndereco.value.uf.toUpperCase();
    console.log(upper);

    console.log(this.cadastroImovel.value.titulo);

    // regra -- se o botao checkbox estiver desabilitado, zerar o valor

    // pelo menos um checkbox tem que estar true
  }
  cadastrarEndereco() {
    console.log(this.cadastroEndereco.value.logradouro);
  }
}
