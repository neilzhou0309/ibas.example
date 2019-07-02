declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class PricingTerms {
                ObjectID?: string;
                ParentObjectID?: string;
                CurrencyCode?: string;
                CurrencyCodeText?: string;
                GrossAmountIndicator?: boolean;
                PriceDateTime?: string;
                timeZoneCode?: string;
                timeZoneCodeText?: string;
                SalesOrder?: SalesOrder;
            }
        }
    }
}