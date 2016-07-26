import { Component, EventEmitter } from '@angular/core'

@Component({
    selector: 'confirm-dialog',
    templateUrl: './app/shared/confirm-dialog.component.html'
})

export class ConfirmDialogComponent {
    close = new EventEmitter()
    title: string = 'Confirm Dialog'
    body: string = 'This is a confirm Dialog.'
    cancelButtonText: string = 'Cancel'
    confirmButtonText: string = 'Confirm'
    
    onClickCancel() {
        this.close.emit('cancel')
    }

    onClickConfirm() {
        this.close.emit('confirm')
    }
}