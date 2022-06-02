import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  //Create Resturant details using Post Method
  postResturant(data: any) {
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res: any) => {
      return res;
    }));
  }

  //Get Resturant details using Get Method
  getResturant() {
    return this._http.get("http://localhost:3000/posts");
  }

  //Update Resturant details using Put Method
  updateResturant(data: any, id: number) {
    return this._http.put("http://localhost:3000/posts/" + id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  //Delete Resturant using Delete Method
  deleteResturant(id: number) {
    return this._http.delete("http://localhost:3000/posts/" + id).pipe(map((res: any) => {
      return res;
    }));
  }

}
