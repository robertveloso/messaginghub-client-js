function (requestData, logger) {
  // var messageLength = requestData.readInt32BE(0);
  logger.info('Message is ', requestData + ', so far: ' + requestData.length);
  return true; 
}
