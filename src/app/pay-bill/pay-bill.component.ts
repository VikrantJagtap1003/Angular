import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router,ActivatedRoute } from '@angular/router';
import { bill } from '../model/bill';
import { invoiceInfo } from '../model/invoice';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit {
  cardPattern="^[0-9]+$";
  nameValidation="^[a-z A-Z]+$";
  billtopay:any=<bill>{};
  invoiceinfo:any=<invoiceInfo>{};
  selectedPaymentMethod: string = '';
  amounttopay!:number;
  ccardvalue!:string;
  dcardValue!:string

  constructor(private service:HttpService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getIdFromURL();
  }

  getIdFromURL(){
      
      this.route.paramMap.subscribe((pragma)=>{
        this.service.getSpecificBillData(pragma.get("id")).subscribe((response)=>{
          this.billtopay=response; 
          console.log(this.billtopay.billId)
          this.service.getInvoiceData(this.billtopay.billId).subscribe((response)=>{
            this.invoiceinfo=response;
             let date=new Date(this.billtopay.billDueDate);
             let currentdate=new Date();

            if(date.toISOString()>currentdate.toISOString()){
              this.amounttopay=this.invoiceinfo.beforeDueDateAmout;
            }
            else{
              this.amounttopay=this.invoiceinfo.afterDueDateAmout;
            }
        })
        })  
      })
  }

  onSubmit(form: NgForm){
    
    console.log(form.controls['paymentMethod'].value);
  }

  return(){
    this.router.navigate(['/billDetails']);
  }
  // code line get 

  payCredit(expirydate:any){
    let date=new Date();
    let year=23;
    let month=date.getMonth();
    let convertedvalue=<string> expirydate.value;
    let usermonth=+convertedvalue.substring(0,2);
    let useryear=+convertedvalue.substring(3);
    if(usermonth>month && useryear>=year){
      console.log("valid");
      Swal.fire(
        'success',
        'payment done successfully',
        'success'
      )
      this.service.paybillOnline(this.billtopay).subscribe((response)=>{
        if(response==="Done"){
          this.router.navigate(['/billDetails']);
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Card is Expired!',
        footer: 'please visit nearby center for cash Payment'
      })
    }
    
  }

  payDebit(expirydate:any){
    let date=new Date();
    let year=23;
    let month=date.getMonth();
    let convertedvalue=<string> expirydate.value;
    let usermonth=+convertedvalue.substring(0,2);
    let useryear=+convertedvalue.substring(3);
    console.log(usermonth);
    console.log(useryear);
    if(usermonth>month && useryear>year){
      console.log("valid");
    }

    Swal.fire(
      'success',
      'payment done successfully',
      'success'
    )
    this.service.paybillOnline(this.billtopay).subscribe((response)=>{
      if(response==="Done"){
        this.router.navigate(['/billDetails']);
      }
    })
  }

}
