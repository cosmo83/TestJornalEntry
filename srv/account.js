const cds = require('@sap/cds');
const convert = require('xml-js');
const fs = require('fs');
var cfenv = require("cfenv");
const axios = require('axios');
var appEnv = cfenv.getAppEnv();
module.exports = cds.service.impl(async function(){
// const acctapi = await cds.connect.to('JOURNALENTRYCREATEREQUESTCONFI');
    this.before('CREATE','Acctdoc', async req=> {
        
var tdata = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sfin="http://sap.com/xi/SAPSCORE/SFIN">   <soapenv:Header/><soapenv:Body><sfin:JournalEntryBulkCreateRequest><MessageHeader><!--Optional:-->';
var tdata1=  '<ID></ID><CreationDateTime></CreationDateTime></MessageHeader><!--1 or more repetitions:--><JournalEntryCreateRequest><MessageHeader><!--Optional:--><ID></ID><CreationDateTime></CreationDateTime></MessageHeader>';
var dataend = '</JournalEntryCreateRequest></sfin:JournalEntryBulkCreateRequest></soapenv:Body></soapenv:Envelope>';
var ndata = {
	"JournalEntry": {
		"OriginalReferenceDocumentType": "",
		"BusinessTransactionType": "",
		"AccountingDocumentType": "E1",
		"DocumentReferenceID": "REF1",
		"DocumentHeaderText": "SALARY",
		"CreatedByUser": "CB9980000000",
		"CompanyCode": "SSMI",
		"TaxDeterminationDate": "2024-08-18",
		"DocumentDate": "2024-07-31",
		"PostingDate": "2024-08-18",
		"CreditorItem": {
			"ReferenceDocumentItem": "1",
			"Creditor": "V35010009",
			"AmountInTransactionCurrency currencyCode='INR'":-500,
			"DebitCreditCode": "H",
			"DocumentItemText": "Text1",
			"BusinessPlace": "27MH",
			"TaxCountry": "IN",
			"DownPaymentTerms": {
				"SpecialGLCode": "A",
				"TaxCode": "1A"
			}
		},
		"Item": {
			"ReferenceDocumentItem": "2",
			"GLAccount": "12010220",
			"ValueDate": "2024-08-17",
			"AmountInTransactionCurrency currencyCode='INR'":500,
			"DebitCreditCode": "S",
			"DocumentItemText": "ITEM TEXT2",
			"HouseBank": "SBI1",
			"HouseBankAccount": "SBI1"
		}
	}
}

let xmljson = JSON.stringify(ndata);
    var xmlnew = convert.json2xml(xmljson, { compact: true, spaces: 4 });
    for(let i = 0;i<2;i++){
        let tesdata = xmlnew.replace("/AmountInTransactionCurrency currencyCode='INR'","/AmountInTransactionCurrency");
    xmlnew = tesdata

    }
  var xmlsoap = tdata+tdata1+xmlnew+dataend;
    if(appEnv.isLocal){
        fs.writeFile('test.txt', xmlsoap, err => { 
            if (err) { 
              console.error(err) 
              return 
            } 
            //file written successfully 
          }); 
        };
        var pdfoptions = {
            'method': 'POST',
            'url': "https://my411430-api.s4hana.cloud.sap/sap/bc/srt/scs_ext/sap/journalentrycreaterequestconfi",
            'headers': {
                'Authorization': 'Basic  QlRQX1VTRVJfREVWOk5wakFORW5WR3dQWEJDRG44akJVTStmcEx3V0hrdVJVVmRMSmR6Y3g=',
                'Content-Type': 'application/xml'
            },
            data: xmlsoap
        };
        
        
        // const pdfResponse = await axios(pdfoptions);
        // console.log(pdfResponse);
        var einvcnclres = await axios.send(pdfoptions);  
 console.log(einvcnclres)
 req.error({'code': 'NODOCUMENTS',message:'Error'});
 
    });



});