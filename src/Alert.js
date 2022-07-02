import React, { useEffect } from "react";

const Alert = ({ alertMsg, alertType }) => {
	return <div className={`alert ${alertType}`}>{alertMsg}</div>;
};

export default Alert;
