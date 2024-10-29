import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consultar-clientes.component.html',
  styleUrl: './consultar-clientes.component.css'
})
export class ConsultarClientesComponent {

  clientes: any[] = [];

  constructor(
    private httpClient : HttpClient
  ){}

  ngOnInit() {
    this.httpClient.get('https://localhost:7116/api/clientes')
    .subscribe({
      next: ( data ) => {
        this.clientes = data as any[];
      }
    })
  }


}
