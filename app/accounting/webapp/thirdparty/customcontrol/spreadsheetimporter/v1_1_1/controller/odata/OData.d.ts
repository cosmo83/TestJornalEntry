/// <reference path="../dialog/ODataMessageHandler.d.ts" />
/// <reference path="../SpreadsheetUpload.d.ts" />
/// <reference path="MetadataHandlerV2.d.ts" />
/// <reference path="MetadataHandlerV4.d.ts" />
declare module "cc/spreadsheetimporter/v1_1_1/controller/odata/OData" {
    import ManagedObject from "sap/ui/base/ManagedObject";
    import DraftController from "sap/ui/generic/app/transaction/DraftController";
    import { Columns, ListObject } from "cc/spreadsheetimporter/v1_1_1/types";
    import ODataMessageHandler from "cc/spreadsheetimporter/v1_1_1/controller/dialog/ODataMessageHandler";
    import SpreadsheetUpload from "cc/spreadsheetimporter/v1_1_1/controller/SpreadsheetUpload";
    import MetadataHandlerV2 from "cc/spreadsheetimporter/v1_1_1/controller/odata/MetadataHandlerV2";
    import MetadataHandlerV4 from "cc/spreadsheetimporter/v1_1_1/controller/odata/MetadataHandlerV4";
    import Dialog from "sap/m/Dialog";
    /**
     * @namespace cc.spreadsheetimporter.v1_1_1
     */
    export default abstract class OData extends ManagedObject {
        draftController: DraftController;
        odataMessageHandler: ODataMessageHandler;
        private _tables;
        busyDialog: Dialog;
        spreadsheetUploadController: SpreadsheetUpload;
        constructor(spreadsheetUploadController: SpreadsheetUpload);
        /**
         * Helper method to call OData service.
         * @param {*} fnResolve - The resolve function for the Promise.
         * @param {*} fnReject - The reject function for the Promise.
         */
        callOdata(fnResolve: any, fnReject: any, spreadsheetUploadController: SpreadsheetUpload): Promise<void>;
        getBinding(tableObject: any): any;
        _getActionName(context: any, sOperation: string): any;
        processPayloadArray(batchSize: number, payloadArray: string | any[]): any[];
        getTableObject(tableId: string, view: any, spreadsheetUploadController: SpreadsheetUpload): any;
        private createBusyDialog;
        private checkForODataErrors;
        get tables(): any[];
        set tables(value: any[]);
        abstract create(model: any, binding: any, payload: any): any;
        abstract createAsync(model: any, binding: any, payload: any): any;
        abstract submitChanges(model: any): Promise<any>;
        abstract waitForCreation(): Promise<any>;
        abstract waitForDraft(): void;
        abstract resetContexts(): void;
        abstract getView(context: any): any;
        abstract getMetadataHandler(): MetadataHandlerV2 | MetadataHandlerV4;
        abstract getLabelList(columns: Columns, odataType: string, excludeColumns: Columns, tableObject?: any): Promise<ListObject>;
        abstract getKeyList(odataType: string, tableObject: any): Promise<string[]>;
        abstract getOdataType(binding: any, tableObject: any, odataType: any): string;
        abstract checkForErrors(model: any, binding: any, showBackendErrorMessages: Boolean): Promise<boolean>;
        abstract createCustomBinding(binding: any): any;
    }
}
//# sourceMappingURL=OData.d.ts.map