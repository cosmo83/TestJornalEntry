namespace com.satinfotech.konnekt;
using { managed, cuid } from '@sap/cds/common';


entity Acctdoc : cuid, managed {
    @title: 'Company Code'
    CompanyCode: String(4);// @default='SSMI';//@Common.IsUpperCase;
    @title: 'Fiscal Year'
    FiscalYear: String(4) @readonly;
    @title: 'Accounting Document'
    AccountingDocument: String(10) @readonly;
    @title: 'Accounting Document Type'
    AccountingDocumentType: String(2);// @default='EA';
    @title: 'Document Reference ID'
    DocumentReferenceID: String(16) ;
    @title: 'Document Header Text'
    DocumentHeaderText: String(25); 
    // @title: 'Created By User'
    // CreatedByUser: String(12) ;
    
    // @title: 'Tax Determination Date'
    // TaxDeterminationDate: Date; 
    @title: 'Document Date'
    DocumentDate: Date;
    @title: 'Posting Date'
    PostingDate: Date;

    @title: 'Accounting Document Items'
    AcctgItems: Composition of many {
    @UI.Hidden
    key ID:UUID;
    @title: 'Reference Document Item'
    ReferenceDocumentItem: String(3) ;
    @title: 'Company Code'
    CompanyCode: String(4);
    @title: 'GL Account'
    GLAccount: String(10) ; 
    @title: 'Creditor'
    Creditor:String(10);
    @title:'Special GL Code'
    SpecialGLCode:String(1);
    @title: 'Amount In Transaction Currency'
    AmountInTransactionCurrency: Decimal(24, 3) ;
    @title: 'Debit Credit Code'
    DebitCreditCode: String(1) ; 
    @title: 'Document Item Text'
    DocumentItemText: String(50);
    @title: 'Assignment Reference'
    AssignmentReference: String(18) ; 
    @title: 'Profit Center'
    ProfitCenter: String(10);
    @title: 'CostCenter'
    CostCenter: String(10);
    
    
};
}