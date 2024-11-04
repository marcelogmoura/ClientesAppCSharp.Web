import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CapitalizePipe } from '../../../capitalize.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination'
import { NgxSpinnerService } from 'ngx-spinner'
import { NgxMaskPipe } from 'ngx-mask';



@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,        
    CapitalizePipe,
    NgxPaginationModule,
    NgxMaskPipe
  ],
  templateUrl: './consultar-clientes.component.html',
  styleUrl: './consultar-clientes.component.css'
})
export class ConsultarClientesComponent {

  clientes: any[] = [];  
  pagina: number = 1;
  mensagemSucesso: string = '';


  constructor(
    private httpClient : HttpClient,
    private activatedRoute : ActivatedRoute ,
    private spinnerService : NgxSpinnerService,    

  ){}

  ngOnInit() {
    this.spinnerService.show();

    this.httpClient.get(environment.clientesApi)
    .subscribe({
      next: ( data ) => {
        this.clientes = data as any[];
        this.spinnerService.hide();
      }
    });
  }

  onDelete(id:string) {
    if(confirm('excluir?')){
      this.spinnerService.show();

      this.httpClient.delete(environment.clientesApi + "/" + id)
        .subscribe({
          next: (data: any) => {
            alert(`${data.nome} excluido com sucesso`);
            this.ngOnInit();
            this.spinnerService.hide();
          }
        })
    }
    
  }

  handlePageChange(event : any) {
    this.pagina = event;
  }


}
