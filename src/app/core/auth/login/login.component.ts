import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  styleUrl: './login.component.scss',
  template:
    `
  <div class="centeredContent">
  <form>
  <p>Pagina login</p>

  <input type="text" placeholder="Inserisci il nome" [required]="true" formControlName = "name" [minLength]="4"> <br>

  <input type="password" placeholder="Inserisci password" required="true" > <br>

  <button> Conferma </button>

  </form>
</div>
  `
})
export class LoginComponent {

}
