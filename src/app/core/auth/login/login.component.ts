import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  styleUrl: './login.component.scss',
  template: `
    <div class="centeredContent">
      <form [formGroup]="login" (ngSubmit)="onSubmit()">
        <p>Pagina login</p>

        <!-- Name Input -->
        <input type="text" formControlName="name">
        <small *ngIf="login.get('name')?.invalid && login.get('name')?.touched">
          Il nome è richiesto e deve avere almeno 2 caratteri.
        </small>
        <br />

        <!-- Password Input -->
        <input type="password" formControlName="password">
        <small *ngIf="login.get('password')?.invalid && login.get('password')?.touched">
          La password è richiesta e deve avere almeno 6 caratteri.
        </small>
        <br />

        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button type="submit" [disabled]="login.invalid">Conferma</button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  // Devo controllare qui se il JWT token è il mio

  login: FormGroup;
  errorMessage: string = '';

  //Logica per condizioni utente
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) {
    //FormGroup ci permette di gestire i componenti dei form come un unico componente
    this.login = this.formbuilder.group({
      //Il primo parametro indica la stringa iniziale
      name: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get form() {
    return this.login.controls;
  }

  onSubmit() {
    if (this.login.invalid) {
      return;
    }

    //Usato authService.login() dentro onSubmit(), così la richiesta va al server.
    this.authservice.login(this.login.value).subscribe({
      next: () => {
        console.log('Login avvenuto con successo!', this.login.value);
        this.router.navigate(['/dashboard']); //per ora ho messo dashboard una volt avvenuto il login poi vediamo
      },
      error: (err) => {
        console.error('errore autenticazione', err);
        this.errorMessage = 'Credenziali non valide. Riprova.';
      },
    });
  }
}
