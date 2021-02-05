import React from "react";
import Bet from "./Bet";
import Win from "./Win";
import Credit from "./Credit";
export default function Credits({ increaseBet, decreaseBet, disabled, cash, win, bet }) {
	return (
		<div className="row handlers">
			<Bet increaseBet={increaseBet} decreaseBet={decreaseBet} bet={bet} disabled={disabled} />
			<Win win={win} />
			<Credit cash={cash} />
		</div>
	);
}
