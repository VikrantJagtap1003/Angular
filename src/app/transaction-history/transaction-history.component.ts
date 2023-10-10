import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactions:any[]=[];
  constructor(private service:HttpService,
    private router:Router) { }

  ngOnInit(): void {
    this.viewTransactions();
  }

  viewTransactions(){
    console.log("inserted")
    let id=sessionStorage.getItem("customerId")
      this.service.getAllTransactions(id).subscribe((response:any)=>{
        this.transactions=response;
        console.log(id);
      })
  }

}
