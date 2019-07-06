import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Transaction, TransactionService} from '../shared/transaction.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

    form: FormGroup;
    months: number[] = [];
    years: number[] = [];
    namePattern: RegExp = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    cardNumberPattern: RegExp = /^[0-9]{4}(?!.)/;
    amountPattern: RegExp = /^[0-9]+$/;
    transaction: Transaction;
    message = '';
    private subscriptions = new Subscription();

    constructor(private transactionService: TransactionService, private route: ActivatedRoute, private fb: FormBuilder) {
        this.subscriptions.add(this.route.queryParams.subscribe((params: Params) => {
            if (params) {
                this.transactionService.repeat(params.id)
                    .subscribe(data => {
                        if (data) {
                            console.log(data)
                            this.buildForm(data)
                        }
                    });
            }
        }))
    }

    ngOnInit() {
        this.months = Array(12).fill(0).map((e, i) => i + 1);
        this.years = Array(10).fill(0).map((e, i) => 18 + i + 1);

        this.buildForm(null);
    }

    private buildForm(data) {
        this.form = this.fb.group({
            amount: [this.getField(data, 'amount'), [Validators.required, this.validateByPattern(this.amountPattern)]],
            fio: [this.getField(data, 'fio'), [Validators.required, this.validateByPattern(this.namePattern)]],
            activeMonth: [this.getField(data, 'activeMonth'), Validators.required],
            activeYear: [this.getField(data, 'activeYear'), Validators.required],
            customerCardNumber: this.fb.array(Array(4).fill(0)
                .map((item, ind) => item = this.fb.control(
                    this.getField(data, 'customerCard').split(' ')[ind], [Validators.required, this.validateByPattern(this.cardNumberPattern)]))),
            consumerCardNumber: this.fb.array(Array(4).fill(0)
                .map((item, ind) => item = this.fb.control(
                    this.getField(data, 'consumerCard').split(' ')[ind], [Validators.required, this.validateByPattern(this.cardNumberPattern)])))
        });
    }

    private getField(data, field) {
        if (data && data.hasOwnProperty(field)) {
            return data[field];
        }
        return '';
    }

    private validateByPattern = (pattern: RegExp) => (control: FormControl): { [s: string]: boolean } => {
        const valid = !control.value || pattern.test(control.value);

        if (!valid) {
            return {error: true};
        }
        return null;
    };

    private showMessage(message: string) {
        this.message = message;
        window.setTimeout(() => {
            this.message = '';
        }, 2000);
    }


    onSubmit() {
        this.form.disable();
        const formData = this.form.value;
        const {amount, fio, activeMonth, activeYear} = formData;
        this.transaction = {
            customerCard: formData.customerCardNumber.join(' '),
            consumerCard: formData.consumerCardNumber.join(' '),
            amount: amount,
            date: new Date(),
            fio: fio.trim().toLocaleLowerCase(),
            activeMonth: Number(activeMonth),
            activeYear: Number(activeYear),
        };
        this.subscriptions.add(this.transactionService.create(this.transaction)
            .subscribe(
                (data: Transaction) => {
                    this.showMessage('Успешно');
                    this.form.reset();
                    this.form.enable();
                },
                error => {
                    this.showMessage('Ошибка');
                    this.form.enable();
                }
            )
        )

    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

}
