declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class SalesUnitParty {
                ObjectID?: string;
                ParentObjectID?: string;
                PartyID?: string;
                SalesOrder?: SalesOrder;
                SalesUnitPartyName?: SalesUnitPartyName[];
            }
        }
    }
}