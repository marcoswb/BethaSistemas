import { Injectable } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal/public_api'
import { BsModalService } from 'ngx-bootstrap/modal'

import { AlertModalComponent } from './alert-modal.component'


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

  private showAlert(message: String, type: AlertTypes) {
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
