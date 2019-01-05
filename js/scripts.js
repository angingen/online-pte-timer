$(document).ready(function() {
	// default time
	var speakingDefault = 40;
	var readingTimeDefault = 25;

	$('#readingTimeInput')[0].value = readingTimeDefault;
	$('#speakingTimeInput')[0].value = speakingDefault;
	predefindedSetUp();

	// radio buttons
	// custom
	$('#describeImage').click(function() {
		$('#customSetting').removeClass('custom');
		readingTimeDefault = 25;
		$('#readingTimeInput')[0].value = readingTimeDefault;
		$('#speakingTimeInput')[0].value = speakingDefault;
		timerReset(readingTimeDefault);
		predefindedSetUp();
		enableAll()
		$('#timerType')[0].innerHTML = 'Describe Image';
	});

	$('#readAloud').click(function() {
		$('#customSetting').removeClass('custom');
		readingTimeDefault = 30;
		$('#readingTimeInput')[0].value = readingTimeDefault;
		$('#speakingTimeInput')[0].value = speakingDefault;
		timerReset(readingTimeDefault);
		predefindedSetUp();
		enableAll()
		$('#timerType')[0].innerHTML = 'Read Aloud';
	});

	$('#retellLecture').click(function() {
		$('#customSetting').removeClass('custom');
		readingTimeDefault = 10;
		$('#readingTimeInput')[0].value = readingTimeDefault;
		$('#speakingTimeInput')[0].value = speakingDefault;
		timerReset(readingTimeDefault);
		predefindedSetUp();
		$('#timerType')[0].innerHTML = 'Re-tell Lecture';
		enableAll()
	});

	$('#customSetting').click(function() {
		readingTimeDefault = 25;
		speakingDefault = 40;
		$('#customSetting').addClass('custom');
		$('#readingTimeInput')[0].value = '';
		$('#speakingTimeInput')[0].value = '';
		timerReset(readingTimeDefault);
		predefindedSetUp();
		enableAll();
		$('#timerType')[0].innerHTML = 'Custom';
	});

	// radio button ends

	// focus model relization
	$('#focusModelButton').click(function() {
		if($('#focusModelButton')[0].innerHTML === 'Focus Model') {
			$('#navbarSection')[0].style.display = 'none';
			$('#footer')[0].style.display = 'none';
			document.getElementById('focusModelButton').innerHTML = 'Return';
		} else {
			$('#navbarSection')[0].style.display = '';
			$('#footer')[0].style.display = '';
			$('#focusModelButton')[0].innerHTML = 'Focus Model';
		}
	});
	// reading time prompt
	$('#readingTimeInput').change(function() {
		// validation of the input to be pure number and greater than 0
		if (/^00*0$|[^\d]+/.test(document.getElementById('readingTimeInput').value)) {
			alert('Please enter a NUMBER greater than 0.')
			document.getElementById('readingTimeInput').value = '';
			var customeReadingTime = readingTimeDefault
		} else {
			var customeReadingTime = + document.getElementById('readingTimeInput').value;
		}
		$('#readingTimeSec')[0].innerHTML = customeReadingTime;
	});

	// progress bar digital countdown
	$('#speakingTimeInput').change(function() {
		if (/^00*0$|[^\d]+/.test(document.getElementById('speakingTimeInput').value)) {
			alert('Please enter a NUMBER greater than 0.')
			 document.getElementById('speakingTimeInput').value = '';
			var customeSpeaking = speakingDefault
		} else {
			var customeSpeaking = + document.getElementById('speakingTimeInput').value;
		}
		$('#totalTime')[0].innerHTML = customeSpeaking;
	});

	// reading time switch
	$('#readingTimeSwitch').click(function() {
		if ($('#readingTimeSwitch')[0].checked) {
			if ($('#customSetting').hasClass('custom')) {
				$('#readingTimeInput')[0].disabled = false;
			}
			$('#readingTimePrompt')[0].style.visibility = 'visible';
			$('#startButton')[0].disabled = false;
		} else {
			$('#readingTimeInput')[0].disabled = true;
			$('#readingTimePrompt')[0].style.visibility = 'hidden';
			$('#promptStart')[0].style.visibility = 'visible';
			if (!$('#speakingTimeSwitch')[0].checked) {
				alert('Please enable at least one countdown to use the timer.');
				$('#startButton')[0].disabled = true;;
			}
		}
	});

	// speaking time switch
	$('#speakingTimeSwitch').click(function() {
		if ($('#speakingTimeSwitch')[0].checked) {
			if ($('#customSetting').hasClass('custom')) {
				$('#speakingTimeInput')[0].disabled = false;
			}
			// disable the show second switch
			$('#secondsSwitch')[0].disabled = false;
			$('#startButton')[0].disabled = false;

		} else {
			// diable input field
			$('#speakingTimeInput')[0].disabled = true; 
			// diable second switch
			$('#secondsSwitch')[0].checked = false; 
			$('#secondsSwitch')[0].disabled = true;
			$('#speakingTimePrompt')[0].style.visibility = 'hidden';
			// check if two timers are disabled
			if (!$('#readingTimeSwitch')[0].checked) {
				alert('Please enable at least one countdown to use the timer.');
				$('#startButton')[0].disabled = true;
			} 
		}
	});

	// show second switch
	$('#secondsSwitch').click(function() {
		if($('#secondsSwitch')[0].checked) {
			$('#speakingTimePrompt')[0].style.visibility = 'visible';
		} else {
			$('#speakingTimePrompt')[0].style.visibility = 'hidden';
		}
	});

	
	// start the timer 
	$('#startButton').click(function() {
		$('#stopButton')[0].disabled = false;
		if($('#startButton')[0].innerHTML === 'START'){
			disableAll();
			$('#myBar')[0].style.backgroundColor = '#61B087';
			$('#startButton')[0].innerHTML = 'CANCLE';
			$('#promptStart')[0].style.visibility = 'hidden';
			$('#myBar').removeClass('abort');
			$('#myBar').removeClass('pause');
			if ($('#readingTimeSwitch')[0].checked && $('#speakingTimeSwitch')[0].checked) {
				readingTimeCountdown(readingTimeDefault,progressBarCountdown);
			} else if ($('#readingTimeSwitch')[0].checked){
				readingTimeCountdown(readingTimeDefault,disableStop); // only reading time checked
			} else {
				progressBarCountdown(); // only speaking time checked
			}
			
		} else { // click the CANCLE button
			$('#startButton')[0].innerHTML = 'START';
			$('#myBar').addClass('abort');
			// restore the stop button
			$('#stopButton')[0].innerHTML = 'PAUSE';
			$('#stopButton')[0].disabled = true;
			//reset timer
			timerReset(readingTimeDefault);
			enableAll();
		}
	});	

	// stop button
	$('#stopButton').click(function() {
		if($('#stopButton')[0].innerHTML === 'PAUSE'){
			$('#myBar').addClass('pause');
			$('#stopButton')[0].innerHTML = 'RESUME';

		} else {
			$('#stopButton')[0].innerHTML = 'PAUSE';
			$('#myBar')[0].style.backgroundColor = '#61B087';
			$('#myBar').removeClass('pause');
		}
	});

})

