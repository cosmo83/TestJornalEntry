const { getSoapService } = require('./soap-service');

let userReadServicePromise = null;
let userReadServiceEndpoint = { url: null };

(async function () {
    // Connect to external S/4HC SOAP service
    userReadServicePromise = getSoapService('JOURNALENTRYCREATEREQUESTCONFI', './srv/external/JOURNALENTRYCREATEREQUESTCONFI.wsdl', userReadServiceEndpoint);
})();

/*** HANDLERS ***/

async function readBusinessUser(req) {
    try {
        // Get the SOAP client for the UserRead service
        const userReadService = await userReadServicePromise;
        userReadService.setEndpoint(userReadServiceEndpoint.url);

        // Set the parameters for the QueryBusinessUserIn method of the sevice 
        // const param = {
        //     BusinessUser: {
        //         PersonIDInterval: {
        //             IntervalBoundaryTypeCode: 9,
        //             LowerBoundaryPersonID: "0000000000"
        //         },
        //         BusinessPartnerRoleCodeInterval: {
        //             IntervalBoundaryTypeCode: 9,
        //             LowerBoundaryBusinessPartnerRoleCode: "000000"
        //         }
        //     },
        //     QueryProcessingConditions: {
        //         QueryHitsUnlimitedIndicator: true
        //     }
        // };

        // Invoke QueryBusinessUserIn method asynchronously and wait for the response
        const resp = await userReadService.QueryBusinessUserInAsync(param);

        // Prepare the actual service response
        const busUsers = [];
        if (resp && resp[0] && resp[0].BusinessUser) {
            resp[0].BusinessUser.forEach(busUser => {
                busUsers.push({
                    ID: ((busUser.User) ? busUser.User.UserID : busUser.PersonID),
                    FirstName: busUser.PersonalInformation.FirstName,
                    LastName: busUser.PersonalInformation.LastName,
                    PersonFullName: busUser.PersonalInformation.PersonFullName,
                    BusinessPartnerRoleCode: busUser.BusinessPartnerRoleCode,
                    HasUser: ((busUser.User) ? true : false)
                });
            });
        }

        return busUsers;
    } catch (err) {
        req.error(err.code, err.message);
    }
}

module.exports = {
    readBusinessUser
}
