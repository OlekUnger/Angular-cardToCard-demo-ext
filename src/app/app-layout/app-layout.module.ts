import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateComponent} from './create/create.component';
import {HistoryComponent} from './history/history.component';
import {AddZeroBeforeNumberPipe} from '../shared/pipes/add-zero-before-number.pipe';
import {AppLayoutRoutingModule} from './app-layout-routing.module';
import {AppLayoutComponent} from './app-layout.component';
import {CardNumberPipe} from '../shared/pipes/card-number.pipe';
import {MomentPipe} from '../shared/pipes/moment.pipe';

@NgModule({
    declarations: [
        CreateComponent,
        HistoryComponent,
        AppLayoutComponent,
        AddZeroBeforeNumberPipe,
        CardNumberPipe,
        MomentPipe
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AppLayoutRoutingModule
    ]
})
export class AppLayoutModule {
}