function progressBarCountdown(){
	var speakingTime = document.getElementById('speakingTimeInput').value || 40;
	var passingTime = 0 
	var id = setInterval(frame, 1000);
	var widthUnit = 100/speakingTime;
	var width = 0;
	function frame() {
		if (width >= 100 || $('#myBar').hasClass('abort') || $('#myBar').hasClass('pause')) {
			if (!$('#myBar').hasClass('pause')) {
				clearInterval(id);
			} else {
				$('#promptStart')[0].innerHTML = '(Status: Pausing)';
			}
			$('#myBar')[0].style.backgroundColor = '#C24332';
		} else {
			width += widthUnit;
			$('#myBar')[0].style.width = width + '%';
			passingTime ++;
			$('#passingTime')[0].innerHTML = passingTime;
			$('#promptStart')[0].innerHTML = '(Status: Speaking)';
			$('#promptStart')[0].style.visibility = 'visible';
			if (width == 100) {
				$('#promptStart')[0].innerHTML = '(Status: End)';
				$('#myBar')[0].style.backgroundColor = '#C24332';
				$('#stopButton')[0].disabled = true;
			}
		}
	}
}

function readingTimeCountdown(readingTimeDefault,callback){
	var readingTime = document.getElementById('readingTimeInput').value || readingTimeDefault;
	var id = setInterval(frame, 1000);
	function frame() {
		if (readingTime == 0 || $('#myBar').hasClass('abort') || $('#myBar').hasClass('pause')) {
			if (readingTime == 0 ) {
				$('#readingTimePrompt')[0].style.visibility = 'hidden';
				$('#promptStart')[0].innerHTML = '(Status: End)';
				$('#promptStart')[0].style.visibility = 'visible';
				clearInterval(id);
				if ($('#speakingTimeSwitch')[0].checked){
					$('#promptStart')[0].innerHTML = '(Status: Speaking)';
				}
				callback();
			} else if ($('#myBar').hasClass('pause')) {
				$('#promptStart')[0].innerHTML = '(Status: Pausing)';
				$('#promptStart')[0].style.visibility = 'visible';
			} else {
				clearInterval(id);
			}

		} else {
			readingTime --;
			$('#readingTimeSec')[0].innerHTML = readingTime;
			$('#promptStart')[0].style.visibility = 'hidden';
		}
	}
}

