declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class ItemProductRecipientParty {
                ObjectID?: string;
                ParentObjectID?: string;
                PartyID?: string;
                Item?: Item[];
                SalesOrder?: SalesOrder;
            }
        }
    }
}