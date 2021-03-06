import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Response } from 'selenium-webdriver/http';

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

  public login(email: String, password: String): Promise<any> {
    const data = {email: email, password: password};
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8000/login' , data).subscribe(
        response => {
          resolve(response);
          var token_obtenido = response['token'];
          return this.storage.set(TOKEN_KEY, token_obtenido).then(() => {
            this.authenticationState.next(true);
           });
        },
        exeption => {
          reject(exeption);
        }
      );
    });
 
  }
  public register(name: String, email: String, password: String): Promise<any> {
    const data = {name: name, email: email, password: password};
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
