import {Component, OnDestroy, OnInit} from '@angular/core';
import {Transaction, TransactionService} from '../shared/transaction.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
    transactions: Transaction[] = [];
    oSub: Subscription;
    loader: boolean = true;

    constructor(private transactionService: TransactionService, private router: Router) {
    }

    ngOnInit() {
        this.oSub = this.transactionService.getAll()
            .subscribe(data => {
                this.transactions = data;
                this.loader = false;
            });
    }

    ngOnDestroy(): void {
        if (this.oSub) {
            this.oSub.unsubscribe();
        }
    }

    onRepeat(id: number) {
        this.transactionService.repeat(id).subscribe(data => {
            this.router.navigate(['/create'],
                {
                    queryParams: {
                        id: data['id']
                    }
                });
        });
    }

    onRemove(id: number) {
        this.oSub = this.transactionService.remove(id)
            .subscribe(data => {
                console.log(data);
            });
    }

}
