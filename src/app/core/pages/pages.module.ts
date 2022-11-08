import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoute } from '@core/pages/pages.routes';
import { HeaderModule } from '@core/widgets/header/header.module';
import { FooterModule } from '@core/widgets/footer/footer.module';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    PagesRoute,
    CommonModule,
    HeaderModule,
    FooterModule,
  ]
})
export class PagesModule { }
