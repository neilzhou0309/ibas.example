export namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class SalesOrderExtend {
                getBOAttributeString(): string {
                    return "ObjectID," +
                        "UUID," +
                        "ID," +
                        "Name," +
                        "ExternalReference," +
                        "DataOriginTypeCode," +
                        "DataOriginTypeCodeText," +
                        "SalesOrganisationID," +
                        "DistributionChannelCode," +
                        "DistributionChannelCodeText," +
                        "PostingDateTime," +
                        "ConsistencyStatusCode," +
                        "ConsistencyStatusCodeText," +
                        "ReleaseStatusCode," +
                        "ReleaseStatusCodeText," +
                        "DeliveryStatusCode," +
                        "DeliveryStatusCodeText," +
                        "DeliveryBlockingStatusCode," +
                        "DeliveryBlockingStatusCodeText," +
                        "InvoiceStatusCode," +
                        "InvoiceStatusCodeText," +
                        "InvoicingBlockingStatusCode," +
                        "InvoicingBlockingStatusCodeText," +
                        "ExecutionReleaseStatusCode," +
                        "ExecutionReleaseStatusCodeText," +
                        "LifeCycleStatusCode," +
                        "LifeCycleStatusCodeText," +
                        "CancellationStatusCode," +
                        "CancellationStatusCodeText," +
                        "DeliveryPriorityCode," +
                        "DeliveryPriorityCodeText," +
                        "FulfillmentBlockingReasonCode," +
                        "FulfillmentBlockingReasonCodeText," +
                        "CompleteDeliveryRequestedIndicator," +
                        "IncotermsClassificationCode," +
                        "IncotermsClassificationCodeText," +
                        "IncotermsLocationName," +
                        "GrossAmount," +
                        "GrossAmountCurrencyCode," +
                        "GrossAmountCurrencyCodeText," +
                        "NetAmount," +
                        "NetAmountCurrencyCode," +
                        "NetAmountCurrencyCodeText," +
                        "TaxAmount," +
                        "TaxAmountCurrencyCode," +
                        "TaxAmountCurrencyCodeText," +
                        "CustomerProjectInvoiceRequisitionAutomaticallyReleaseIndicator," +
                        "CustomerProjectInvoiceRequisitionItemCreationMethodCode," +
                        "CustomerProjectInvoiceRequisitionItemCreationMethodCodeText," +
                        "InvoicingBlockingReasonCode," +
                        "InvoicingBlockingReasonCodeText," +
                        "ProposedInvoiceDate," +
                        "AttachmentFolder/ObjectID," +
                        "AttachmentFolder/ParentObjectID," +
                        "AttachmentFolder/UUID," +
                        "AttachmentFolder/Name," +
                        "AttachmentFolder/MimeType," +
                        "AttachmentFolder/Binary," +
                        "AttachmentFolder/SizeInkB," +
                        "AttachmentFolder/DocumentLink," +
                        "AttachmentFolder/OutputRelevanceIndicator," +
                        "AttachmentFolder/LinkWebURI," +
                        "AttachmentFolder/TypeCode," +
                        "AttachmentFolder/TypeCodeText," +
                        "AttachmentFolder/CategoryCode," +
                        "AttachmentFolder/CategoryCodeText," +
                        "AttachmentFolder/CreatedOn," +
                        "AttachmentFolder/CreatedBy," +
                        "AttachmentFolder/LastUpdatedOn," +
                        "AttachmentFolder/LastUpdatedBy," +
                        "AttachmentFolder/Title," +
                        "BuyerParty/ObjectID," +
                        "BuyerParty/ParentObjectID," +
                        "BuyerParty/PartyID," +
                        "DocumentReference/ObjectID," +
                        "DocumentReference/ParentObjectID," +
                        "DocumentReference/RelationshipRoleCode," +
                        "DocumentReference/RelationshipRoleCodeText," +
                        "DocumentReference/ID," +
                        "DocumentReference/TypeCode," +
                        "DocumentReference/TypeCodeText," +
                        "DocumentReference/UUID," +
                        "DocumentReference/CampaignDescription," +
                        "DocumentReference/CampaignPlannedStartDate," +
                        "DocumentReference/CampaignPlannedEndDate," +
                        "DocumentReference/QuoteDescription," +
                        "DocumentReference/OpportunityDescription," +
                        "DocumentReference/OpportunitySourceCode," +
                        "DocumentReference/OpportunitySourceCodeText," +
                        "DocumentReference/ServiceConfirmationDescription," +
                        "DocumentReference/ServiceConfirmationDateTime," +
                        "Item/ObjectID," +
                        "Item/ParentObjectID," +
                        "Item/ID," +
                        "Item/UUID," +
                        "Item/Description," +
                        "Item/ExternalItemReference," +
                        "Item/ProcessingTypeCode," +
                        "Item/ProcessingTypeCodeText," +
                        "Item/ProductAvailabilityConfirmationStatusCode," +
                        "Item/ProductAvailabilityConfirmationStatusCodeText," +
                        "Item/ReleaseStatusCode," +
                        "Item/ReleaseStatusCodeText," +
                        "Item/ExecutionReleaseStatusCode," +
                        "Item/ExecutionReleaseStatusCodeText," +
                        "Item/FulfilmentProcessingStatusCode," +
                        "Item/FulfilmentProcessingStatusCodeText," +
                        "Item/InvoiceProcessingStatusCode," +
                        "Item/InvoiceProcessingStatusCodeText," +
                        "Item/CancellationStatusCode," +
                        "Item/CancellationStatusCodeText," +
                        "Item/NetAmount," +
                        "Item/NetAmountCurrencyCode," +
                        "Item/NetAmountCurrencyCodeText," +
                        "Item/TaxAmount," +
                        "Item/TaxAmountCurrencyCode," +
                        "Item/TaxAmountCurrencyCodeText," +
                        "Item/FulfilmentPartyCategoryCode," +
                        "Item/FulfilmentPartyCategoryCodeText," +
                        "PricingTerms/ObjectID," +
                        "PricingTerms/ParentObjectID," +
                        "PricingTerms/CurrencyCode," +
                        "PricingTerms/CurrencyCodeText," +
                        "PricingTerms/GrossAmountIndicator," +
                        "PricingTerms/PriceDateTime," +
                        "PricingTerms/timeZoneCode," +
                        "PricingTerms/timeZoneCodeText," +
                        "RequestedFulfillmentPeriod/ObjectID," +
                        "RequestedFulfillmentPeriod/ParentObjectID," +
                        "RequestedFulfillmentPeriod/StartDateTime," +
                        "RequestedFulfillmentPeriod/StartDateTimeZoneCode," +
                        "RequestedFulfillmentPeriod/EndDateTime," +
                        "RequestedFulfillmentPeriod/EndDateTimeZoneCode," +
                        "SalesUnitParty/ObjectID," +
                        "SalesUnitParty/ParentObjectID," +
                        "SalesUnitParty/PartyID," +
                        "Text/ObjectID," +
                        "Text/ParentObjectID," +
                        "Text/Text," +
                        "Text/LanguageCode," +
                        "Text/LanguageCodeText," +
                        "Text/TypeCode," +
                        "Text/TypeCodeText," +
                        "Text/AuthorUUID," +
                        "Text/AuthorName," +
                        "Text/CreatedOn," +
                        "Text/CreatedBy," +
                        "Text/UpdatedOn," +
                        "Text/LastUpdatedBy";
                }
                getBOChildAttributeString(): string {
                    return "";
                }
            }
        }
    }
}