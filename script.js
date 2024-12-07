const quizData = [
	{
		question: 'Hij heeft honger! Hoeveel vocht heeft een baby nodig per dag?',
		options: ['150ml per kilo', '166ml per kilo', '255ml per kilo', 'Zoveel hij wil'],
		answer: '150ml per kilo',
	},
	{
		question: 'Vraag 2',
		options: ['X', 'Y', 'Z', 'ZZ'],
		answer: 'Jupiter',
	},
	{
		question: 'Which country won the FIFA World Cup in 2018?',
		options: ['Brazil', 'Germany', 'France', 'Argentina'],
		answer: 'France',
	},
	{
		question: 'What is the tallest mountain in the world?',
		options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
		answer: 'Mount Everest',
	},
	{
		question: 'Which is the largest ocean on Earth?',
		options: [
			'Pacific Ocean',
			'Indian Ocean',
			'Atlantic Ocean',
			'Arctic Ocean',
		],
		answer: 'Pacific Ocean',
	},
	{
		question: 'What is the chemical symbol for gold?',
		options: ['Au', 'Ag', 'Cu', 'Fe'],
		answer: 'Au',
	},
	{
		question: 'Who painted the Mona Lisa?',
		options: [
			'Pablo Picasso',
			'Vincent van Gogh',
			'Leonardo da Vinci',
			'Michelangelo',
		],
		answer: 'Leonardo da Vinci',
	},
	{
		question: 'Which planet is known as the Red Planet?',
		options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
		answer: 'Mars',
	},
	{
		question: 'What is the largest species of shark?',
		options: [
			'Great White Shark',
			'Whale Shark',
			'Tiger Shark',
			'Hammerhead Shark',
		],
		answer: 'Whale Shark',
	},
	{
		question: 'Which animal is known as the King of the Jungle?',
		options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
		answer: 'Lion',
	},
];

document.addEventListener("DOMContentLoaded", function (event) {

	var audio = new Audio('sounds/cry/1.mp3');
	
	const quizContainer = document.getElementById('quiz');
	const resultContainer = document.getElementById('result');
	const submitButton = document.getElementById('submit');
	const startButton = document.getElementById('start');
	const retryButton = document.getElementById('retry');
	const showAnswerButton = document.getElementById('showAnswer');

	let currentQuestion = 0;
	let score = 0;
	let incorrectAnswers = [];

	function displayStart() {
		quizContainer.innerHTML = '<p>Ben jij een superoma? Houd je kleinkind tevreden tijdens deze quiz!</p>'
	}

	function startQuiz() {
		submitButton.style.display = 'inline-block';
		startButton.style.display = 'none';
		displayQuestion();
	}

	function displayQuestion() {
		var bar = new ProgressBar.Line('.container');
		bar.animate(1, {
			duration: 5000
		}, function () {
			alert("Ojee, je hebt hem te lang honger laten hebben! Nu zal het huilen wel gaan beginnen...");
			audio.play();
			audio.loop = true;
			audio.volume = 0.2;
		});

		const questionData = quizData[currentQuestion];

		const questionElement = document.createElement('div');
		questionElement.className = 'question';
		questionElement.innerHTML = questionData.question;

		const optionsElement = document.createElement('div');
		optionsElement.className = 'options';

		const options = [...questionData.options];

		for (let i = 0; i < options.length; i++) {
			const option = document.createElement('label');
			option.className = 'option';

			const radio = document.createElement('input');
			radio.type = 'radio';
			radio.name = 'quiz';
			radio.value = options[i];

			const optionText = document.createTextNode(options[i]);

			option.appendChild(radio);
			option.appendChild(optionText);
			optionsElement.appendChild(option);
		}

		quizContainer.innerHTML = '';
		quizContainer.appendChild(questionElement);
		quizContainer.appendChild(optionsElement);
	}

	function checkAnswer() {
		const selectedOption = document.querySelector('input[name="quiz"]:checked');
		if (selectedOption) {
			const answer = selectedOption.value;
			if (answer === quizData[currentQuestion].answer) {
				score++;
			} else {
				


				incorrectAnswers.push({
					question: quizData[currentQuestion].question,
					incorrectAnswer: answer,
					correctAnswer: quizData[currentQuestion].answer,
				});
			}
			currentQuestion++;
			selectedOption.checked = false;
			if (currentQuestion < quizData.length) {
				displayQuestion();
			} else {
				displayResult();
			}
		}
	}

	function displayResult() {
		quizContainer.style.display = 'none';
		submitButton.style.display = 'none';
		retryButton.style.display = 'inline-block';
		showAnswerButton.style.display = 'inline-block';
		resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
	}

	function retryQuiz() {
		currentQuestion = 0;
		score = 0;
		incorrectAnswers = [];
		quizContainer.style.display = 'block';
		submitButton.style.display = 'inline-block';
		retryButton.style.display = 'none';
		showAnswerButton.style.display = 'none';
		resultContainer.innerHTML = '';
		displayQuestion();
	}

	function showAnswer() {
		quizContainer.style.display = 'none';
		submitButton.style.display = 'none';
		retryButton.style.display = 'inline-block';
		showAnswerButton.style.display = 'none';

		let incorrectAnswersHtml = '';
		for (let i = 0; i < incorrectAnswers.length; i++) {
			incorrectAnswersHtml += `
		<p>
		  <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
		  <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
		  <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
		</p>
	  `;
		}

		resultContainer.innerHTML = `
	  <p>You scored ${score} out of ${quizData.length}!</p>
	  <p>Incorrect Answers:</p>
	  ${incorrectAnswersHtml}
	`;
	}

	submitButton.addEventListener('click', checkAnswer);
	retryButton.addEventListener('click', retryQuiz);
	startButton.addEventListener('click', startQuiz);
	showAnswerButton.addEventListener('click', showAnswer);


	displayStart();
});