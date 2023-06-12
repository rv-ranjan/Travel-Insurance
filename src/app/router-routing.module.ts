import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { ProposalSummaryComponent } from './proposal-summary/proposal-summary.component';
const routes: Routes = [
  { path: 'quotes', component: QuoteComponent },
  { path: 'proposal', component: ProposalDetailsComponent },
  { path: 'proposal-summary', component: ProposalSummaryComponent }
  // { path: '**', redirectTo: '/quotes?SID=SRN-RS5FHH44-FNEL-9UCG-2QIC-S9OVIQS5XHQZ_6369791&ClientID=2', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }  
export const AppRoutingComponents = [QuoteComponent, ProposalDetailsComponent, ProposalSummaryComponent];
