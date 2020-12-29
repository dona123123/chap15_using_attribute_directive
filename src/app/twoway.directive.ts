import{Input, Output, EventEmitter, Directive,
        HostBinding, HostListener, SimpleChange} from "@angular/core";

@Directive({
    selector: "input[paModel]",
    exportAs: "paModel"
})
export class PaModel{
    direction: string="None";

    @Input("paModel")
    modelProperty: string;

     @HostBinding("value")
     fieldValue: string="";

    ngOnChanges( changes: {[property: string]: SimpleChange}){
        console.log("L15 called");
        let change = changes["modelProperty"];
        console.log("L16 " + change.currentValue);
        console.log("L17 " + this.fieldValue);
        if( change.currentValue != this.fieldValue){
            console.log("L20 " +changes["modelProperty"].currentValue);
            this.fieldValue = changes["modelProperty"].currentValue || "";
            this.direction = "Model";
        }
    }
     @Output("paModelChange")
     update = new EventEmitter<string>();

     @HostListener( "input", ["$event.target.value"])
     updateValue( newValue: string){
        console.log("L29 " + newValue);
         this.fieldValue = newValue;
         this.update.emit(newValue);
         this.direction ="Element";
     }
}