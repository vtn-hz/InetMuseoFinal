import { RecordlistHandler } from "./RecordListController";

const RECORDLIST_ID = 'record-list';


export default function createRecordlist (APIUrl, {headNames, keys:{primaryKey, partialKeys}, operationElements } ) {
    const RecordlistClone = document.getElementById(RECORDLIST_ID).cloneNode(1).content.firstElementChild;
    const RecordlistHandlerInstance = new RecordlistHandler(RecordlistClone,
        APIUrl, {headNames, keys:{primaryKey, partialKeys}, operationElements } );
    return RecordlistHandlerInstance;
}