import { BsModalRef } from 'ngx-bootstrap/modal/public_api'
import { AlertModalComponent } from './alert-modal/alert-modal.component'
import { BsModalService } from 'ngx-bootstrap/modal'
import { Injectable } from '@angular/core'

enum AlertTypes {
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent)
    bsModalRef.content.type = type
    bsModalRef.content.message = message
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS)
  }

  showAlertWarning(message: string) {
    this.showAlert(message, AlertTypes.WARNING)
  }
}
