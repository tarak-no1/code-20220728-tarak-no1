const CONSTANTS = require("../utils/constants");
const { getResponseObject } = require("../utils/supporter");

class RouteHandler {

    defaultPathHandler (request, response, next) {
        const apiResponse = getResponseObject();
        apiResponse.message = "hello";

		response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json(apiResponse);
	}

	routeNotFoundHandler (request, response, next) {
        const apiResponse = getResponseObject();
        apiResponse.status = "error";
        apiResponse.message = CONSTANTS.ROUTE_NOT_FOUND;
        apiResponse.errorCode = CONSTANTS.ROUTE_NOT_FOUND;

		response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json(apiResponse);
	}

	errorHandler (error, request, response, next) {
        console.log(error);
        const apiResponse = getResponseObject();
        apiResponse.status = "error";
        apiResponse.message = error.message || CONSTANTS.INTERNAL_SERVER_ERROR;
        apiResponse.errorCode = error.error_code || CONSTANTS.INTERNAL_SERVER_ERROR;

		response.status(error.status || CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json(apiResponse);
	}
}

module.exports = new RouteHandler();
