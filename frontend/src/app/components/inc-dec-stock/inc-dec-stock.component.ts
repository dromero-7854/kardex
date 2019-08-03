// dependencies
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inc-dec-stock',
  templateUrl: './inc-dec-stock.component.html',
  styleUrls: ['./inc-dec-stock.component.scss']
})
export class IncDecStockComponent implements OnInit {

  @Input() inc: boolean = true;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  incDecForm: FormGroup;
  matcher = new NoErrorStateMatcher();
  title: string;
  placeholder: string;

  get incDecValue() { return this.incDecForm.get('incDecValue'); }

  submitted: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.title = (this.inc) ? 'Incrementar' : 'Decrementar';
    this.placeholder = (this.inc) ? 'Valor a incrementar' : 'Valor a decrementar';
    this.incDecForm = this.fb.group({
      incDecValue: [1, [Validators.required, Validators.min(1)]],
    });
  }

  execute() {
    this.submitted = true;
    if (this.incDecForm.invalid) {
      return;
    }
    this.passEntry.emit(this.incDecForm.value);
  }

}

export class NoErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }
}
