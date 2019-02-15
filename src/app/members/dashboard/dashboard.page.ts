import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html'

})
export class DashboardPage implements OnInit {
padre: any = 0;
hijo: String ='';
moviendo: Boolean = false;
trebejos0: Object = ["♖","♘","♗","♕","♔","♗","♘","♖"];
trebejos1: Object = "♙";
f: any = 0;
c: any = 0;
m: any = 0;
i: any = 0;

  constructor(private authService: AuthenticationService) { }
  tablero1() {
    var escaques: HTMLTableElement = <HTMLTableElement> document.getElementById("tablero");

    for(this.f=0; this.f<8; this.f++) {
      let fila = escaques.insertRow();
      for(this.c=0; this.c<8; this.c++){
        var celda = fila.insertCell();
        if(this.f==0) celda.innerHTML = "<span class=negras>"+this.trebejos0[this.c]+"</span>";
        else if(this.f==1) celda.innerHTML = "<span class=negras>"+this.trebejos1+"</span>";
        else if(this.f==6) celda.innerHTML = "<span class=blancas>"+this.trebejos1+"</span>";
        else if(this.f==7) celda.innerHTML = "<span class=blancas>"+this.trebejos0[this.c]+"</span>";
      }
    }
    let movible = document.querySelectorAll("td");
    for(this.m=0; this.m<movible.length; this.m++) {
      let numero = movible[this.m];
    movible[this.m].addEventListener('click', () => this.juega(numero), false);
}
  }
  juega(T) {

    var elementos = document.querySelectorAll("table, table span");

    if(!this.moviendo && T.firstElementChild){
    this.padre = T;
    this.hijo = T.innerHTML;

    for(this.i=0; elementos[this.i]; this.i++) elementos[this.i].classList.add("mano");

    T.querySelector("span").style.opacity = ".4";

    this.moviendo = true;
    }

    else if(this.moviendo){
    this.padre.innerHTML = "";
    T.innerHTML = this.hijo;

    for(this.i=0; elementos[this.i]; this.i++) elementos[this.i].classList.remove("mano");

    this.moviendo = false;
    }


    }
  ngOnInit() {
    this.tablero1();
  }
  logout() {
    this.authService.logout();
  }
}
