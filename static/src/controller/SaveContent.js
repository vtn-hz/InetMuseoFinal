function SaveContentController () {
    const DataContent = {};

    this.saveContent = function( key, content ){
        DataContent[key] = content;
    }

    this.getContent = function( key ){
        return DataContent[key];
    }

    this.clearContent = function( key ){
        DataContent[key] = undefined;
    }
}

const SaveContent = new SaveContentController();
export default SaveContent;