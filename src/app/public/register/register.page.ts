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
  busy: Promise<any>;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.email = '';
    this.name = '';
  }

  register() {
    this.authService.register(this.name, this.email).then( response => {
      alert('Registro Completo');
    }).catch( exception => {
      console.log(exception);
    });
  }
}
