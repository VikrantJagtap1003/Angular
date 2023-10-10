import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billdata',
  templateUrl: './billdata.component.html',
  styleUrls: ['./billdata.component.css']
})
export class BilldataComponent implements OnInit {

  billdata:any[]=[];
  homepageviewdata:any[]=[];
  constructor(private service:HttpService,
    private router:Router ) { }

  ngOnInit(): void {
    this.getBillData();
  }

  getBillData(){
    let customerid=sessionStorage.getItem('customerId');
    this.service.getBillData(customerid).subscribe((response:any)=>{
      this.billdata=response;
      for(let i=0;i<this.billdata.length;i++){
        if(i>8){
          break;
        }
        else{
          this.homepageviewdata[i]=this.billdata[i];
        }
    }

    })

    
  }

  toDetails(){

    this.router.navigate(["/billDetails"])
  }

  transactionDetails(){
    this.router.navigate(["/transactions"])
  }

  
}
