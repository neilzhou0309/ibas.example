declare namespace sap {
    export namespace byd {
        export namespace bo {
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