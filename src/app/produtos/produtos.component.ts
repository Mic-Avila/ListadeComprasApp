import { Component, OnInit } from '@angular/core';
import { Produto } from '../interfaces/Produto';
import { Guid } from 'guid-typescript';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  faCheckCircle = faCheckCircle
  produtos: Produto[] = []
  formulario: any


  constructor(){}



  ngOnInit() {
    this.formulario = new FormGroup({
      id: new FormControl(),
      descricao: new FormControl(),
      quantidade: new FormControl(),
      foiComprado: new FormControl()
    })
    this.exibirProdutos()
  }

  cadastrarProduto(){
    this.formulario.value.id = Guid.create().toString()
    this.formulario.value.foiComprado = false
    const produto: Produto = this.formulario.value
    this.produtos.push(produto)
    localStorage.setItem("BD", JSON.stringify(this.produtos))
    this.formulario.reset()
  }


  exibirProdutos(){
    const bd = localStorage.getItem('BD')
    if(bd){
      this.produtos = JSON.parse(bd)
    }else{
      this.produtos = []
    }
  }

  atualizarProduto(id: string){
    const prodSelecionado: number = this.produtos.findIndex(prod => prod.id === id)
    if(this.produtos[prodSelecionado].foiComprado){
      this.produtos[prodSelecionado].foiComprado = false
    }else{
      this.produtos[prodSelecionado].foiComprado = true
    }
    localStorage.setItem("BD", JSON.stringify(this.produtos))
  }
}
