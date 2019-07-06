import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreateComponent} from './create/create.component';
import {HistoryComponent} from './history/history.component';
import {AppLayoutComponent} from './app-layout.component';


const routes: Routes = [
    {
        path: '', component: AppLayoutComponent, children: [
            {path: '', redirectTo: '/create', pathMatch: 'full'},
            {path: 'create', component: CreateComponent},
            {path: 'create/:id', component: CreateComponent},
            {path: 'history', component: HistoryComponent}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLayoutRoutingModule {
}
