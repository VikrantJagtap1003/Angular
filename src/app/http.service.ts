import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string='http://localhost:9090/';
  constructor(private http:HttpClient) { }
  
  login(obj:any){
    let customerid=+obj;
    return (this.http.post(`${this.baseUrl}checkCustomerId/${customerid}`,null,{
      responseType:'text'
    }));
  }

  sendOTP(){
   return ( this.http.get(`${this.baseUrl}getOTP`,{
      responseType:'text'
    }))
  }

  getBillData(customerid:any){
    let data=+customerid;
    return (this.http.get(`${this.baseUrl}Bill-Payment/getByCustomer-id/${data}`))
  }

  getSpecificBillData(billid:any){
      let id=+billid;
      return (this.http.get(`${this.baseUrl}Bill-Payment/getById/${id}`))
  }



  getInvoiceData(billid:any){
    let id=+billid;
    return(this.http.get(`${this.baseUrl}getInvoiceInfo/${id}`));
  }

  paybillOnline(billObj:any){
    return (this.http.put(`${this.baseUrl}Bill-Payment/payBillOnline`,billObj,{
      responseType:'text'
    }))
  }

  getAllTransactions(customerId:any){
    let id=+customerId;
    return (this.http.get(`${this.baseUrl}getTransaction/${id}`));
  }

}
