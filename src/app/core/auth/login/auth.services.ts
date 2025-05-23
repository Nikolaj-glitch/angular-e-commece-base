import { Injectable } from '@angular/core';
import { createAction, props, createReducer, on, createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { environment } from '../../../../environment';
// --- SERVICE ---

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiLogin; // metti la tua API

  constructor(private http: HttpClient) { }

  login(credentials: { name: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, null, {
      headers: { Authorization: 'Basic ' + btoa(credentials.name + ':' + credentials.password) },
    });
  }
}

// --- ACTIONS ---

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');

// --- STATE INTERFACE ---

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

// --- INITIAL STATE ---

export const initialAuthState: AuthState = {
  token: localStorage.getItem('token'), // carica token da localStorage se presente
  loading: false,
  error: null,
};

// --- REDUCER ---

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { token }) => ({ ...state, token, loading: false })),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(logout, () => {
    localStorage.removeItem('token');
    return { token: null, loading: false, error: null };
  })
);

// --- SELECTORS ---

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectToken = createSelector(selectAuthState, (state) => state.token);
export const selectIsAuthenticated = createSelector(selectToken, (token) => !!token);
export const selectLoading = createSelector(selectAuthState, (state) => state.loading);
export const selectError = createSelector(selectAuthState, (state) => state.error);

// --- EFFECTS ---

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ username, password }) =>
        this.authService.login({ name: username, password }).pipe(
          map((response) => loginSuccess({ token: response.token })),
          catchError((error) => of(loginFailure({ error: error.message || 'Login failed' })))
        )
      )
    )
  );

  saveToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ token }) => localStorage.setItem('token', token))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) { }
}

// --- COMPONENT ESEMPIO ---

@Component({
  selector: 'app-login',
  template: `
    <div *ngIf="loading$ | async">Caricamento...</div>
    <div *ngIf="error$ | async as err" style="color:red">{{ err }}</div>
    <button (click)="doLogin()">Login</button>
    <button (click)="doLogout()">Logout</button>
    <div *ngIf="isLoggedIn$ | async">Sei loggato!</div>
  `,
})
export class LoginComponent {
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  isLoggedIn$ = this.store.select(selectIsAuthenticated);

  constructor(private store: Store) { }

  doLogin() {
    // esempio: username e password hardcoded
    this.store.dispatch(login({ username: 'admin', password: '1234' }));
  }

  doLogout() {
    this.store.dispatch(logout());
  }
}
