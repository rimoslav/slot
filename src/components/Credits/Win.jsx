import React from "react";

export default function Win({ win }) {
	return (
		<div className="win-wrapper">
			<label className="cash-label win-label">WIN</label>
			<label className="cash win-amount">{win}</label>
		</div>
	);
}
