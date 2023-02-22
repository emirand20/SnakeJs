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
		this.width = width
		this.height = height
		this.amount = amount
		this.food = []
		this.direction = "right"
		this.snake = []
		this.start()
		this.initCanvas(width, height)

		/*
		this.speed = 200*/
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
		this.puntuacio = 0
		this.serp = [[0,0]]
		this.dir = [1,0]
		this.addFood()
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x, y, color) {
		let mida = this.width / this.amount
		this.ctx.beginPath()
		this.ctx.fillStyle = color
		this.ctx.fillRect(x * mida, y * mida, mida, mida)
		this.ctx.stroke()
	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		this.ctx.beginPath()
		this.ctx.fillStyle = 'white'
		this.ctx.clearRect(0, 0, this.width, this.height)
		this.context.beginPath()
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		this.snake.forEach(item => {
			this.drawSnake(item[0], item[1], "green");
		  });
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
		this.food.forEach(poma => {
			this.drawSquare('poma'.x, poma.y, "red")
		})
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	 checkCollision(x, y, array) {
		return array.map(item => item.x === x && item.y === y).includes(true);
	  }

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
		this.food = parseInt[Math.random() * this.amount, Math.random() * this.amount]
	}

	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		let resultat = [0, 0]

		let x = (this.snake[0][0] + this.direction[0])
		let y = (this.snake[0][1] + this.direction[1])
		resultat[0] = x % this.amount
		resultat[1] = y % this.amount
		if (x < 0) resultat[0] = this.amount + x
		if (y < 0) resultat[1] = this.amount + y
		return resultat
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		this.clear()
		let novaSerp = this.newTile()
		if(this.collides(novaSerp[0],novaSerp[1])){
			this.start()
		}else {
			this.serp.push(novaSerp)
			if (novaSerp[0] == this.menja[0] && novaSerp[1] == this.menja[1]) {
				this.addFood()
	
			}else{
				this.serp.shift()
			}
		}
		this.drawSnake()
		this.drawFood()
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		e = e || window.event
		this.dir = game.direction
		if (e.keyCode == '37'){
			this.dir = [0,-1]
		}
		else if (e.keyCode == '39'){
			this.dir = [0,1]
		}
		else if (e.keyCode == '38'){
			this.dir = [-1,0]
		}
		else if (e.keyCode == '40'){
			this.dir =[1,0]
		}
	}

}
let game = new Game(3500,3500,150) // Crea un nou joc
document.onkeydown = game.input.bind(game) // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),100) // Fes que la funció que actualitza el nostre joc s'executi cada 100ms