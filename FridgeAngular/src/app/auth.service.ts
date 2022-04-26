import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { FridgeService } from './services/fridge.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private fridgeService: FridgeService) { 
    const token =  localStorage.getItem('jwt');
    this._isLoggedIn$.next(!!token);
  }

  login(data: any) {
    return this.fridgeService.login(data).pipe(
      tap(response => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('jwt', response);
      })
    );
  }
}
