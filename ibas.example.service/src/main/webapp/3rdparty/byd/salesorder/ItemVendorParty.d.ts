declare namespace sap {
    export namespace byd {
        export namespace bo {
            export class ItemVendorParty {
                ObjectID?: string;
                ParentObjectID?: string;
                PartyID?: string;
                Item?: Item[];
                ItemVendorFormattedAddress?: ItemVendorFormattedAddress[];
                ItemVendorName?: ItemVendorName[];
                SalesOrder?: SalesOrder;
            }
        }
    }
}