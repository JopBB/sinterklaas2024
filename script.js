const quizData = [
	{
		question: 'Hij heeft honger! Hoeveel vocht heeft een baby nodig per dag?',
		options: ['150ml per kilo', '166ml per kilo', '255ml per kilo', 'Zoveel hij wil'],
		answer: '150ml per kilo',
	},
	{
		question: 'Hoeveel babies worden eigenlijk op de uitgerekende datum geboren?',
		options: ['3%', '4%', '5%', '6%'],
		answer: '4%',
	},
	{
		question: 'Vast heel lekker, die moedermelk, maar hoeveel smaakpapillen hebben pasgeboren babies eigenlijk?',
		options: ['150', '250', '10000', '100000'],
		answer: '10000',
	},
	{
		question: 'Vanaf wanneer kan je de nagels knippen van een baby?',
		options: ['Direct', 'Na 1 week', 'Na 4 maanden', 'Nooit, je moet het vijlen'],
		answer: 'Na 4 maanden',
	},
	{
		question: 'Wanneer begint een baby met tranen huilen?',
		options: [
			'Na 2 weken',
			'Na 3 weken',
			'Na anderhalve maand',
			'Nooit, echte mannen huilen niet',
		],
		answer: 'Na 3 weken',
	},
	{
		question: 'Hoeveel luiers zijn er gemiddeld in totaal doorheen gegaan als een kind 4 jaar is?',
		options: ['1600', '4200', '7300', 'Veel te veel'],
		answer: '7300',
	},
	{
		question: 'Waarom hebben babies vaak de hik?',
		options: [
			'Zo vergroten ze de inhoud van hun longen.',
			'Het middenrif kan het te snel drinken nog niet aan',
			'Om ademhalingsspieren te ontwikkelen',
			'Worden ze ontspannen van',
		],
		answer: 'Om ademhalingsspieren te ontwikkelen',
	},
	{
		question: 'Wat moet je NIET doen als een baby de hik heeft?',
		options: ['Zachtjes tegen de rug drukken', 'Een speentje geven', 'Rechtop zetten', 'Ondersteboven houden'],
		answer: 'Ondersteboven houden',
	},
	{
		question: 'Hoe groot is de maag van een pasgeboren bayby?',
		options: [
			'Zo groot als een pijnboompit',
			'Zo groot als een druif',
			'Zo groot als een citroen',
			'Zo groot als een watermeloen',
		],
		answer: 'Zo groot als een druif',
	},
	{
		question: 'Wat moet je in ieder geval NIET doen om obstipatie te verhelpen bij een kind',
		options: ['Buik masseren', 'Niks, kan vanzelf over gaan', 'Laxeermiddel toedienen', 'Beentjes bewegen'],
		answer: 'Laxeermiddel toedienen',
	}
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
	var oldHuilmeter = huilmeter;
	huilmeter = huilmeter + delta;
	if(huilmeter>0 && oldHuilmeter === 0){
		audio.play();
	}

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

function displayResult(){
	audio.pause();
	var laughAudio = new Audio('sounds/laugh/1.mp3')
	laughAudio.volume = 1;
	laughAudio.loop = true;
	laughAudio.play();
	document.getElementById('title').innerHTML = 'Hoera! Gefeliciteerd!'
	document.getElementById('huilmeterEmoji').innerHTML = '&#128515;'
	quizContainer.innerHTML = '<p>Jij bent echt een superoma!</p><p>Je hebt een medaille en een cadeautje verdiend!</p>'
}

function startQuiz() {
	submitButton.style.display = 'inline-block';
	startButton.style.display = 'none';
	displayQuestion();
}

function displayQuestion() {
	makeNewProgressBar();

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
	bar.destroy();
	selectedOption = document.querySelector('input[name="quiz"]:checked');
	if (selectedOption) {
		answer = selectedOption.value;
		if (answer === quizData[currentQuestion].answer) {
			if (willGetPointsForThisQuestion) {
				openModal('puntenErafModal');
				adjustHuilMeter(-2);
			} else {
				openModal('goedMaarTeLaatModal')
			}
		} else {
			openModal('puntenErbijModal');
			adjustHuilMeter(2);
		}

	}
}

function nextQuestion(){
	if (huilmeter > 9) {
		setTimeout(() => {
			openModal('verlorenModal');
			return;
		}, "50");


	}
	currentQuestion++;
	selectedOption.checked = false;
	if (currentQuestion < quizData.length) {
		displayQuestion();
	} else {
		displayResult();
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


function makeNewProgressBar() {
	bar = new ProgressBar.Line('.container');
	bar.animate(1, {
		duration: 8000
	}, function () {
		openModal('telaatModal')
		adjustHuilMeter(2)
		willGetPointsForThisQuestion = false;
	});
}





function useSuperpower(superpower) {
	var delta = 0
	bar.destroy();
	if (huilmeter < 2) {
		openModal('huilmeterTeLaagModal')
		return;
	}
	if (confirm("Je kan elke superkracht maar 1x gebruiken. Weet je zeker dat je de " + superpower + "-superkracht wil gebruiken?")) {
		if (superpower === 'flesje') {
			openModal('flesjeModal')
			delta = -2;
		}
		if (superpower === 'wandeling') {
			openModal('wandelingModal')
			delta = -3;
		}
		if (superpower === 'boertje') {
			openModal('boertjeModal')
			delta = -1;
		}
		document.getElementById(superpower).style.display = 'none';
		adjustHuilMeter(delta);
	}
}



// open modal by id
function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('jw-modal-open');
}

function closeModal(){
	document.querySelector('.jw-modal.open').classList.remove('open');
    document.body.classList.remove('jw-modal-open');
}

// close currently open modal
function closeModalAndNextQuestion() {
    document.querySelector('.jw-modal.open').classList.remove('open');
    document.body.classList.remove('jw-modal-open');
	nextQuestion();
}

function closeModalAndRestart(){
	document.querySelector('.jw-modal.open').classList.remove('open');
    document.body.classList.remove('jw-modal-open');
	retryQuiz();
}

function closeModalAndNewProgressBar(){
	document.querySelector('.jw-modal.open').classList.remove('open');
    document.body.classList.remove('jw-modal-open');
	makeNewProgressBar();
}

window.addEventListener('load', function() {
    // close modals on background click
    document.addEventListener('click', event => {
        if (event.target.classList.contains('jw-modal')) {
            closeModal();
        }
    });
});