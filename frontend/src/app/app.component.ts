// dependencies
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
// models
import { Product } from './models/core.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// enviroment
import { environment as env } from '../environments/environment';
// components
import { ProductCrudComponent } from './components/product-crud/product-crud.component';
import { IncDecStockComponent } from './components/inc-dec-stock/inc-dec-stock.component';
// service
import { SnackbarService } from './services/snackbar.service';

const products = [
  {
    id: 1,
    code: 'AA11',
    description: 'Batman - Fase 1',
    stock: 50
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }

  title = 'hulk-store';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['id', 'code', 'description', 'stock', 'actions'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.http.get<Product[]>(env.baseUrl + '/products', {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
      observe: 'response'
    }).subscribe(resp => {
      this.dataSource.data = resp.body;
      this.cd.detectChanges();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    const modalRef = this.modalService.open(ProductCrudComponent, { backdrop: 'static', centered:true });
    let subs: Subscription = modalRef.componentInstance.passEntry.subscribe((newProduct: Product) => {
      this.http.post<Product>(env.baseUrl + '/products', newProduct, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response'
      }).subscribe(resp => {
        this.snackbarService.openSuccesMessage('Producto agregado con éxito.');
        this.dataSource.data.push(resp.body);
        this.dataSource._updateChangeSubscription();
      })
      subs.unsubscribe();
      modalRef.close();
    })
  }

  update(product: Product) {
    const modalRef = this.modalService.open(ProductCrudComponent, { backdrop: 'static', centered:true });
    modalRef.componentInstance.product = product;
    let subs: Subscription = modalRef.componentInstance.passEntry.subscribe((updatedProduct: Product) => {
      this.http.put<Product>(env.baseUrl + '/products', updatedProduct, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response'
      }).subscribe(resp => {
        this.snackbarService.openSuccesMessage('Producto editado con éxito.');
        let product = this.dataSource.data.find(element => element.id == updatedProduct.id);
        product.code = updatedProduct.code;
        product.description = updatedProduct.description;
        product.stock = updatedProduct.stock;
        this.dataSource._updateChangeSubscription();
      })
      subs.unsubscribe();
      modalRef.close();

    })
  }

  delete(product: Product) {
    this.http.delete<Product>(env.baseUrl + '/products/' + product.id).subscribe(resp => {
      console.log(resp);
      this.snackbarService.openSuccesMessage('Producto eliminado con éxito.');
      let index = this.dataSource.data.findIndex(elem => elem.id == product.id);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    })
  }

  increase(product: Product) {
    const modalRef = this.modalService.open(IncDecStockComponent, { backdrop: 'static', centered:true });
    modalRef.componentInstance.inc = true;
    let subs: Subscription = modalRef.componentInstance.passEntry.subscribe((output: any) => {
      this.http.put<Product>(env.baseUrl + '/products/' + product.id + '/increase/' + output.incDecValue, {}, {
        observe: 'response'
      }).subscribe(resp => {
        this.snackbarService.openSuccesMessage('Stock incrementado con éxito.');
        let product = this.dataSource.data.find(element => element.id == resp.body.id);
        product.code = resp.body.code;
        product.description = resp.body.description;
        product.stock = resp.body.stock;
        this.dataSource._updateChangeSubscription();
      })
      subs.unsubscribe();
      modalRef.close();
    })
  }

  decrease(product: Product) {
    const modalRef = this.modalService.open(IncDecStockComponent, { backdrop: 'static', centered:true });
    modalRef.componentInstance.inc = false;
    let subs: Subscription = modalRef.componentInstance.passEntry.subscribe((output: any) => {
      this.http.put<Product>(env.baseUrl + '/products/' + product.id + '/decrease/' + output.incDecValue, {}, {
        observe: 'response'
      }).subscribe(resp => {
        this.snackbarService.openSuccesMessage('Stock decrementado con éxito.');
        let product = this.dataSource.data.find(element => element.id == resp.body.id);
        product.code = resp.body.code;
        product.description = resp.body.description;
        product.stock = resp.body.stock;
        this.dataSource._updateChangeSubscription();
      })
      subs.unsubscribe();
      modalRef.close();
    })
  }

}
