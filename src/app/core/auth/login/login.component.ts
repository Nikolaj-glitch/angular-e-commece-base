import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
        <br>

        <!-- Password Input -->
        <input type="password" formControlName="password">
        <small *ngIf="login.get('password')?.invalid && login.get('password')?.touched">
          La password è richiesta e deve avere almeno 6 caratteri.
        </small>
        <br>

        <!-- Submit Button -->
        <button type="submit" [disabled]="login.invalid">Conferma</button>
      </form>
    </div>
  `
})

export class LoginComponent {
  // Devo controllare qui se il JWT token è il mio

  login: FormGroup;

  constructor(private formbuilder: FormBuilder, private http: HttpClient) {

    //FormGroup ci permette di gestire i componenti dei form come un unico componente
    this.login = this.formbuilder.group({
      //Il primo parametro indica la stringa iniziale
      name: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get form() {

    return this.login.controls;

  }

  onSubmit() {
    if (this.login.invalid) {
      return;
    }
    console.log("Successful login", this.login.value);
  }
}
