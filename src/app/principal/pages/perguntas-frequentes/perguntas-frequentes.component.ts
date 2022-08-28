import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-perguntas-frequentes',
  templateUrl: './perguntas-frequentes.component.html',
  styleUrls: ['./perguntas-frequentes.component.css'],
})
export class PerguntasFrequentesComponent implements OnInit {
  perguntas: Array<any> = [
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 01',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 01',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 02',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 02',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 03',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 03',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 04',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 04',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 05',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 05',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 06',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 06',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 07',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 07',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 08',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 08',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 09',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 09',
    },
    {
      pergunta:
        'nostrum maiores voluptate quam sunt amet ut quod! Hic quasi dolorum deserunt soluta? Pergunta 10',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quo Resposta 10',
    },
  ];

  constructor(
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Perguntas frequentes')
  }
}
