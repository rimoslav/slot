import React from "react";

export default function Bet({ bet, increaseBet, decreaseBet, disabled }) {
	return (
		<div className="column">
			<div className="row betting">
				<label className="cash-label bet-label">BET</label>
				<label className="cash bet-value">{bet}</label>
				<div className="quantity">
					<button className="button bet plus" onClick={increaseBet} disabled={disabled}></button>
					<button className="button bet minus" onClick={decreaseBet} disabled={disabled}></button>
				</div>
			</div>
		</div>
	);
}
