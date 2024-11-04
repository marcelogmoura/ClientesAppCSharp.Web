import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-editar-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css',
})

export class EditarClientesComponent {
    
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  id: string = '';
  
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private spinnerService : NgxSpinnerService
  ) { }
  
  ngOnInit() {
  
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
  
    // this.httpClient.get('https://localhost:7116/api/clientes/' + this.id)
    this.httpClient.get(environment.clientesApi +"/" + this.id)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data);  
          this.spinnerService.hide();
        }
      })
  }

  
  
  form = new FormGroup({

    nome: new FormControl('', [
      Validators.required, Validators.minLength(6),
      Validators.maxLength(150)
    ]),

    email: new FormControl('', [
      Validators.required, Validators.email
    ]),

    cpf: new FormControl('', [
      Validators.required, Validators.pattern(/^\d{11}$/)
    ])

  });
  
  get f() {
    return this.form.controls;
  }

  onSubmit() {
  
    this.mensagemSucesso = '';
    this.mensagemErro = '';  
    this.spinnerService.show();

    this.httpClient.put('https://localhost:7116/api/clientes/' + this.id, this.form.value)
      .subscribe({  
        next: (data: any) => {    
          this.mensagemSucesso = `${data.nome} atualizado com sucesso.` ;
          this.spinnerService.hide();
        },
        error: (e) => {  
          this.mensagemErro = e.error.message;
          this.spinnerService.hide();
        }
      });
  }
}