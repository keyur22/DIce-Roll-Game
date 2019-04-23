var scores, activePlayer, roundScore, isPlaying, winner_score;
init();

document.querySelector(".welcome-section form").addEventListener("submit", function(e) {
	e.preventDefault();
	var player1 = document.querySelector(".welcome-section #player1").value;
	var player2 = document.querySelector(".welcome-section #player2").value;
	winner_score = document.querySelector(".welcome-section #score").value;
	if (!player1) {
		player1 = "Player 1";
	}
	if (!player2) {
		player2 = "Player 2";
	}
	if (!winner_score) {
		winner_score = 100;
	}
	document.getElementById("name-0").textContent = player1;
	document.getElementById("name-1").textContent = player2;
	document.querySelector(".winner-score span").textContent = winner_score;

	document.querySelector(".welcome-section").style.display = "none";
	document.querySelector(".game-section").style.display = "block";
});

// Roll Dice
document.querySelector(".btn-roll").addEventListener("click", function() {
	if (isPlaying) {
		// Generate a number on dice roll
		var dice = Math.floor(Math.random() * 6 + 1);
		document.querySelector(".dice").style.display = "block";
		document.querySelector(".dice").src = "dice-" + dice + ".png";

		if (dice !== 1) {
			// Display score of player
			roundScore += dice;
			document.getElementById("current-" + activePlayer).textContent = roundScore;
		} else {
			// Switch active Player if dice rolls 1
			switchActivePlayer();
		}
	}
});

// Hold
document.querySelector(".btn-hold").addEventListener("click", function() {
	if (isPlaying) {
		// Display Global Score of active Player
		scores[activePlayer] += roundScore;
		document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

		// Check if Player has won
		if (scores[activePlayer] >= winner_score) {
			isPlaying = 0;
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".btn-roll").style.display = "none";
			document.querySelector(".btn-hold").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel .player-name").textContent = "Winner!!!";
		} else {
			// Switch Active Player
			switchActivePlayer();
		}
	}
});

// New Game
document.querySelector(".btn-new").addEventListener("click", init);

// Initialise Game
function init() {
	document.querySelector(".welcome-section").style.display = "flex";
	document.querySelector(".game-section").style.display = "none";
	scores = [0, 0];
	activePlayer = 0;
	document.querySelector(".dice").style.display = "none";
	document.getElementById("score-0").textContent = 0;
	document.getElementById("score-1").textContent = 0;
	resetCurrentScores();
	isPlaying = 1;
}

// Switch Active Player
function switchActivePlayer() {
	document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
	document.querySelector(".dice").style.display = "none";
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
	resetCurrentScores();
}

// Reset Scores of both players
function resetCurrentScores() {
	document.getElementById("current-0").textContent = 0;
	document.getElementById("current-1").textContent = 0;
	roundScore = 0;
}
