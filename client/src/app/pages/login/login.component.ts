import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  tcKimlikNo: number = 10000000000;
  sifre: number = 1000;

  constructor() {}

  ngOnInit(): void {}

  girisYap() {
    if (
      this.tcKimlikNo < 10000000000 ||
      typeof this.tcKimlikNo != 'number' ||
      this.tcKimlikNo > 99999999999
    ) {
      alert('Hatalı Tc Kimlik Numarası');
    } else if (
      this.sifre < 1000 ||
      this.sifre > 9999 ||
      typeof this.sifre != 'number'
    ) {
      alert('Hatalı Şifre');
    } else {
      alert(`TC ${this.tcKimlikNo}\nSifre ${this.sifre}`);
    }
  }
}
