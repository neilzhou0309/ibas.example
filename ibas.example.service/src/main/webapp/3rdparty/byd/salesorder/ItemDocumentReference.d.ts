declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class ItemDocumentReference {
                ObjectID?: string;
                ParentObjectID?: string;
                ID?: string;
                ItemID?: string;
                ItemTypeCode?: string;
                ItemTypeCodeText?: string;
                ItemUUID?: string;
                TypeCode?: string;
                TypeCodeText?: string;
                UUID?: string;
                RelationshipRoleCode?: string;
                RelationshipRoleCodeText?: string;
                Item?: Item[];
                SalesOrder?: SalesOrder;
            }
        }
    }
}