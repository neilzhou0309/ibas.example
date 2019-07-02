declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class SalesOrder {
                ObjectID?: string;
                UUID?: string;
                ID?: string;
                Name?: string;
                ExternalReference?: string;
                DataOriginTypeCode?: string;
                DataOriginTypeCodeText?: string;
                SalesOrganisationID?: string;
                DistributionChannelCode?: string;
                DistributionChannelCodeText?: string;
                PostingDateTime?: string;
                ConsistencyStatusCode?: string;
                ConsistencyStatusCodeText?: string;
                ReleaseStatusCode?: string;
                ReleaseStatusCodeText?: string;
                DeliveryStatusCode?: string;
                DeliveryStatusCodeText?: string;
                DeliveryBlockingStatusCode?: string;
                DeliveryBlockingStatusCodeText?: string;
                InvoiceStatusCode?: string;
                InvoiceStatusCodeText?: string;
                InvoicingBlockingStatusCode?: string;
                InvoicingBlockingStatusCodeText?: string;
                ExecutionReleaseStatusCode?: string;
                ExecutionReleaseStatusCodeText?: string;
                LifeCycleStatusCode?: string;
                LifeCycleStatusCodeText?: string;
                CancellationStatusCode?: string;
                CancellationStatusCodeText?: string;
                DeliveryPriorityCode?: string;
                DeliveryPriorityCodeText?: string;
                FulfillmentBlockingReasonCode?: string;
                FulfillmentBlockingReasonCodeText?: string;
                CompleteDeliveryRequestedIndicator?: boolean;
                IncotermsClassificationCode?: string;
                IncotermsClassificationCodeText?: string;
                IncotermsLocationName?: string;
                GrossAmount?: string;
                GrossAmountCurrencyCode?: string;
                GrossAmountCurrencyCodeText?: string;
                NetAmount?: string;
                NetAmountCurrencyCode?: string;
                NetAmountCurrencyCodeText?: string;
                TaxAmount?: string;
                TaxAmountCurrencyCode?: string;
                TaxAmountCurrencyCodeText?: string;
                CustomerProjectInvoiceRequisitionAutomaticallyReleaseIndicator?: boolean;
                CustomerProjectInvoiceRequisitionItemCreationMethodCode?: string;
                CustomerProjectInvoiceRequisitionItemCreationMethodCodeText?: string;
                InvoicingBlockingReasonCode?: string;
                InvoicingBlockingReasonCodeText?: string;
                ProposedInvoiceDate?: string;
                AttachmentFolder?: AttachmentFolder[];
                BuyerParty?: BuyerParty;
                DocumentReference?: DocumentReference[];
                Item?: Item[];
                PricingTerms?: PricingTerms;
                RequestedFulfillmentPeriod?: RequestedFulfillmentPeriod;
                SalesUnitParty?: SalesUnitParty;
                Text?: Text[];
            }
        }
    }
}