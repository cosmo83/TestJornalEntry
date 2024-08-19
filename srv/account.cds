using { com.satinfotech.konnekt as db } from '../db/schema';

service konnekt {
    entity Acctdoc  as projection on db.Acctdoc;
}

annotate konnekt.Acctdoc with @odata.draft.enabled;


annotate konnekt.Acctdoc with @(
    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Value : CompanyCode
        },
        {
            $Type : 'UI.DataField',
            Value : AccountingDocument
        },
        {
            $Type : 'UI.DataField',
            Value : AccountingDocumentType
        },
        {
            $Type : 'UI.DataField',
            Value : DocumentReferenceID
        },
        // {
        //     $Type : 'UI.DataField',
        //     Value : CreatedByUser
        // },
        {
            $Type : 'UI.DataField',
            Value : DocumentDate
        },
        {
            $Type : 'UI.DataField',
            Value : PostingDate
        }
    ],  
);
annotate konnekt.Acctdoc with @(       
    UI.FieldGroup #AccountingInfo : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
            $Type : 'UI.DataField',
            Value : CompanyCode
        },
         {
            $Type : 'UI.DataField',
            Value : FiscalYear
        },
         {
            $Type : 'UI.DataField',
            Value : AccountingDocument
        },
        {
            $Type : 'UI.DataField',
            Value : AccountingDocumentType
        },
        {
            $Type : 'UI.DataField',
            Value : DocumentReferenceID
        },
        {
            $Type : 'UI.DataField',
            Value : DocumentHeaderText
        },
        {
            $Type : 'UI.DataField',
            Value : DocumentDate
        },
        {
            $Type : 'UI.DataField',
            Value : PostingDate
        }
        
        ],
    },


    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'AccountingInfo',
            Label : 'Accounting Information',
            Target : '@UI.FieldGroup#AccountingInfo',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'AcctgItemInfoFacet',
            Label : 'Accounting Items',
            Target : 'AcctgItems/@UI.LineItem',
        },
        
    ],
    UI.HeaderInfo : {
         TypeName: 'Accounting',
            TypeNamePlural: '',
            Title: { Value: AccountingDocument },
            Description: { Value: FiscalYear }
    }  
);

annotate konnekt.Acctdoc.AcctgItems with @(
    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Value : ReferenceDocumentItem
        },
        {
            $Type : 'UI.DataField',
            Value : GLAccount
        },
        {
            $Type : 'UI.DataField',
            Value : GLAccount
        },
        {
            $Type : 'UI.DataField',
            Value : Creditor
        },
        {
            $Type : 'UI.DataField',
            Value : SpecialGLCode
        },
        {
            $Type : 'UI.DataField',
            Value : AmountInTransactionCurrency
        },
        {
            $Type : 'UI.DataField',
            Value : DebitCreditCode
        },
        {
            $Type : 'UI.DataField',
            Value : DocumentItemText
        },
        {
            $Type : 'UI.DataField',
            Value : AssignmentReference
        },
        {
            $Type : 'UI.DataField',
            Value : ProfitCenter
        },
        {
            $Type : 'UI.DataField',
            Value : CostCenter
        },
        
    ],  
);

annotate konnekt.Acctdoc.AcctgItems with @(       
    UI.FieldGroup #AccountingItemInfo : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
            $Type : 'UI.DataField',
            Value : ReferenceDocumentItem
        },
        {
            $Type : 'UI.DataField',
            Value : GLAccount
        },
        {
            $Type : 'UI.DataField',
            Value : GLAccount
        },
        {
            $Type : 'UI.DataField',
            Value : Creditor
        },
        {
            $Type : 'UI.DataField',
            Value : SpecialGLCode
        },
        {
            $Type : 'UI.DataField',
            Value : AmountInTransactionCurrency
        },
        {
            $Type : 'UI.DataField',
            Value : DebitCreditCode
        },
        {
            $Type : 'UI.DataField',
            Value : DocumentItemText
        },
        {
            $Type : 'UI.DataField',
            Value : AssignmentReference
        },
        {
            $Type : 'UI.DataField',
            Value : ProfitCenter
        },
        {
            $Type : 'UI.DataField',
            Value : CostCenter
        },
        
        ],
    },


    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'AccountingInfo',
            Label : 'Accounting Information',
            Target : '@UI.FieldGroup#AccountingItemInfo',
        },
        
        
    ],   
    UI.HeaderInfo : {
         TypeName: 'Accounting Document item',
            TypeNamePlural: '',
            Title: { Value: ReferenceDocumentItem },
            // Description: { Value: Batch }
    }   
);

annotate konnekt.Acctdoc.AcctgItems with @(
UI.PresentationVariant :{
        SortOrder : [
            {
                Property : ReferenceDocumentItem,
                Descending : true,
            },
        ],
        Visualizations : [ 
            '@UI.LineItem',
        ],
    },
);