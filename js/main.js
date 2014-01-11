$(document).ready(function() {
	var $rollButtons		= [$('#roll-1'), $('#roll-2'), $('#roll-3')];
	var $results 			= $('#results');
	var buttonStatuses 		= [true, true, true]; // to determine if it is 'rolling' status or 'stop' status
	var numbers 			= ['one', 'two', 'three', 'four', 'five', 'six'];
	var userScores 			= { "one": 0, "two": 0, "three": 0 };
	var computerScores 		= { "one": 0, "two": 0, "three": 0 };
	var totalScores 		= { "user": 0, "computer": 0 };
	var intervalId;

	var calcScores = function(userDices, computerDices, row) {
		if (userDices[0] == 0 || userDices[1] == 0) {
			userScores[row] = 0;
		} else if (userDices[0] == userDices[1]) {
			userScores[row] = (userDices[0] + 1) * 4;
		} else {
			userScores[row] = userDices[0] + userDices[1] + 2;
		}

		if (computerDices[0] == 0 || computerDices[1] == 0) {
			computerScores[row] = 0;
		} else if (computerDices[0] == computerDices[1]) {
			computerScores[row] = (computerDices[0] + 1) * 4;
		} else {
			computerScores[row] = computerDices[0] + computerDices[1] + 2;
		}
	};

	var rollDice = function(row) {
		var userDices =[];
		var computerDices =[];
		intervalId = setInterval(function() {
			for (var i in numbers) {
				$('.user .row-' + row + ' .left .dice-' + numbers[i]).hide();
				$('.user .row-' + row + ' .right .dice-' + numbers[i]).hide();
				$('.computer .row-' + row + ' .left .dice-' + numbers[i]).hide();
				$('.computer .row-' + row + ' .right .dice-' + numbers[i]).hide();
			}

			userDices[0]		= (Math.floor(Math.random() * 6));
			userDices[1]		= (Math.floor(Math.random() * 6));
			computerDices[0]	= (Math.floor(Math.random() * 6));
			computerDices[1]	= (Math.floor(Math.random() * 6));

			$('.user .row-' + row + ' .left .dice-' + numbers[userDices[0]]).show();
			$('.user .row-' + row + ' .right .dice-' + numbers[userDices[1]]).show();
			$('.computer .row-' + row + ' .left .dice-' + numbers[computerDices[0]]).show();
			$('.computer .row-' + row + ' .right .dice-' + numbers[computerDices[1]]).show();

			calcScores(userDices, computerDices, row);
		}, 50);
	};

	var clacTotalScores = function() {
		totalScores.user = userScores.one + userScores.two + userScores.three;
		totalScores.computer = computerScores.one + computerScores.two + computerScores.three;
	};

	var showResults = function() {
		var userResult = "<p>The total User score is: " + userScores.one + " + " + userScores.two + " + " + userScores.three + " = " + totalScores.user + "</p>";
		var computerResult = "<p>The total Computer score is: " + computerScores.one + " + " + computerScores.two + " + " + computerScores.three + " = " + totalScores.computer + "</p>";

		if (buttonStatuses[0] == false && buttonStatuses[1] == false && buttonStatuses[2] == false) {
			if (totalScores.user > totalScores.computer) {
				computerResult += "User Wins!";
			} else if (totalScores.user < totalScores.computer) {
				computerResult += "Computer Wins!";
			} else {
				computerResult += "It's a Tie!";
			}
		}

		$results.find("p").text("");
		$results.append(userResult + computerResult);
	};

	$rollButtons[0].click(function() {
		if (buttonStatuses[0]) {
			rollDice('one');
			$(this).text("Stop");
			buttonStatuses[0] = false;
		} else {
			clearInterval(intervalId);
			$(this).attr("disabled", "disabled");
			clacTotalScores();
			showResults();
		}
	});

	$rollButtons[1].click(function() {
		if (buttonStatuses[1]) {
			rollDice('two');
			$(this).text("Stop");
			buttonStatuses[1] = false;
		} else {
			clearInterval(intervalId);
			$(this).attr("disabled", "disabled");
			clacTotalScores();
			showResults();
		}
	});

	$rollButtons[2].click(function() {
		if (buttonStatuses[2]) {
			rollDice('three');
			$(this).text("Stop");
			buttonStatuses[2] = false;
		} else {
			clearInterval(intervalId);
			$(this).attr("disabled", "disabled");
			clacTotalScores();
			showResults();
		}
	});
});
