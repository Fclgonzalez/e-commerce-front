import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Subscription } from 'rxjs';
import { ConfirmarLogoutComponent } from 'src/app/auth/components/confirmar-logout/confirmar-logout.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormCadastroImovelComponent } from 'src/app/imoveis/components/form-cadastro-imovel/form-cadastro-imovel.component';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  nomeUser?: string;
  userLogado: boolean = false;
  sub?: Subscription;
  anuncie: boolean = false;
  imoveisCadastrados: boolean = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.logado();
    this.reload();
    this.verificarConsumidorVendedorAdmin();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  verificarConsumidorVendedorAdmin() {
    const email = this.auth.decodeToken().sub;

    return this.userService
      .getUsuarioByUsername(email)
      .subscribe((response) => {
        let role = response.roles;

        for (let r of role!) {
          if (r.name == 'VENDEDOR' || r.name == 'ADMIN') {
            this.imoveisCadastrados = true;
          }
          if (
            r.name == 'CONSUMIDOR' ||
            r.name == 'VENDEDOR' ||
            r.name == 'ADMIN'
          ) {
            this.anuncie = true;
          }
        }
      });
  }

  reload() {
    this.sub = fromEvent(window, 'storage').subscribe(() => {
      if (this.auth.logado()) {
        location.reload();
      }
    });
  }

  logado() {
    this.userLogado = this.auth.logado();
    if (this.userLogado) {
      this.nomeUsuario();
    }
  }

  nomeUsuario() {
    const email = this.auth.decodeToken().sub;
    return this.userService
      .getUsuarioByUsername(email)
      .subscribe((response) => {
        this.nomeUser = response.nome;
      });
  }

  sair() {
    const dialog = this.dialog.open(ConfirmarLogoutComponent);
    dialog.afterClosed().subscribe((Response) => {
      if (Response) {
        this.auth.logout();
        location.reload();
      }
    });
  }
}
