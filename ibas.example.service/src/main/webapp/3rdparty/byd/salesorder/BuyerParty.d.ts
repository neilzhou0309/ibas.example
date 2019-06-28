declare namespace sap {
    export namespace byd {
        export namespace bo {
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