import consumeAPI from "../services/api.service";

const apiSession = '/confirmarUsuarioAdmin';

export function createSession(data){
    return new Promise ((res, rej) =>  { consumeAPI(apiSession, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((token) => {
            if (token.length >= 1) {
                localStorage.setItem('sessionId', JSON.stringify(token[0]));
                res({success: 'Se registro correctamente...'});
            } else {
                rej({error: 'No se pudo registrar...'})
            }
        }).catch(_ => rej({error: 'No se pudo registrar...'}))
    });   
}

export function deleteSession () {
    localStorage.removeItem('sessionId');
}