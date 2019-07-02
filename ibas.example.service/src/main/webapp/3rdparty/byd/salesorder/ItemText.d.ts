declare namespace sap {
    export namespace byd {
        export namespace salesorder {
            export class ItemText {
                ObjectID?: string;
                ParentObjectID?: string;
                Text?: string;
                LanguageCode?: string;
                LanguageCodeText?: string;
                TypeCode?: string;
                TypeCodeText?: string;
                AuthorUUID?: string;
                AuthorName?: string;
                CreatedOn?: string;
                CreatedBy?: string;
                UpdatedOn?: string;
                LastUpdatedBy?: string;
                Item?: Item[];
            }
        }
    }
}