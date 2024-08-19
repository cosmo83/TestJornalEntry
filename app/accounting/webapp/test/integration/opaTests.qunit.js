sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/satinfotech/konnekt/accounting/test/integration/FirstJourney',
		'com/satinfotech/konnekt/accounting/test/integration/pages/AcctdocList',
		'com/satinfotech/konnekt/accounting/test/integration/pages/AcctdocObjectPage',
		'com/satinfotech/konnekt/accounting/test/integration/pages/Acctdoc_AcctgItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, AcctdocList, AcctdocObjectPage, Acctdoc_AcctgItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/satinfotech/konnekt/accounting') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAcctdocList: AcctdocList,
					onTheAcctdocObjectPage: AcctdocObjectPage,
					onTheAcctdoc_AcctgItemsObjectPage: Acctdoc_AcctgItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);