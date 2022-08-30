import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImovelService } from 'src/app/admin/components/bar-chart-imoveis/imovel.service';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';
import { Endereco } from '../models/endereco';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.css'],
})
export class FormEnderecoComponent implements OnInit {
  idEnderecoImovel!: number;
  endereco!: Endereco;
  salvandoInformacoes: boolean = false;
  desabilitar: boolean = true;

  EnderecoForm: FormGroup = this.fb.group({
    logradouro: ['', Validators.required],
    numero: [null, Validators.required],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    uf: ['', [Validators.required, Validators.minLength(2)]],
    cep: [null, [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private enderecoService: EnderecosService,
    private imovelService: ImoveisService,
    private dialogRef: MatDialogRef<FormEnderecoComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.idEnderecoImovel = this.data;
    this.recuperarEndereco(this.idEnderecoImovel);
  }

  recuperarEndereco(idEndereco: number) {
    this.enderecoService
      .getEnderecosById(idEndereco)
      .subscribe((dadosEndereco) => {
        this.endereco = dadosEndereco;

        this.EnderecoForm.setValue({
          cep: this.endereco.cep,
          logradouro: this.endereco.logradouro,
          numero: this.endereco.numero,
          complemento: this.endereco.complemento,
          bairro: this.endereco.bairro,
          cidade: this.endereco.cidade,
          uf: this.endereco.uf,
        });
        this.verificaAtualizacaoValor();
      });
  }

  verificaAtualizacaoValor() {
    this.EnderecoForm.valueChanges.subscribe((valor) => {
      this.desabilitar =
        this.EnderecoForm.invalid ||
        !(
          valor.cep != this.endereco.cep ||
          valor.logradouro != this.endereco.logradouro ||
          valor.numero != this.endereco.numero ||
          valor.complemento != this.endereco.complemento ||
          valor.bairro != this.endereco.bairro ||
          valor.cidade != this.endereco.cidade ||
          valor.uf != this.endereco.uf
        );
    });
  }

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

  consultaCep(cep: string, form: any) {
    this.imovelService.buscarCep(cep).subscribe((dados) => {
      this.dadosConsultaEndereco(dados, form);
    });
  }

  editarEnderecoImovel(): void {
    this.salvandoInformacoes = true;
    let enderecoImovel: Endereco = {
      ...this.EnderecoForm.value,
    };

    //Regras do formulário
    enderecoImovel.uf = this.EnderecoForm.value.uf.toUpperCase();
    enderecoImovel.idEndereco = this.idEnderecoImovel;

    this.enderecoService.atualizarEndereco(enderecoImovel).subscribe(
      (dadosEndereco) => {
        this.snackbar.open('Cliente atualizado com sucesso', 'Ok', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
        this.salvandoInformacoes = false;
      }
    );

  }
}
