import {Component, OnDestroy, OnInit} from '@angular/core';
import {Transaction, TransactionService} from '../shared/transaction.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {switchMap} from "rxjs/operators";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
    transactions: Transaction[] = [];
    loading: boolean = true;
    message: string = '';
    private subscriptions = new Subscription();

    constructor(private transactionService: TransactionService, private router: Router) {
    }

    ngOnInit() {
        this.getTransactions();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onRepeat(id: string) {
        this.subscriptions.add(this.transactionService.repeat(id)
            .subscribe(data => {
                    if (data) {
                        this.router.navigate(['/create'],
                            {
                                queryParams: {
                                    id: id
                                }
                            });
                    }
                },
                err => {
                    this.showMessage('Ошибка');
                }
            )
        )
    }

    onRemove(id: string) {
        this.subscriptions.add(this.transactionService.remove(id)
            .subscribe(() => {
                    this.transactions = this.transactions.filter(item => item.id !== id);
                },
                err => {
                    this.showMessage('Ошибка');
                }
            )
        )
    }

    getTransactions() {
        return this.subscriptions.add(this.transactionService.getAll()
            .subscribe(data => {
                    this.transactions = data;
                    this.loading = false;
                },
                err => {
                    this.showMessage('Ошибка');
                }
            )
        )
    }

    private showMessage(message: string) {
        this.message = message;
        window.setTimeout(() => {
            this.message = '';
        }, 2000);
    }

}
