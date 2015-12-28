/* eslint-disable no-unused-vars */
 function endRequestResolver(requestData, logger) {
     logger.info('Message is ', requestData + ', so far: ' + requestData.length);
     return true;

 }
