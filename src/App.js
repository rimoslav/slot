import { Component } from "react";
import { makeMatrix, checkForWin } from "./helpers";
import win_image from "./img/win.png";

const sounds = {
	start: "https://firebasestorage.googleapis.com/v0/b/slot-machine-4f0bf.appspot.com/o/start_2.mp4?alt=media&token=e9916579-c5a5-4898-8e2d-3e8688dea509",
	coin: "https://firebasestorage.googleapis.com/v0/b/slot-machine-4f0bf.appspot.com/o/coin.mp4?alt=media&token=e07d48bd-cb07-41a8-a649-2deb01e86290",
	stop_wheel: "https://firebasestorage.googleapis.com/v0/b/slot-machine-4f0bf.appspot.com/o/stop.mp4?alt=media&token=036df9fb-93bd-4b90-a6cb-dfad7b8faf6c",
	small_win: "https://firebasestorage.googleapis.com/v0/b/slot-machine-4f0bf.appspot.com/o/low.mp4?alt=media&token=2aea05b3-8519-4bb2-b32a-28545c043e73",
	medium_win: "https://firebasestorage.googleapis.com/v0/b/slot-machine-4f0bf.appspot.com/o/medium.mp4?alt=media&token=92630f41-a0b0-45aa-8542-69e77fba0f53",
	high_win: "https://firebasestorage.googleapis.com/v0/b/slot-machine-4f0bf.appspot.com/o/high.mp4?alt=media&token=6b27b877-d201-46d8-891d-252f0b35d869",
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			cash: 5000,
			bet: 5,
			win: 0,
			changingBet: false,
			start_spin: new Audio(sounds.start),
			stop_spin: [
				new Audio(sounds.stop_wheel),
				new Audio(sounds.stop_wheel),
				new Audio(sounds.stop_wheel),
				new Audio(sounds.stop_wheel),
				new Audio(sounds.stop_wheel),
			],
			coin: new Audio(sounds.coin),
			small_win: new Audio(sounds.small_win),
			medium_win: new Audio(sounds.medium_win),
			high_win: new Audio(sounds.high_win),
		};
	}

	componentDidMount = () => {
		// When changing the bet, pause the possibility to change again until the sound finished playing.
		this.state.coin.addEventListener("ended", () => this.setState({ changingBet: false }));
	};

	componentWillUnmount = () => {
		this.state.coin.removeEventListener("ended", () => this.setState({ changingBet: false }));
	};

	increaseBet = () => {
		const { changingBet, bet, cash } = this.state;
		if (!changingBet) {
			// Play the sound on button press until bet reaches 1000
			if (bet < 1000) {
				this.state.coin.play();
				this.setState({ changingBet: true });
			}
			// Increase bet up to 1000 or total credit if it's less than 1000
			// Bet can be 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500 or 1000
			if (bet === 5 && cash >= 10) {
				this.setState({ bet: 10 });
			} else if (bet < 100 && cash >= bet + 10) {
				this.setState({ bet: bet + 10 });
			} else if (bet < 500 && cash >= bet + 100) {
				this.setState({ bet: bet + 100 });
			} else if (bet === 500 && cash >= 1000) {
				this.setState({ bet: 1000 });
			}
		}
	};

	decreaseBet = () => {
		const { changingBet, bet } = this.state;
		if (!changingBet) {
			// Play the sound on button press until bet reaches 5
			if (bet > 5) {
				this.state.coin.play();
				this.setState({ changingBet: true });
			}
			if (bet === 1000) {
				this.setState({ bet: 500 });
			} else if (bet <= 500 && bet > 100) {
				this.setState({ bet: bet - 100 });
			} else if (bet <= 100 && bet > 10) {
				this.setState({ bet: bet - 10 });
			} else if (bet === 10) {
				this.setState({ bet: 5 });
			}
		}
	};

	setMaxBet = () => {
		if (this.state.bet < 1000) {
			this.setState({ bet: 1000 }, () => this.state.coin.play());
		}
	};

	spin = () => {
		// Play start spinning sound
		this.state.start_spin.play();
		// Reset the win field value to 0 for the new spin
		this.setState({ win: 0 });
		// First spin reels up slightly
		const spinners = this.spinUp();
		// Then start spinning down by greater amount
		this.spinDown(spinners);
	};

	spinUp = () => {
		const { cash, bet } = this.state;
		// Once spinning starts, disable the spin button till spin is completed
		// Subtract betting value from the total cash amount
		this.setState({ disabled: true, cash: cash - bet });
		const spinners = document.querySelectorAll(".spinner");
		// Generate random number dividable by line height, which is 180px
		const ran_1 = (4 + Math.ceil(Math.random() * 5)) * 3 * 180;
		spinners.forEach((spinner, index) => {
			// Get curent background position by Y axis for all reels and subtract the random number of pixels generated above
			const current = parseInt(spinner.style.backgroundPositionY.slice(0, -2));
			spinner.style.backgroundPositionY = (current - ran_1).toString() + "px";
			// Play stop spinning sound for each reel once the real stopped spinning
			window.setTimeout(
				() => {
					this.state.stop_spin[index].play();
				},
				index === 1 ? 2530 : index === 2 ? 2910 : index === 3 ? 3280 : index === 4 ? 3700 : 2090
			);
		});
		return spinners;
	};

	spinDown = (spinners) => {
		spinners.forEach((spinner, index) => {
			window.setTimeout(() => {
				// Generate random number for each real dividable by line height and add it to current backgroundPositionY of that real
				const ran_2 = (4 + Math.ceil(Math.random() * 12)) * 5 * 180;
				const current = parseInt(spinner.style.backgroundPositionY.slice(0, -2));
				spinner.style.backgroundPositionY = (current + ran_2).toString() + "px";
				// If the spinning is completed get the result
				if (index === 4) {
					this.getResult(spinners);
				}
			}, (index + 1) * 1.1 * 300);
		});
	};

	getResult = (spinners) => {
		const { bet, cash, small_win, medium_win, high_win } = this.state;
		window.setTimeout(() => {
			const positions = [];
			// Generate reel positions % 2160 - background image height - which generates numbers: 0, 180, 360, 540, ..., 1980
			spinners.forEach((spinner) => {
				positions.push(parseInt(spinner.style.backgroundPositionY.slice(0, -2)) % 2160);
			});
			// Make an array of arrays representing symbols displayed on the screen
			const matrix = makeMatrix(positions);
			// Check how much the user won if any, play different sounds for different amounts of win
			const win = checkForWin(matrix, bet);
			// If user won any amount blink the Win! image 3 times
			if (win > 0) {
				const happy = document.getElementsByClassName("win-info")[0];
				happy.classList.add("win-info-blinker");
				window.setTimeout(() => {
					happy.classList.remove("win-info-blinker");
				}, 2250);
			}
			if (win > 45) {
				high_win.play();
			} else if (win > 30) {
				medium_win.play();
			} else if (win > 0) {
				small_win.play();
			}
			// Disabled is set to false, spinning button works again. The amount won is added to cash total
			this.setState({ disabled: false, win: win * bet, cash: cash + win * bet }, () => {
				// If the previous bet is greater than cash left in the bank, reduce the bet to the highest possible value less or equal to current bank amount
				if (bet > cash) {
					if (cash > 500) {
						this.setState({ bet: 500 });
					} else if (cash <= 500 && cash > 100) {
						this.setState({ bet: cash - (cash % 100) });
					} else if (cash <= 100 && cash > 10) {
						this.setState({ bet: cash - (cash % 10) });
					} else if (cash <= 10) {
						this.setState({ bet: 5 });
					}
				}
				// If there's no cash left, the game is over
				if (cash === 0) {
					this.setState({ disabled: true, bet: 0 });
				}
			});
		}, 2500);
	};
	render() {
		const { disabled, bet, cash, win } = this.state;
		return (
			<div className="main">
				<div className="machine">
					<div className="spinner" style={{ backgroundPosition: "17px 0px" }}></div>
					<div className="spinner" style={{ backgroundPosition: "17px 0px" }}></div>
					<div className="spinner" style={{ backgroundPosition: "17px 0px" }}></div>
					<div className="spinner" style={{ backgroundPosition: "17px 0px" }}></div>
					<div className="spinner" style={{ backgroundPosition: "17px 0px" }}></div>
				</div>
				<div className="row handlers">
					<div className="column">
						<div className="row betting">
							<label className="cash-label bet-label">BET</label>
							<label className="cash bet-value">{bet}</label>
							<div className="quantity">
								<button className="button bet plus" onClick={this.increaseBet} disabled={disabled}></button>
								<button className="button bet minus" onClick={this.decreaseBet} disabled={disabled}></button>
							</div>
						</div>
					</div>
					<div>
						<label className="cash-label  win-label">WIN</label>
						<label className="cash win-amount">{win}</label>
					</div>
					<div>
						<label className="cash-label">CREDIT</label>
						<label className="cash cash-amount">{cash}</label>
					</div>
				</div>
				<div className="row buttons-row">
					<button className="button max-bet" onClick={this.setMaxBet} disabled={disabled}></button>
					<img src={win_image} className="win-info" />
					<button className="button button-spin" onClick={this.spin} disabled={disabled}></button>
				</div>
			</div>
		);
	}
}

export default App;
