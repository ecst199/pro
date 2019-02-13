import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: String = '';
  password: String = '';
  busy: Promise<any>;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  login() {
    if (this.email === 'steve@mail.com') {
      if (this.password === '12345') {
        this.authService.login();
      } else {
        alert('Password Incorrecto');
      }
    } else {
      alert('Correo Incorrecto');
    }
  }
}
