declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class DocumentReference {
                ObjectID?: string;
                ParentObjectID?: string;
                RelationshipRoleCode?: string;
                RelationshipRoleCodeText?: string;
                ID?: string;
                TypeCode?: string;
                TypeCodeText?: string;
                UUID?: string;
                CampaignDescription?: string;
                CampaignPlannedStartDate?: string;
                CampaignPlannedEndDate?: string;
                QuoteDescription?: string;
                OpportunityDescription?: string;
                OpportunitySourceCode?: string;
                OpportunitySourceCodeText?: string;
                ServiceConfirmationDescription?: string;
                ServiceConfirmationDateTime?: string;
                SalesOrder?: SalesOrder;
            }
        }
    }
}