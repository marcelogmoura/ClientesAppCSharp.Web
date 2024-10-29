import { Routes } from '@angular/router';
import { CadastrarClientesComponent } from './components/pages/cadastrar-clientes/cadastrar-clientes.component';
import { ConsultarClientesComponent } from './components/pages/consultar-clientes/consultar-clientes.component';

export const routes: Routes = [

    {
        path: 'pages/cadastrar-clientes', 
        component: CadastrarClientesComponent 
        },
        {
        path: 'pages/consultar-clientes', 
        component: ConsultarClientesComponent 
        },

        {
            path: '', pathMatch: 'full',
            redirectTo: '/pages/consultar-clientes'
        }

];
