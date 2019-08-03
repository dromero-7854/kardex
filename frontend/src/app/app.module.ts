import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';

import { ProductCrudComponent } from './components/product-crud/product-crud.component';
import { SnackbarsComponent } from './components/snackbars/snackbars.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IncDecStockComponent } from './components/inc-dec-stock/inc-dec-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCrudComponent,
    SnackbarsComponent,
    ConfirmationDialogComponent,
    IncDecStockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProductCrudComponent, IncDecStockComponent, SnackbarsComponent, ConfirmationDialogComponent]
})
export class AppModule { }
