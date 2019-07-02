declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class Item {
                ObjectID?: string;
                ParentObjectID?: string;
                ID?: string;
                UUID?: string;
                Description?: string;
                ExternalItemReference?: string;
                ProcessingTypeCode?: string;
                ProcessingTypeCodeText?: string;
                ProductAvailabilityConfirmationStatusCode?: string;
                ProductAvailabilityConfirmationStatusCodeText?: string;
                ReleaseStatusCode?: string;
                ReleaseStatusCodeText?: string;
                ExecutionReleaseStatusCode?: string;
                ExecutionReleaseStatusCodeText?: string;
                FulfilmentProcessingStatusCode?: string;
                FulfilmentProcessingStatusCodeText?: string;
                InvoiceProcessingStatusCode?: string;
                InvoiceProcessingStatusCodeText?: string;
                CancellationStatusCode?: string;
                CancellationStatusCodeText?: string;
                NetAmount?: string;
                NetAmountCurrencyCode?: string;
                NetAmountCurrencyCodeText?: string;
                TaxAmount?: string;
                TaxAmountCurrencyCode?: string;
                TaxAmountCurrencyCodeText?: string;
                FulfilmentPartyCategoryCode?: string;
                FulfilmentPartyCategoryCodeText?: string;
                ItemAttachmentFolder?: ItemAttachmentFolder[];
                ItemDocumentReference?: ItemDocumentReference[];
                ItemPriceAndTaxCalculation?: ItemPriceAndTaxCalculation;
                ItemProduct?: ItemProduct;
                ItemProductRecipientParty?: ItemProductRecipientParty;
                ItemScheduleLine?: ItemScheduleLine[];
                ItemText?: ItemText[];
                ItemVendorParty?: ItemVendorParty;
                SalesOrder?: SalesOrder;
            }
        }
    }
}