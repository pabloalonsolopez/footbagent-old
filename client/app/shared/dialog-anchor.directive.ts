import { Directive, ViewContainerRef, ComponentResolver, ComponentFactory, ComponentRef } from '@angular/core'

@Directive({
    selector: '[dialog-anchor]'
})

export class DialogAnchorDirective {
    
    constructor(private viewContainer: ViewContainerRef, private componentResolver: ComponentResolver) {}

    createDialog(component: { new(): any }):Promise<ComponentRef<any>> {
        this.viewContainer.clear()

        let componentCreated = this.componentResolver
            .resolveComponent(component)
            .then((componentFactory: ComponentFactory<any>) => {
                return this.viewContainer.createComponent(componentFactory)
            })

        return componentCreated
    }
}