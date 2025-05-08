import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLayoutComponent } from './cadastro-layout.component';

describe('CadastroLayoutComponent', () => {
  let component: CadastroLayoutComponent;
  let fixture: ComponentFixture<CadastroLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
