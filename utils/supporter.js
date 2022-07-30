const isError = function(e) {
	return (
		e &&
		e.stack &&
		e.message &&
		typeof e.stack === "string" &&
		typeof e.message === "string"
	);
};

const getResponseObject = ()=> ({
		status: "success",
		message: "",
		data: null,
		error_code: ""
	});

module.exports = {
	isError,
    getResponseObject
};
