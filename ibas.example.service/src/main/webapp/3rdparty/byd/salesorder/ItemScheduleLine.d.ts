declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class ItemScheduleLine {
                ObjectID?: string;
                ParentObjectID?: string;
                TypeCode?: string;
                TypeCodeText?: string;
                Quantity?: string;
                unitCode?: string;
                unitCodeText?: string;
                Item?: Item[];
                SalesOrder?: SalesOrder;
            }
        }
    }
}