import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Scategories } from './scategories';

@Injectable({
providedIn: 'root'
})
export class ScategoriesService {
[x: string]: any;
private apiURL = "http://localhost:3001/api";

constructor(private httpClient: HttpClient) { }

getAll(): Observable<any> {
return this.httpClient.get(this.apiURL + '/scategories/')
}

create(scategorie:Scategories): Observable<any> {

return this.httpClient.post(this.apiURL + '/scategories/',scategorie)
}

find(_id:object): Observable<any> {

return this.httpClient.get(this.apiURL + '/scategories/' + _id)
}

update(_id:object, scategorie:Scategories): Observable<any> {

return this.httpClient.put(this.apiURL + '/scategories/' + _id, scategorie)
}

delete(_id:object){
return this.httpClient.delete(this.apiURL + '/scategories/' + _id)
}

}