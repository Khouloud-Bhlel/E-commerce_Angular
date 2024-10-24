import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categories } from './categories';
@Injectable({
providedIn: 'root'
})
export class CategoriesService {
[x: string]: any;
private apiURL = "http://localhost:3001/api";

constructor(private httpClient: HttpClient) { }

getAll(): Observable<any> {
return this.httpClient.get(this.apiURL + '/categories/')
}

create(categorie:Categories): Observable<any> {

return this.httpClient.post(this.apiURL + '/categories/',categorie)
}

find(_id:object): Observable<any> {

return this.httpClient.get(this.apiURL + '/categories/' + _id)
}

update(_id:object, categorie:Categories): Observable<any> {

return this.httpClient.put(this.apiURL + '/categories/' + _id, categorie)
}

delete(_id:object){
return this.httpClient.delete(this.apiURL + '/categories/' + _id)
}
uploadSignature(vals: any): Observable<any>{
    let data = vals;
    return this.httpClient.post('https://api.cloudinary.com/v1_1/dwfak8a7f/image/upload',data)
  
    }
}