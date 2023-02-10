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
		this.snake = [];
		this.food = [];
		this.direction = "right";
		this.speed = 200;
	}

	/**
	 * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
	 * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	initCanvas() {
		this.canvas = document.createElement("canvas");
		this.canvas.width = 500
		this.canvas.height = 500
		this.ctx = this.canvas.getContext("2d");
		document.body.appendChild(this.canvas);
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.initCanvas();
		this.newTile();
		this.addFood();
		this.interval = setInterval(() => {
			this.step();
		}, this.speed);
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
			this.drawSquare(tile.x, tile.y, "blue");
		});
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
		this.food.forEach(tile => {
			this.drawSquare(tile.x, tile.y, "red");
		});
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x, y) {
		return this.snake.some(tile => {
			return tile.x === x && tile.y === y;
		});
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
		let x = Math.floor(Math.random() * (this.width / this.amount));
		let y = Math.floor(Math.random() * (this.height / this.amount));
		while (this.collides(x, y)) {
			x = Math.floor(Math.random() * (this.width / this.amount));
			y = Math.floor(Math.random() * (this.height / this.amount));
		}
		this.food.push({ x, y });
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		// let x = Math.floor(this.width / this.amount / 2);
		// let y = Math.floor(this.height / this.amount / 2);
		// this.snake.unshift({ x, y });
		const head = this.snake[0];
		let x = head;
		let y = head;
		switch (this.direction) {
			case "right":
				x++;
				break;
			case "left":
				x--;
				break;
			case "up":
				y--;
				break;
			case "down":
				y++;
				break;
		}
		this.snake.unshift({x, y});
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		// Mueve la serpiente en la dirección actual
		const head = { x: this.snake[0].x, y: this.snake[0].y };
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
	
		// Comprueba si la serpiente ha chocado contra los bordes o su cuerpo
		if (head.x < 0 || head.x >= this.width / this.amount || head.y < 0 || head.y >= this.height / this.amount || this.collides(head.x, head.y)) {
			clearInterval(this.interval);
			alert("Game Over");
			return;
		}
	
		// Comprueba si la serpiente ha comido alguna poma
		if (this.food.some(tile => tile.x === head.x && tile.y === head.y)) {
			// Aumenta la velocidad del juego
			this.speed -= 20;
			clearInterval(this.interval);
			this.interval = setInterval(() => {
				this.step();
			}, this.speed);
			// Elimina la poma comida y agrega una nueva
			this.food = this.food.filter(tile => tile.x !== head.x || tile.y !== head.y);
			this.addFood();
		} else {
			// Elimina la cola de la serpiente si no ha comido
			this.snake.pop();
		}
	
		// Agrega la nueva cabeza de la serpiente
		this.snake.unshift(head);
	
		// Dibuja todos los elementos en el canvas
		this.clear();
		this.drawSnake();
		this.drawFood();
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		switch (e.keyCode) {
			case 37:
				if (this.direction !== "right") this.direction = "left";
				break;
			case 38:
				if (this.direction !== "down") this.direction = "up";
				break;
			case 39:
				if (this.direction !== "left") this.direction = "right";
				break;
			case 40:
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
