export default function checkSession(){
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        return sessionId;
    } return false;
}  