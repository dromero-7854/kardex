// dependencies
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// models
import { Product } from 'src/app/models/core.models';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent implements OnInit {

  @Input() product: Product = { code: '', description: '', stock: 0 };
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  productForm: FormGroup;
  matcher = new NoErrorStateMatcher();

  get code() { return this.productForm.get('code'); }
  get description() { return this.productForm.get('description'); }
  get stock() { return this.productForm.get('stock'); }

  submitted: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      id: [this.product.id],
      code: [this.product.code, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      stock: [this.product.stock, [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.passEntry.emit(this.productForm.value);
  }

}

export class NoErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }
}
