/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */
class Game {
	//necesito crear el juego del snake con js y canvas, utilizando una clase llamada Game, con un contructor(width, height, amount), con metrodos: initCanvas(), start(), drawSquare(x, y, color), clear(), drawSnake(), drawFood(), collides(x, y), addFood(), newTile(), step(), input(). Con estas condiciones, se ha de poder jugar al snake, añadiendo que cada vez que coma la serpiente, aumente la velocidad
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
		this.food = [];
		this.start();
		this.initCanvas(width, height);

		/*this.snake = [];
		this.direction = "right";
		this.speed = 200;*/
	}

	/**
	 * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
	 * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	initCanvas(width, height) {
		let canvas = document.createElement("canvas")
		canvas.width = width
		canvas.height = height
		document.body.appendChild(canvas)
		this.ctx = canvas.getContext("2d")
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.snake = [[parseInt(this.amount / 2), parseInt(this.amount / 2)]]
		this.direction = [1, 0]
		/*this.initCanvas();
		this.newTile();
		this.addFood();
		this.interval = setInterval(() => {
			this.step();
		}, this.speed);*/
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x, y, color) {
		let mida = this.width / this.amount
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * mida, y * mida, mida, mida);
	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		this.ctx.fillStyle = 'white'
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		for (let i = 0; i < this.snake.length; i++) {
			this.drawSnake(this.snake[i][0], this.snake[i][1], "green")
		}
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
		this.food.forEach(poma => {
			this.drawSquare('poma'.x, poma.y, "red");
		});
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	checkCollision(x, y, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].x == x && array[i].y == y)
				return true;
		}
		return false;
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
		this.food = [Math.random() * this.amount, Math.random() * this.amount];
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		let resultat = [0, 0];

		let x = (this.snake[0][0] + this.direction[0]);
		let y = (this.snake[0][1] + this.direction[1]);
		resultat[0] = x % this.amount;
		resultat[1] = y % this.amount;
		if (x < 0) resultat[0] = this.amount + x;
		if (y < 0) resultat[1] = this.amount + y;
		return resultat;
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		this.clear()
		this.snake[0] = this.newTile()
		this.drawSnake()

		// Mueve la serpiente en la dirección actual
		/*const head = { x: this.snake[0].x, y: this.snake[0].y };
		switch (this.direction) {
			case "right":
				head.x++;
				break;
			case "left":
				head.x--;
				break;
			case "up":
				head.y--;
				break;
			case "down":
				head.y++;
				break;
		}
		
		// Agrega la nueva cabeza de la serpiente
		this.snake.unshift(head);
	
		// Dibuja todos los elementos en el canvas
		this.clear();
		this.drawSnake();
		this.drawFood();*/
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		switch (e.keyCode) {
			case 37:
				this.direction = [-1, 0]
				if (this.direction !== "right") this.direction = "left";
				break;
			case 38:
				this.direction = [0, -1]
				if (this.direction !== "down") this.direction = "up";
				break;
			case 39:
				this.direction = [1, 0]
				if (this.direction !== "left") this.direction = "right";
				break;
			case 40:
				this.direction = [0, 1]
				if (this.direction !== "up") this.direction = "down";
				break;
		}
	}

}
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let game = new Game(400, 400, 20);
game.start();
document.addEventListener("keydown", e => {
	game.input(e);
});
// let game = new Game(300, 300, 15); // Crea un nou joc
// document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
// window.setInterval(game.step.bind(game), 100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms
