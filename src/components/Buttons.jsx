import React from "react";

export default function Buttons({ setMaxBet, spin, win_image, disabled }) {
	return (
		<div className="row buttons-row">
			<button className="button max-bet" onClick={setMaxBet} disabled={disabled}></button>
			<img src={win_image} className="win-info" alt="WIN!" />
			<button className="button button-spin" onClick={spin} disabled={disabled}></button>
		</div>
	);
}