function timerReset(readingTimeDefault) {
	$('#passingTime')[0].innerHTML = 0;
	$('#readingTimeSec')[0].innerHTML = + document.getElementById('readingTimeInput').value || readingTimeDefault;
	$('#promptStart')[0].style.visibility = 'visible';
	$('#myBar')[0].style.width = 0;
	$('#myBar').removeClass('pause');
	if ($('#readingTimeSwitch')[0].checked){
		$('#readingTimePrompt')[0].style.visibility = 'visible';
	}
	$('#promptStart')[0].innerHTML = '(click START to start the timer)';
}

function disableAll() {
	$('#readingTimeSwitch')[0].disabled = true;
	$('#readingTimeInput')[0].disabled = true;
	$('#speakingTimeSwitch')[0].disabled = true;
	$('#speakingTimeInput')[0].disabled = true;
	// $('#secondsSwitch')[0].disabled = true;
}

function disableStop() {
	$('#stopButton')[0].disabled = true;
}

function enableAll() {
	if ($('#customSetting').hasClass('custom')) {
		if ($('#readingTimeSwitch')[0].checked) {
			$('#readingTimeInput')[0].disabled = false;
		}
		if ($('#speakingTimeSwitch')[0].checked) {
			$('#speakingTimeInput')[0].disabled = false;
		}
	}
	$('#readingTimeSwitch')[0].disabled = false;
	$('#speakingTimeSwitch')[0].disabled = false;
	$('#secondsSwitch')[0].disabled = false;
	if ($('#secondsSwitch')[0].checked){
		$('#speakingTimePrompt')[0].style.visibility = 'visible';
	}
}

function predefindedSetUp() {
	$('#readingTimeInput')[0].disabled = true;
	$('#speakingTimeInput')[0].disabled = true;
	$('#startButton')[0].disabled = false;
	$('#readingTimeSwitch')[0].checked = true;
	$('#speakingTimeSwitch')[0].checked = true;
	$('#secondsSwitch')[0].checked = false;
	$('#speakingTimePrompt')[0].style.visibility = 'hidden';
	$('#readingTimePrompt')[0].style.visibility = 'visible';
	$('#myBar').addClass('abort');
	$('#myBar').removeClass('pause');
	$('#startButton')[0].innerHTML = 'START';
	$('#stopButton')[0].innerHTML = 'PAUSE';
	$('#totalTime').text('40');
	$('#stopButton')[0].disabled = true;
	$('#promptStart')[0].innerHTML = '(click START to start the timer)';
	$('#myBar')[0].style.backgroundColor = '#61B087';

}

function inputInitializing(reading,speaking) {
	$('#readingTimeInput')[0].value = reading;
	$('#speakingTimeInput')[0].value = speaking;
}
// why using $('#custom')[0].checked returns false but still goes into the if statement???



