import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ImovelService } from 'src/app/admin/components/bar-chart-imoveis/imovel.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormEnderecoComponent } from 'src/app/enderecos/form-endereco/form-endereco.component';
import { FormCadastroImovelComponent } from 'src/app/imoveis/components/form-cadastro-imovel/form-cadastro-imovel.component';
import { ImovelVendedorComponent } from 'src/app/imoveis/components/imovel-vendedor/imovel-vendedor.component';
import { Imovel } from 'src/app/imoveis/models/imovel';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';
import { UserService } from '../../services/user.service';
import { ConfirmarExclusaoImovelComponent } from '../confirmar-exclusao-imovel/confirmar-exclusao-imovel.component';

@Component({
  selector: 'app-listar-imoveis-vendedor',
  templateUrl: './listar-imoveis-vendedor.component.html',
  styleUrls: ['./listar-imoveis-vendedor.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListarImoveisVendedorComponent implements OnInit {
  idUser?: number = 0;
  imoveis: any;

  colunas: string[] = [
    'idImovel',
    'logradouro',
    'numero',
    'complemento',
    'bairro',
    'cidade',
    'uf',
    'deletar',
    'editar-imovel',
    'editar-endereco-imovel',
  ];
  colunasExpandidas = [...this.colunas, 'expand'];
  expandedElement!: Imovel | null;

  constructor(
    private imovelService: ImoveisService,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.imovelService.atualizarImovel$.subscribe((atualizar) => {
      if (atualizar) {
        this.recuperarImoveis();
      }
    });
  }

  recuperarImoveis() {
    const email = this.authService.decodeToken().sub;

    this.userService.getUsuarioByUsername(email).subscribe((response) => {
      this.idUser = response.idUser;
      this.imovelService.getImoveisAtivosVendedor(this.idUser!).subscribe(
        (imovel) => {
          this.imoveis = imovel;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  inativarImovel(imovel: Imovel) {
    this.dialog
      .open(ConfirmarExclusaoImovelComponent, {
        width: '250px',
      })
      .afterClosed()
      .subscribe((resposta) => {
        if (resposta) {
          this.imovelService.inativarImovel(imovel).subscribe(() => {
            this.snackbar.open('Imóvel deletado', 'Ok', {
              duration: 3000,
            });
            this.recuperarImoveis();
          });
        }
      });
  }

  editarImovel(idImovel: number) {
    const dialog = this.dialog.open(ImovelVendedorComponent, {
      data: idImovel,
    });
    dialog.afterClosed().subscribe(() => {
      this.recuperarImoveis();
    });
  }

  editarEnderecoImovel(idEndereco: number) {
    const dialog = this.dialog.open(FormEnderecoComponent, {
      data: idEndereco,
    });
    dialog.afterClosed().subscribe(() => {
      this.recuperarImoveis();
    });
  }
}
