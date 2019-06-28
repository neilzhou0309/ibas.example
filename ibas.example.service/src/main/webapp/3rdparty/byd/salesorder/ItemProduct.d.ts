declare namespace sap {
    export namespace byd {
        export namespace bo {
            export class ItemProduct {
                ObjectID?: string;
                ParentObjectID?: string;
                ProductID?: string;
                ProductTypeCode?: string;
                ProductTypeCodeText?: string;
                Item?: Item[];
                SalesOrder?: SalesOrder;
            }
        }
    }
}