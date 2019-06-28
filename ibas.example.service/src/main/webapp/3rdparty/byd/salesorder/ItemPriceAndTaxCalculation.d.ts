declare namespace sap {
    export namespace byd {
        export namespace bo {
            export class ItemPriceAndTaxCalculation {
                ObjectID?: string;
                ParentObjectID?: string;
                CountryCode?: string;
                CountryCodeText?: string;
                RegisterDateTime?: string;
                TaxJurisdictionCode?: string;
                TaxJurisdictionCodeText?: string;
                TaxationCharacteristicsCode?: string;
                TaxationCharacteristicsCodeText?: string;
                TaxationCharacteristicsDeterminationMethodCode?: string;
                TaxationCharacteristicsDeterminationMethodCodeText?: string;
                WithholdingTaxationCharacteristicsCode?: string;
                WithholdingTaxationCharacteristicsCodeText?: string;
                WithholdingTaxationCharacteristicsDeterminationMethodCode?: string;
                WithholdingTaxationCharacteristicsDeterminationMethodCodeText?: string;
                CalculationStatusCode?: string;
                CalculationStatusCodeText?: string;
                Item?: Item[];
            }
        }
    }
}