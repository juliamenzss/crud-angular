import { Component } from '@angular/core';
import { ToolbarComponent } from "../../components/common/toolbar/toolbar.component";
import { ConsultaLayoutComponent } from "../../components/layouts/consulta-layout/consulta-layout.component";

@Component({
  selector: 'app-consulta',
  imports: [
    ToolbarComponent,
    ConsultaLayoutComponent
],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {

}
