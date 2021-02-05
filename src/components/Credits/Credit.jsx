import React from "react";

export default function Credit({ cash }) {
	return (
		<div>
			<label className="cash-label">CREDIT</label>
			<label className="cash cash-amount">{cash}</label>
		</div>
	);
}
