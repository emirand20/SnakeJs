/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */
class Game {

	/**
	 * Inicialitza els paràmetres del joc i crea el canvas
	 * @constructor
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 * @param {number} amount -  nombre de quadrats per fila de la quadrícula
	 */
	constructor(width, height, amount) {
		this.width = width;
		this.height = height;
		this.amount = amount;
		this.canvas = null;
		this.ctx = null;
		this.snake = [];
		this.food = [];
		this.direction = "right";
		this.score = 0;
		this.interval = null;
	}

	/**
	 * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
	 * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	initCanvas(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx = this.canvas.getContext("2d");
		document.body.appendChild(this.canvas);
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		let center = this.amount / 2;
		this.snake = [[center, center]];
		this.food = [];
		this.direction = "right";
		this.score = 0;
		this.addFood();
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x, y, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * this.amount, y * this.amount, this.amount, this.amount);
	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		this.snake.forEach(tile => {
			this.drawSquare(tile[0], tile[1], "blue");
		});
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
		for (let i = 0; i < this.food.length; i++) {
			this.drawSquare(this.food[i][0], this.food[i][1], "red");
		}
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x, y) {
		for (let i = 0; i < this.snake.length; i++) {
			if (x === this.snake[i][0] && y === this.snake[i][1]) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
		let x = Math.floor(Math.random() * this.amount);
		let y = Math.floor(Math.random() * this.amount);
		while (this.collides(x, y)) {
			x = Math.floor(Math.random() * this.amount);
			y = Math.floor(Math.random() * this.amount);
		}
		this.food.push([x, y]);
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
	}
}

let game = new Game(300, 300, 15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game), 100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms
