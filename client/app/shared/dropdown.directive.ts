import {Directive, ElementRef, ContentChild, Output, EventEmitter, Input} from "@angular/core"

@Directive({
    selector: "[dropdown]"
})

export class DropdownDirective {

    @Input("dropdownToggle")
    toggleClick = true

    @Input("dropdownFocusActivate")
    activateOnFocus = false

    @Output()
    onOpen = new EventEmitter()

    @Output()
    onClose = new EventEmitter()

    constructor(private elementRef: ElementRef) { }

    open() {
        const element: HTMLElement = this.elementRef.nativeElement
        element.classList.add("open")
        this.onOpen.emit(undefined)
    }

    close() {
        const element: HTMLElement = this.elementRef.nativeElement
        element.classList.remove("open")
        this.onClose.emit(undefined)
    }

    isOpened() {
        const element: HTMLElement = this.elementRef.nativeElement
        return element.classList.contains("open")
    }

}