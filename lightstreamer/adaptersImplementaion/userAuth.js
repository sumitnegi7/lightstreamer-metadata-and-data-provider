const logger = require('../../helpers/logger');
const lsAdapters = require('../lightstreamerAdapter');

const onSessionClose = async (req, res) => {
  try {
    console.log("session terminated")
  } catch (e) {
    logger.error('on session close', e);
    if (!res.success) {
      throw e;
    }
  }
};

const onNewSession = async (req, res) => {
  try {
    logger.info('New session: ', req);
    logger.info('NotifyNewSession (pre-redis): ');
    // redisClient.set(req.sessionId, req.userName).catch((e) => logger.error(e));
    logger.info('NotifyNewSession (post-redis): ');
    if (res.success) {
      res.success();
    }
  } catch (e) {
    logger.error('on new session', e);
    if (!res.success) {
      throw e;
    }
  }
};

const onUserNotify = async (req, res) => {
  logger.info('notify user');
  const {
    userName,
    userPassword,
    headers: { 'iqo-quiz-id': quizId },
  } = req;
  try {
    if (res.success) {
      res.success(0, false);
    }
  } catch (e) {
    if (res.error) {
      res.error(e.message ?? e);
    } else {
      throw e;
    }
  }
};

const getDataFromUserMessage = (req) => {
  const { userName, sessionId, userMessage } = req;
  if (!userMessage) {
    return;
  }

  const userResponse = userMessage.split('|');
  const date = userResponse[0];
  const msg = userResponse[1];

  return {
    date,
    msg
  };
};

const onUserMessage = async (req, res) => {
  try {
    const userMessage = getDataFromUserMessage(req);
     console.log("Message recived",userMessage)
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

module.exports = async () => {
  const { metadataProvider } = await lsAdapters;
  metadataProvider.on('notifyNewSession', onNewSession);
  metadataProvider.on('notifySessionClose', onSessionClose);
  metadataProvider.on('notifyUser', onUserNotify);
  metadataProvider.on('notifyUserMessage', onUserMessage);
};
