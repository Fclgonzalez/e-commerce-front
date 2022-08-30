import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Imovel } from 'src/app/imoveis/models/imovel';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';

@Component({
  selector: 'app-delete-imovel',
  templateUrl: './delete-imovel.component.html',
  styleUrls: ['./delete-imovel.component.css'],
})
export class DeleteImovelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private imovelService: ImoveisService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteImovelComponent>
  ) {}
  loading = false;
  imovel!: Imovel;

  ngOnInit(): void {
    this.imovel = this.data;
  }

  deletarImovel() {
    this.loading = true
    this.imovelService.deletarImovel(this.imovel.idImovel!).subscribe(
      ()=>{
        this.loading=false
        this.snackbar.open('Imóvel deletado com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close(true)
      },
      (error) => {
        this.loading = false
        console.log(error);
      }
    )
  }

  inativarImovel() {
    this.loading = true
    this.imovelService.inativarImovel(this.imovel).subscribe(
      () => {
        this.loading = false
        this.snackbar.open('Imóvel inativado', 'Ok', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      (error) => {
        this.loading = false
        console.log(error);
      }
    );
  }

  ativarImovel() {
    this.loading = true
    this.imovelService.ativarImovel(this.imovel).subscribe(
      () => {
        this.loading = false
        this.snackbar.open('Imóvel ativo', 'Ok', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      (error) => {
        this.loading = false
        console.log(error);
      }
    );
  }
}
