const model = require('./model');
const {log, biglog, errorlog, colorize} = require("./out");

exports.helpCmd = rl => {
	log("Commandos:");
         log("list - Listar los quizzes existentes.");
        log("show <id> - Muestra la pregunta y la respuesta");
      	log("add - Añadir un nuevo quiz interactivame");
       	log("delete <id> - Borrar el quiz indicado.");
        log("edit <id> - Editar el quiz indicado.");
        log("test <id> - Probar el quiz indicado");
        log("p|play -Jugar a preguntar aleatoriamente");
        rl.prompt();
};

exports.quitCmd = rl => {
rl.close();
rl.prompt();
};

exports.listCmd = rl => {
//recorrer con for each
model.getAll().forEach((quiz,id) => {
   log(` [${colorize(id,"magenta")}]:  ${quiz.question} `); 

		});

rl.prompt();
};

exports.addCmd = rl => {
rl.question(colorize(" Introduzca una pregunta: ", "red"), question => {
	rl.question(colorize("Introduzcala respuesta","red"), answer => {
		model.add(question,answer);
		log(` ${colorize("Se ha añadido", "magenta")}: ${question} ${colorize("=>","magenta")} `);
			rl.prompt();
       });
   });
};

exports.showCmd = (rl,id) => {
 if (typeof id === "undefined"){
 	 errorlog(`Falta el parámetro id.`);
 	} else{
 		try{
 			const quiz = model.getByIndex(id);
 			log(`[${colorize(id, "magenta")}]: ${quiz.question} ${colorize("=>","magenta")} ${quiz.answer} `);
 		} catch(error) {
 			errorlog(error.message);
 		}
 	}
 	rl.prompt();



};
// se pasa el id de una de las preguntas 
//Pregunta al usuario a ver si contesta o no, 
// En funcion de su respuesta se comprueba si ha fallado o ha acertado
exports.testCmd = (rl,id) => {
	if (typeof id === "undefined"){
		errorlog(`Falta el parámetro id.`);
		rl.prompt();  
		}else{
			try {
			const quiz = model.getByIndex(id);
				//lo que queremos aqui es preguntar, 
				log(`[${colorize(id, "magenta")}]: ${quiz.question} ${colorize("=>","magenta")} `);
				
				rl.question(colorize(`${quiz.question}: `), respuesta => {
			
				//rl.question quiz.question 
				if (respuesta === quiz.answer) {
						log( 'correcta');
						rl.prompt();
					}
					else{
					log( 'incorrecta');
					rl.prompt();
					}				
			
				});
				}
				catch (error){
				errorlog(error.message);
				}
			rl.prompt();
			}
};


exports.playCmd = rl => {
 let score = 0;
 let toBeResolved = []; // ids de todas las preguntas que existen
 //voy a meter todas las preguntas existentes
 let quizzes = model.getAll();
  	for (let i = 0; i< quizzes.length; i++){
 		toBeResolved.push(i);
 	}
 
 		const playOne = () => {
 			if(toBeResolved.length === 0){
 				log('No hay nada mas que preguntar');
 				log(` ${colorize("El resultado obtenido de momento es:","magenta")} ${score}`);
 				fin();
 				rl.prompt();
 			}
 			else {
 		 		let id = Math.floor((Math.random()*toBeResolved.length));
 				let quiz = quizzes[id];
 				rl.question(` ${colorize(quiz.question, "red")}${colorize('?' , 'red')} ` , (respuesta) => {
 				//rl.question(quiz.question, respuesta => {
 					if (respuesta.trim().toLowerCase() === quiz.answer.toLowerCase()) {
 						score++;
 		 			 log(` ${colorize("correcta","magenta")} ${score} `);
 		 			 toBeResolved.splice(id, 1);
 		 			 quizzes.splice(id, 1);
 		 			 playOne(); // recursividad vuelve a empezar desde el principio para preguntar otra vez 
 		 			}
 		 			else{
 		 			log(`${colorize("incorrecta","magenta")}`);
 		 			fin();
 		 			rl.prompt();
 		 				}
 		 					
 		 		     });
 			    }
	};
	const  fin =() => {
		log(`Fin del examen aciertos:`);
		log(score, 'magenta');
	}
	playOne();
	};
exports.deleteCmd = (rl,id) => {
if (typeof id === "undefined"){
 	 errorlog(`Falta el parámetro id.`);
 	} else{
 		try{
 			model.deleteByIndex(id);
 			
 		} catch(error) {
 			errorlog(error.message);
 		}
 	}
 	rl.prompt();

};

exports.editCmd = (rl,id) =>{
if (typeof id === "undefined"){
 	 errorlog(`Falta el parámetro id.`);
 	 rl.prompt();
 	} else{
 		try{


 			const quiz = model.getByIndex(id);
 			//Antes de la llamada de pregunta ejecuto un escritor automatico que me tiempo dd espera 0,
 			process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);

 			rl.question(colorize('Introduzca una pregunta:', 'red'), question => {
 				process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)},0);
 				rl.question(colorize(' Introduzca la respuesta ', 'red'), answer => {
 					model.update(id, question, answer);
 					//log(' Se ha cambiado el qui ${colorize(id, 'magenta')} por: ${question} $colorize
 						rl.prompt();
 				});
	});
} catch(error){
	errorlog(error.message);
	rl.prompt();
			}
	}

};
exports.creditsCmd = rl => {
log('Autores de la practica:');
log('YANI');
rl.prompt();

};
