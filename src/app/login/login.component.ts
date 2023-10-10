import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  idPattern="^[0-9]+$";
  otp:string='';
  msg:string="";
  isotpsend:boolean=true;
  constructor(private service:HttpService,
    private router:Router) { }

  ngOnInit(): void {
    document.body.className="background";
  }

  onSubmit(f:NgForm){
    
    let customerid=f.value.customerId;
    let userotp=f.value.otp;
    this.service.login(customerid)
    .subscribe((response:any)=>{
      if(response==="Valid user" && this.otp===userotp){
        // navigate to dashboard
        sessionStorage.setItem("customerId",customerid);
        this.router.navigate(['/home']);
      }else{
        alert("InValid user")
      }
    })

  }
  sendOTP(){
    this.service.sendOTP().subscribe((response)=>{
      this.otp=response;
      alert(`your otp is ${response}`);
    })
    this.isotpsend=true;
  }
  ngOnDestroy(): void {
    document.body.className=" ";
  }
  

}
