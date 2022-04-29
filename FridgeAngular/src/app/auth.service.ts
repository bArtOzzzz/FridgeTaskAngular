import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { FridgeService } from './services/fridge.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'fridgeTaskToken';
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private fridgeService: FridgeService) { 
    this._isLoggedIn$.next(!!this.token);
  }

  login(data: any) {
    return this.fridgeService.login(data).pipe(
      tap(response => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response);
      })
    );
  }
}
