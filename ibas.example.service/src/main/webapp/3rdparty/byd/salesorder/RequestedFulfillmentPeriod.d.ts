declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class RequestedFulfillmentPeriod {
                ObjectID?: string;
                ParentObjectID?: string;
                StartDateTime?: string;
                StartDateTimeZoneCode?: string;
                EndDateTime?: string;
                EndDateTimeZoneCode?: string;
                SalesOrder?: SalesOrder;
            }
        }
    }
}