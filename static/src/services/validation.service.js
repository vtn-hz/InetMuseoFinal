

const VALIDATION_SUCCESS = true;
const VALIDATION_FAIL = false;


export default function validationService ( conditions ) {
    function validateData ( dataObject ) {
        try {
            const dataArray = Object.values(dataObject);
            //console.log(conditions)
    
            conditions.forEach(condition => {
                if (dataArray.includes(condition)){
                    throw VALIDATION_FAIL;
                }
            });
            
            return VALIDATION_SUCCESS;
        } catch (VALIDATION_FAIL) {
            return VALIDATION_FAIL;
        }
    }

    return {
        "validateData": validateData
    }
}