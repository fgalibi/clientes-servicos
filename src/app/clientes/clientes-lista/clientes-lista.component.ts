import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[];
  clienteSelecionado: Cliente;
  mensagemSucesso: String = '';
  mensagemErro: String = '';

  constructor(
    private service: ClientesService,
    private router: Router
  ) {
    this.clientes = [];
    this.clienteSelecionado = new Cliente();
  }

  ngOnInit(): void {
    this.service.getClientes().subscribe(response => {
      this.clientes = response;
    })
  }

  novoCadastro(): void {
    this.router.navigate(['/clientes/form']);
  }

  prepareDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;

  }

  deletarCliente() {
    this.service.deletar(this.clienteSelecionado)
      .subscribe( 
        response => { 
          this.mensagemSucesso = 'Cliente deletado com sucesso!';
          this.ngOnInit()
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar cliente.'
        )
    console.log(this.clienteSelecionado)
  }

}
