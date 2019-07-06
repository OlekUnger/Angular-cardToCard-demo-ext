import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, filter, map, switchMap, tap} from 'rxjs/operators';

export interface Transaction {
    id?: string;
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
    static url = 'https://ungers-cardtocard-demo.firebaseio.com/transactions';

    constructor(private http: HttpClient) {
    }

    create(transaction: Transaction): Observable<any> {
        return this.http.post<Transaction>(`${TransactionService.url}.json`, transaction);
    }

    getAll(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${TransactionService.url}.json`)
            .pipe(map(transactions => {
                if (!transactions) {
                    return [];
                } else {
                    return Object.keys(transactions)
                        .map(key => ({...transactions[key], id: key}))
                }
            }))
    }

    repeat(id: string): Observable<any> {
        return this.http.get<Transaction[]>(`${TransactionService.url}/${id}.json`)
    }

    remove(id: string): Observable<Transaction[]> {
        return this.http.delete<Transaction[]>(`${TransactionService.url}/${id}.json`)
    }
}
