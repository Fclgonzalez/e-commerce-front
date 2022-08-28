import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/user/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup= this.fb.group({
    nome: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    identificacao: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Cadastre-se')
  }

  cadastrarConsumidor(): void {
    const login: User = this.cadastroForm.value
    this.authService.cadastrarConsumidor(login)
      .subscribe(
        () => {
          this.snackbar.open('Cadastrado com sucesso.', 'Ok', {
            duration: 3000
        })
         this.router.navigateByUrl('/auth/email')
  })
  }

}
