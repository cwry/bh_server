"use strict";
const uuid = require("uuid");

module.exports = function(){
    const sessionID = uuid.v4();
    let routes = {};
    
    function on(route, callback){
        const path = route.params[0].split("/");
        let call = routes;
        for(let val of path){
            if(val === "") return;
            call = call[val] = call[val] || {};
        }
        call[""] = callback;
    }
    
    function resetRoutes(){
        routes = {};
    } 
    
    function execute(route, cb){
        const path = route.params[0].split("/");
        let call = routes;
        for(let val of path){
            if(val === "") continue;
            if(!call[val]){
                call = routes;
                break;
            }
            call = call[val];
        }
        if(call[""] && call != routes){
            call((err, res) => {
                let result = {};
                result.success = !err;
                if(err) result.error = err;
                if(res) result.message = res;
                cb(undefined, result);
            });
        }else{
            cb("no action found for " + route.params[0]);
        }
    }
    
    return {
        sessionID,
        on,
        resetRoutes
    };
};