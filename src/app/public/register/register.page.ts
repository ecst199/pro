import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: String = '';
  email: String = '';
  password: String = '';
  repeat_password: String = '';
  isValid: Boolean = false;
  busy: Promise<any>;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.email = '';
    this.name = '';
    this.password = '';
    this.repeat_password = '';
  }

  register() {
    if ( this.password === this.repeat_password ) {
      this.isValid = false;
      this.authService.register(this.name, this.email, this.password).then( response => {
        alert('Registro Completo');
      }).catch( exception => {
        alert('El registro no fue exitoso contactese con el administrador');
        console.log(exception);
      });
    } if ( this.password !== this.repeat_password ) {
      this.isValid = true;
    }
  }
}
