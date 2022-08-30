import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { FormEnderecoComponent } from 'src/app/enderecos/form-endereco/form-endereco.component';
import { EnderecosService } from 'src/app/enderecos/services/enderecos.service';
import { ImovelVendedorComponent } from 'src/app/imoveis/components/imovel-vendedor/imovel-vendedor.component';
import { Imovel } from 'src/app/imoveis/models/imovel';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';
import { ImovelService } from '../../components/bar-chart-imoveis/imovel.service';

import { DeleteImovelComponent } from '../../components/delete-imovel/delete-imovel.component';
import { Endereco } from '../../interface/endereco';
import { newUser } from '../../interface/newUser';
import { Role } from '../../interface/role';
import { Usuario } from '../../interface/usuario';
import { UsersService } from '../usuarios/users.service';

@Component({
  selector: 'app-imoveis-admin',
  templateUrl: './imoveis-admin.component.html',
  styleUrls: ['./imoveis-admin.component.css'],
})
export class ImoveisAdminComponent implements OnInit {
  public pageSize = 10;
  public page = 1;
  public loading = false;
  public imoveis: Imovel[] = [];
  public imovel!: Imovel;

  constructor(
    private imovelService: ImoveisService,
    private enderecoService: EnderecosService,
    private dialog: MatDialog,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Imóveis');
    this.RecuperarImoveis();
  }

  RecuperarImoveis() {
    this.imovelService.getImoveis().subscribe(
      (imovelLista) => {
        this.imoveis = imovelLista.sort(function (a, b) {
          return a.idImovel! < b.idImovel!
            ? -1
            : a.idImovel! > b.idImovel!
            ? 1
            : 0;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  recuperarImovel(imovel: Imovel) {
    this.imovelService.getImoveisById(imovel.idImovel!).subscribe(
      (imovel) => {
        this.dialog
          .open(ImovelVendedorComponent, {
            data: imovel.idImovel,
          })
          .afterClosed()
          .subscribe((sucesso) => {
            if (sucesso) {
              this.RecuperarImoveis();
              console.log(sucesso);
            }
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  recuperarEnderecoImovel(imovel: Imovel) {
    console.log(imovel);

    this.enderecoService
      .getEnderecosById(imovel.endereco?.idEndereco!)
      .subscribe(
        (endereco) => {
          this.dialog
            .open(FormEnderecoComponent, {
              data: imovel.endereco?.idEndereco,
            })
            .afterClosed()
            .subscribe((sucesso) => {
              if (sucesso) {
                this.RecuperarImoveis();
                console.log(sucesso);
              }
            });
        },
        (error) => {
          console.log(error);
        }
      );
  }


  deletarImovel(imovel: Imovel) {
    this.dialog
      .open(DeleteImovelComponent, {
        data: imovel,
      })
      .afterClosed()
      .subscribe((sucesso) => {
        if (sucesso) {
          this.RecuperarImoveis();
          console.log(sucesso);
        }
      });
  }
}
