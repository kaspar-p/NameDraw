let foods = [];
let vehicles = [];
let hist = [];
let eraseList = [];
let font;
let backupPoints = [];
let drawCount = 0;

const numVehicles = 2;
const speed = 15;
const numRepeats = 2;
const CONTACT_DISTANCE = 18;

function preload() {
	font = loadFont('OJ2.ttf');
}

function create(val) {
	points = font.textToPoints(val, (width / 2) - 600, (height / 2) + 100)
}

function setup() {
	let canvas = createCanvas(1800, 600);
	canvas.parent("sketchHolder");
	textFont(font);
	textSize(512);
	textAlign(CENTER);
	let value = prompt("What's Your First Name?");

	if (value.toUpperCase() == "GINNY") {
		value = "Fuck Off";
	}

	let points = font.textToPoints(value, (width / 2) - 800, (height / 2) + 100);
	backupPoints = points.slice();

	populateVehicles();

	for (let i = 0; i < points.length; i++) {
		let pt = points[i];
		stroke(0, 255, 0);
		foods.push(createVector(pt.x, pt.y));
	}
}

function draw() {
	for (let j = 0; j < speed; j++) {
		for (let i = 0; i < vehicles.length; i++) {
			let v = vehicles[i];
			v.eat(decideList(), vehicles);
			v.history(v.getWorldRecord());

			if (foods.length > 1) {
				v.update();
			} else {
				drawCount++;
				populateVehicles();
				populateFoods();
			}

			if (eraseList.length < 1) {
				populateVehicles();
				populateFoods();
				clearScreen();
				drawCount = 0;
			}
		}
	}
}

function populateVehicles() {
	for (let i = 0; i < numVehicles; i++) {
		vehicles[i] = new Vehicle(random(width), random(height));
	}
}

function populateFoods() {
	for (let i = 0; i < backupPoints.length; i++) {
		let v = backupPoints[i];
		foods[i] = createVector(v.x, v.y);
	}
}

function decideList() {
	if (drawCount > numRepeats) {
		return eraseList;
	} else {
		return foods
	}
}

function clearScreen() {
	fill(255);
	noStroke();
	rect(0, 0, width, height);
}

function decideColor() {
	if (drawCount > numRepeats) {
		return [255, 255, 255];
	} else {
		return [71, 106, 163];
	}
}
