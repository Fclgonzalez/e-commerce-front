import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/user/models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    recaptcha: ['', Validators.required]

  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Login')
  }
  siteKey: string = '6LeDVSchAAAAAIns0CIpcMhwsc3AL0Xv8U902IYw'
  login(): void {
    const credenciais: User = this.loginForm.value
   
    if (credenciais !== undefined || credenciais !== null) {
      this.authService.login(credenciais)
        .subscribe(
          () => {

            this.snackbar.open('Logado com sucesso.', 'Ok', {
              duration: 3000
            })
            this.router.navigateByUrl('/user/perfil-usuario')
          }, (error) => {
            this.snackbar.open('Email ou Senha Inválidos', 'Ok', {
              duration: 12000
            })
            console.log(error)
          }
        )
    }

  }
}
