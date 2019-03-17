import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { query } from '@angular/core/src/render3';

const endpoint = 'https://localhost:44334/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getProducts(query): Observable<any> {
    return this.http.get(endpoint + query).pipe(
      map(this.extractData));
  }
  
  addComment (comment, query): Observable<any> {
    console.log(comment);
    return this.http.post<any>(endpoint + query, JSON.stringify(comment), httpOptions).pipe(
      tap((task) => console.log(`added task w/ id=${task.id}`)),
      catchError(this.handleError<any>('addTask'))
    );
  }

  getTask(id, query): Observable<any> {
    return this.http.get(endpoint + query + id).pipe(
      map(this.extractData));
  }


  updateProduct (product, query): Observable<any> {
    return this.http.post(endpoint + query, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log("updating Product")),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  addProduct (address, query): Observable<any> {
    console.log(address);
    return this.http.post<any>(endpoint + query, JSON.stringify(address), httpOptions).pipe(
      tap((brand) => console.log(`added product w/ id=${address.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  deleteTask (id): Observable<any> {
    return this.http.post<any>(endpoint + 'api/Task/deleteTask', JSON.stringify(id), httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  deleteProduct (id, query): Observable<any> {
    return this.http.post<any>(endpoint + query + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}