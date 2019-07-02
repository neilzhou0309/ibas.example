declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class BuyerParty {
                ObjectID?: string;
                ParentObjectID?: string;
                PartyID?: string;
                BuyerPartyName?: BuyerPartyName[];
                SalesOrder?: SalesOrder;
            }
        }
    }
}