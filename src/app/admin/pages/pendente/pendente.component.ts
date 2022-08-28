import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pendente',
  templateUrl: './pendente.component.html',
  styleUrls: ['./pendente.component.css']
})
export class PendenteComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Pendente')
  }

}
