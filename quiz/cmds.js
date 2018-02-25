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
				//process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);
				rl.question(colorize(' Introduzca la respuesta de ', 'red'), respuesta => {
			
				//rl.question quiz.question 
				if (respuesta.toLowerCase().trim() === quiz.answer) {
						log( "La respuesta es correcta");
						rl.prompt();
					}
						else{
							log( "La respuesta no es correcta");
							rl.prompt();
						}				
				
				});

				}
				catch (error){
				errorlog(error.message);
				}
		
			}
 	rl.prompt();

};


exports.playCmd = rl => {
 let socre = 0;
 let toBeResolved = []; // ids de todas las preguntas que existen
 //voy a meter todas las preguntas existentes
 	for (i = 0; i< quizzes.length-1; i++){
 		toBeResolved[i]=quizzes.id;
 	}
 	
 		//si el array existe y no esta vacio 
 		//funcion interna 
 		const playOne = () => {
 		if(typeof toBeResolved !== `undefined` && toBeResolved.length>0)
 			 {
 		 	//una pregunta al azar de las que hay en el array
 		 		let id = toBeResolved[Math.floor(quizzes.length*Math.random())];
 		 		let quiz = model.quiz(id);
 		 		toBeResolved.splice(id,1); // quito del array un elemento 
 		 		rl.question(quiz.question, respuesta => {
 		 			if (respuesta.toLowerCase().trim() === quiz.answer){
 		 			log(` ${colorize("BIEN,Respuesta correcta","magenta")} ${score+1} `);
 		 			playOne(); // recursividad vuelve a empezar desde el principio para preguntar otra vez 
 		 			}
 		 			else{
 		 			log(` ${colorize("MAL, Respuesta incorrecta","magenta")}`);
 		 				}
 		 		});
 		 	}
 		
 		 	else{
 		 		errorlog(`No hay preguntas por esponder.`);
 		 		log(` ${colorize("El resultado obtenido de momento es:","magenta")} ${score}`);
 		 		}
 		 	rl.prompt();
 		 
		}
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
log('Nombre 1');
rl.prompt();

};
