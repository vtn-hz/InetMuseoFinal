import consumeAPI from "../services/api.service";
import validationService from "../services/validation.service";


export function sendForm ( {url, method}, data, conditionsArray ) {
    return new Promise((res, rej)=>{
        const validationInstance = new validationService(conditionsArray);
        if (validationInstance.validateData(data)) {
            //console.log({'body': JSON.stringify(data)})
            consumeAPI(url, 
                {   'method': method, 
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                    'body': JSON.stringify(data)
                }   
            ).then(_ =>res({success: 'Se ejecuto la operación correctamente...'}))
             .catch(_ =>  rej({error: 'El envio fallo...'}))
                       
                    
        } else {
            rej({error: 'La validacion fallo...'})   
        }
    })
}