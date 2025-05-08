import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { Cliente } from '../../../types/client'
import { ClienteService } from '../../../service/cliente.service'
import { ActivatedRoute, Router } from '@angular/router'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { BrasilapiService } from '../../../service/brasilapi.service'
import { Estado, Municipio } from '../../../models/brasilapi.models'

@Component({
  selector: 'app-cadastro-layout',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective],
    providers:[provideNgxMask()],
  templateUrl: './cadastro-layout.component.html',
  styleUrls: ['./cadastro-layout.component.scss']
})

export class CadastroLayoutComponent {
  cliente: Cliente = Cliente.newCliente();
  cadastroForm: FormGroup;
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private readonly fb: FormBuilder, 
    private clienteService: ClienteService, 
    private brasilApiService: BrasilapiService,
    private route: ActivatedRoute, 
    private router: Router) {
    this.cadastroForm = this.createForm();
  }
  
  private createForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required]
    });
  }
  
  ngOnInit(){
    this.route.queryParamMap.subscribe((query: any) => {
      const id = query.get('id');
      if(id){
        let clienteEncontrado = this.clienteService.buscarClientePorId(id);
        if(clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          this.cadastroForm.patchValue(this.cliente);
          if(this.cliente.uf){
            const event = { value: this.cliente.uf };
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
      }
    })
    this.carregarUFs();
  }

  carregarUFs(){
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log('ocorreu um erro', erro)
    })
  }

  carregarMunicipios(event: MatSelectChange){
    const ufSelecionada = event.value;
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log('ocorreu um erro', erro),
    })
  }
  salvar(){
    if(this.cadastroForm.valid){
      const formValues = this.cadastroForm.value;
      this.cliente = {
        ...this.cliente,
        ...formValues
      };
      if(!this.atualizando){
        this.clienteService.salvar(this.cliente);
        this.cliente = Cliente.newCliente();
        this.mostrarMensagem('Salvo com sucesso!')
      } else{
        this.clienteService.atualizar(this.cliente);
        this.router.navigate(['/consulta']);
        this.mostrarMensagem('Atualizado com sucesso!')
      }
    }
  }
  limparCampos(){
    this.cadastroForm.setValue({
      nome: '',
      email: '',
      cpf: '',
      dataNascimento: ''
    });
    this.cadastroForm.markAsPristine();
    this.cadastroForm.markAsUntouched();
  }

  mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, "Ok");
  }
}