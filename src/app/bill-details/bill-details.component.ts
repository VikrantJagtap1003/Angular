import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { bill } from '../model/bill';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {

  billdata:any[]=[];
  
  constructor(private service:HttpService,
    private router:Router) { }

  ngOnInit(): void {
    this.getbilldetails();
  }
  getbilldetails(){
    let customerid=sessionStorage.getItem('customerId');
    this.service.getBillData(customerid).subscribe((response:any)=>{
      this.billdata=response;
    })
  }

  payBill(billid:any){
    this.router.navigate(["/payBill",billid])
  }

  showBill(billid:any){
    this.router.navigate(["/viewBill",billid]);
  }
  

}
