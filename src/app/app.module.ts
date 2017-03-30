import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from 'ng2-bootstrap';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { ModalModule } from 'ng2-bootstrap/modal';

import { DataTableModule } from "angular2-datatable";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ThemeComponent } from './theme/theme.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { ChooseAnonComponent } from './choose-anon/choose-anon.component';

import { DragulaModule } from 'ng2-dragula';

import { GaugeModule } from 'ng2-kw-gauge';

import { DndModule } from 'ng2-dnd';

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
    ChooseAnonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    DataTableModule,
    DragulaModule,
    GaugeModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
