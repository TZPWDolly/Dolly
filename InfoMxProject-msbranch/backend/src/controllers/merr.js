const logger = require('../util/logger');

module.exports = fn => {
    return (a) => (
     fn(a).catch(error => {
         //logger.dberrorlog(error);
         console.log('merr: ', error);
         throw (error);
     })
    ) 
};
