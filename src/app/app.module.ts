import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DataTableModule } from "angular2-datatable";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ThemeComponent } from './theme/theme.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { ChooseAnonComponent } from './choose-anon/choose-anon.component';

import { DragulaModule } from 'ng2-dragula';
import { GaugeModule } from 'ng-gauge';
import { DndModule } from 'ng2-dnd';
import { CookieModule } from 'ngx-cookie';

import { VectorComponent } from './vector/vector.component';
import { ResultComponent } from './result/result.component';
import { ResultItem } from './result/resultItem.component';
import { ResultService } from './result/result.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'theme', component: ThemeComponent },
  { path: 'choose-anon', component: ChooseAnonComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThemeComponent,
    InteractiveComponent,
    ChooseAnonComponent,
    VectorComponent,
    ResultComponent,
    ResultItem
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    DataTableModule,
    DragulaModule,
    GaugeModule,
    DndModule.forRoot(),
    CookieModule.forRoot()
  ],
  providers: [ResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
