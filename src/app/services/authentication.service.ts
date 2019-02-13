import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Steve').then(() => {
      this.authenticationState.next(true);
    });
  }
  public register(name: String, email: String): Promise<any> {
    const data = {name: name, email: email};
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8000/register' , data).subscribe(
        response => {
          resolve(response);
        },
        exception => {
          reject(exception);
        }
      );
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
