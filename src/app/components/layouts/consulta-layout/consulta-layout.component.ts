import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../../service/cliente.service';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../../../types/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-layout',
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './consulta-layout.component.html',
  styleUrl: './consulta-layout.component.scss',
})
export class ConsultaLayoutComponent {
  consultaForm!: FormGroup;
  listaClientes: Cliente[] = [];
  colunasTabela: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento', 'acoes'];
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private readonly fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.consultaForm = this.createForm();
  }
  
  private createForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
    });
  }
  
  ngOnInit(){
    this.listaClientes = this.clienteService.pesquisarClientes('');
  }

  pesquisar() {
    const nome = this.consultaForm.get('nome')?.value || '';
    this.listaClientes = this.clienteService.pesquisarClientes(nome);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } })
    }

    praparaDeletar(cliente: Cliente){
      cliente.deletando = true;
    }

    deletar(cliente: Cliente) {
      this.clienteService.deletar(cliente);
      this.listaClientes = this.clienteService.pesquisarClientes('');
      this.snack.open('Item deletado com sucesso!', 'Ok');
      }
}
