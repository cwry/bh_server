const ClientSession = require("./client_session");

module.exports = function(){
    const sessions = {};
    
    function getNewSession(){
        const session = ClientSession(); 
        sessions[session.sessionID] = session;
        return session;
    }
    
    return {
        sessions,
        getNewSession
    };
}