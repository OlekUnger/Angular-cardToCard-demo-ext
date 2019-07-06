import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

export interface Transaction {
    id?: number;
    consumerCard: string;
    customerCard: string;
    amount: number;
    date: Date;
    fio: string;
    activeMonth: number;
    activeYear: number;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private transaction = null;

    constructor(private http: HttpClient) {
    }

    create(transaction: Transaction): Observable<any> {
        return this.http.post<Transaction>(`http://localhost:3000/transactions`, transaction);
    }

    getAll(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`http://localhost:3000/transactions`);
    }

    remove(id: number): Observable<Transaction[]> {
        return this.http.delete<Transaction[]>(`http://localhost:3000/transactions?id=${id}`);

    }
    repeat(id: number): Observable<any> {
        return this.http.get<Transaction>(`http://localhost:3000/transactions?id=${id}`)
            .pipe(
                switchMap((data: any)=>{
                    return data;
                })
            )
    }

}
