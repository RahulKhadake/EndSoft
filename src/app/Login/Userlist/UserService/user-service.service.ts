import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {




  constructor(private http_:HttpClient) { }


  APIURL="http://localhost:3000/UserlistDataEndSoft";



  GetData()
  {
   return this.http_.get(this.APIURL);
  }
  postAPIdata(user:any):Observable<any>{
    return this.http_.post(this.APIURL,user);
  }

  updateEmployee(id:any, user:any){
    return this.http_.put(`${this.APIURL}/${id}`, user)
  }

  delete(id:any){
    return this.http_.delete(`${this.APIURL}/${id}`)
  }
}
