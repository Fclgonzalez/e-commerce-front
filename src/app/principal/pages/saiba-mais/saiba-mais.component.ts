import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-saiba-mais',
  templateUrl: './saiba-mais.component.html',
  styleUrls: ['./saiba-mais.component.css']
})
export class SaibaMaisComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Saiba mais')
  }

}
