import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { DatePipe } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { ClipboardModule } from '@angular/cdk/clipboard';
import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { HorizonApiService } from './horizon-api.service';
import { RouterRoutingModule } from "./router-routing.module";

import { HeaderComponent } from './header/header.component';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { ProposalSummaryComponent } from './proposal-summary/proposal-summary.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    HeaderComponent,
    ProposalDetailsComponent,
    ProposalSummaryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule


  ],
  providers: [HorizonApiService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
