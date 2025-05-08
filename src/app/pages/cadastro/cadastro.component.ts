import { Component } from '@angular/core';
import { ToolbarComponent } from "../../components/common/toolbar/toolbar.component";
import { CadastroLayoutComponent } from "../../components/layouts/cadastro-layout/cadastro-layout.component";

@Component({
  selector: 'app-cadastro',
  imports: [ToolbarComponent, CadastroLayoutComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

}
