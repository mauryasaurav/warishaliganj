import BugsModal from "../models/bugs"
/**
 *
 * Send error response
 * @param res - res object of a request
 * @param errorResponse - an object which contains an http status code for the error and an error object
 */
export const sendErrorResponse = (res, message, status = 500) => {
  BugsModal.create({ error: JSON.stringify(message) });
  res.status(status).send({ success: false, message, data: {} });
};


export const sendSuccessResponse = (res, message, data, status = 200) => {
  res.status(status).send({ success: false, message, data });
};
