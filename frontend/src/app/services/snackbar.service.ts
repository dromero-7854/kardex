import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
// components
import { SnackbarsComponent } from '../components/snackbars/snackbars.component';

export enum SnackBarClass {
  SUCCESS = "snackbar-success",
  INFO = "snackbar-info",
  WARNING = "snackbar-warning",
  ERROR = "snackbar-error"
}

export enum Icon {
  SUCCESS = "check_circle",
  INFO = "feedback",
  WARNING = "warning",
  ERROR = "error_outline"
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, options?: {
    durationSec: number,
    snackBarClass: SnackBarClass,
    showCloseButton: boolean
  }) {
    this.snackBar.openFromComponent(SnackbarsComponent, {
      duration: (options.durationSec) ? options.durationSec * 1000 : 5000,
      verticalPosition: 'top',
      panelClass: (options.snackBarClass) ? options.snackBarClass : SnackBarClass.INFO,
      data: {
        snackBar: this.snackBar,
        message: message,
        icon: this.getIcon(options.snackBarClass),
        showCloseButton: options.showCloseButton
      }
    });
  }

  openErrorMessage(message: string) {
    this.openSnackBar(message, {
      durationSec: 5,
      showCloseButton: true,
      snackBarClass: SnackBarClass.ERROR
    });
  }

  openSuccesMessage(message: string) {
    this.openSnackBar(message, {
      durationSec: 5,
      showCloseButton: true,
      snackBarClass: SnackBarClass.SUCCESS
    });
  }

  openWarningMessage(message: string) {
    this.openSnackBar(message, {
      durationSec: 5,
      showCloseButton: true,
      snackBarClass: SnackBarClass.WARNING
    });
  }

  private getIcon(snackBarClass: SnackBarClass) {
    let icon = '';
    switch (snackBarClass) {
      case SnackBarClass.SUCCESS:
        icon = Icon.SUCCESS;
        break;
      case SnackBarClass.ERROR:
        icon = Icon.ERROR;
        break;
      case SnackBarClass.WARNING:
        icon = Icon.WARNING;
        break;
      default:
        icon = Icon.INFO;
    }
    return icon;
  }

}
