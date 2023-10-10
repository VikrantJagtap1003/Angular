import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { PayBillComponent } from './pay-bill/pay-bill.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  {
    path:"",redirectTo:"/login",pathMatch:"full"
  },
  {
    path:"login",component:LoginComponent
  },
  {
    path:"home",component:HomeComponent,canActivate:[AuthGuard]
  },
  {
    path:"billDetails", component:BillDetailsComponent,canActivate:[AuthGuard]
  },
  {
    path:"payBill/:id",  component:PayBillComponent,canActivate:[AuthGuard]
  },
  {
    path:"viewBill/:id",component:ViewBillComponent,canActivate:[AuthGuard]
  },
  {
    path:"transactions",component:TransactionHistoryComponent,canActivate:[AuthGuard]
  },
  {
    path:"**",component:NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
