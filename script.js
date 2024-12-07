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

var huilmeter = 0;
var huilmetertext;
var quizContainer;
var resultContainer;
var submitButton;
var startButton;
var retryButton;
var showAnswerButton;
var currentQuestion = 0;
var score = 0;
var willGetPointsForThisQuestion = true;
var audio = new Audio('sounds/cry/1.mp3');
var bar;
audio.volume = 0;
audio.loop = true;
audio.play();

document.addEventListener("DOMContentLoaded", function (event) {



	huilmetertext = document.getElementById('huilmetertext')
	quizContainer = document.getElementById('quiz');
	resultContainer = document.getElementById('result');
	submitButton = document.getElementById('submit');
	startButton = document.getElementById('start');
	retryButton = document.getElementById('retry');
	showAnswerButton = document.getElementById('showAnswer');

	submitButton.addEventListener('click', checkAnswer);
	retryButton.addEventListener('click', retryQuiz);
	startButton.addEventListener('click', startQuiz);
	showAnswerButton.addEventListener('click', showAnswer);


	adjustHuilMeter(0);
	displayStart();
});

function adjustHuilMeter(delta) {
	huilmeter = huilmeter + delta;
	if (huilmeter < 0) {
		huilmeter = 0;
	}
	if (huilmeter > 10) {
		huilmeter = 10;
	}

	huilmetertext.innerHTML = huilmeter + "/10"
	audio.volume = huilmeter / 10;
}

function displayStart() {
	quizContainer.innerHTML = '<p>Ben jij een superoma? Houd je kleinkind tevreden tijdens deze quiz door de vragen zo snel mogelijk goed te beantwoorden! Als dat niet lukt, zal je kleinkind in huilen uitbarsten!</p><p>Rechtsboven zie je de huilmeter. Hoe hoger hij komt, hoe harder je kleinkind zal huilen. Beantwoord de vragen goed, of zet onderstaande superkrachten in om de huilmeter in bedwang te houden.</p>'
}

function startQuiz() {
	submitButton.style.display = 'inline-block';
	startButton.style.display = 'none';
	displayQuestion();
}

function displayQuestion() {
	makeNewProgressBar();

	const questionData = quizData[currentQuestion];
	console.log('current question' + currentQuestion)

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
			if (willGetPointsForThisQuestion) {
				alert("Goed gedaan! Je kleinzoon is tevreden met het antwoord, en huilt iets minder hard. 2 huilpunten minder!")
				adjustHuilMeter(2);
			} else {
				alert("Dat antwoord was goed, maar veel te laat! De huilmeter zal nu niet dalen.")
			}
		} else {
			alert("Dat antwoord was helaas niet goed... Je kleinzoon is hier niet blij mee, en huilt weer wat harder! 2 huilpunten erbij!")
			adjustHuilMeter(2);
		}
		if (huilmeter > 9) {
			alert("Oei, de huilmeter zit op z'n maximum! Dat lijkt me niet helemaal superoma. Probeer het nog een keer om superoma te worden!")
			retryQuiz();
			return;
		}
		currentQuestion++;
		selectedOption.checked = false;
		bar.destroy();
		if (currentQuestion < quizData.length) {
			displayQuestion();
		} else {
			displayResult();
		}
	}
}


function retryQuiz() {
	currentQuestion = 0;
	adjustHuilMeter(-10);
	quizContainer.style.display = 'block';
	submitButton.style.display = 'inline-block';
	retryButton.style.display = 'none';
	showAnswerButton.style.display = 'none';
	resultContainer.innerHTML = '';
	bar.destroy();
	displayQuestion();
}


function makeNewProgressBar(){
	bar = new ProgressBar.Line('.container');
		bar.animate(1, {
			duration: 5000
		}, function () {
			alert("Oeps, niet snel genoeg. Dat betekent huilen!");
			adjustHuilMeter(2)
			willGetPointsForThisQuestion = false;
		});
}





function useSuperpower(superpower) {
	var delta = 0
	bar.destroy();
	if (huilmeter < 2) {
		alert("De huilmeter is nog niet hoog genoeg om een superkracht te kunnen gebruiken")
		makeNewProgressBar();
		return;
	}
	if (confirm("Je kan elke superkracht maar 1x gebruiken. Weet je zeker dat je de " + superpower + "-superkracht wil gebruiken?")) {
		if (superpower === 'flesje') {
			alert("Je geeft hem een flesje, dat kalmeert hem een beetje. 2 punten op de huilmeter eraf!")
			delta = -2;
		}
		if (superpower === 'wandeling') {
			alert("Je gaat een stukje met hem wandelen. Dat vindt 'ie geweldig, het scheelt wel 3 huilpunten!")
			delta = -3;
		}
		if (superpower === 'boertje') {
			alert("Er zat duidelijk iets vast. 1 huilpunt op de huilmeter minder!")
			delta = -1;
		}
		document.getElementById(superpower).style.display = 'none';
		adjustHuilMeter(delta);

	} 

	makeNewProgressBar();

}