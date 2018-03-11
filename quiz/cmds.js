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
	
/**
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
*/
};

exports.playCmd = rl => {
 /**
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
 		 			 //log(` ${colorize("BIEN,Respuesta correcta","magenta")} ${score} `);
 		 			 toBeResolved.splice(id, 1);
 		 			 quizzes.splice(id, 1);
 		 			 playOne(); // recursividad vuelve a empezar desde el principio para preguntar otra vez 
 		 			}
 		 			else{
 		 			log(`${colorize("MAL, Respuesta incorrecta","magenta")}`);
 		 			fin();
 		 			rl.prompt();
 		 				}
 		 					
 		 		     });
 			    }
 			    */
	};
	const  fin =() => {
		log(`Fin del examen aciertos:`);
		biglog(score, 'magenta');
	}
	playOne();
	};

exports.deleteCmd = (rl,id) => {
	// devuelve el id
 validateId(id)
 // el elemento que quiero destruir es id 
 .then(id =>models.qui.destroy({where:{id}}))
 .catch(error => {
 	errorlog(error.message);
 })
 .then(() =>{
 	 rl.prompt();
 });
};

exports.editCmd = (rl,id) =>{
 validateId(id)
 .then(id => models.quiz.findById(id))
 .then(quiz => {
 	if (!quiz){
 		throw new Error(`No existe un quiz asociado al id =${id}.`);
 	}
 	 process.stdout.isTTY && setTimeout(() =>{rl.write(quiz.question)},0);
 	 return makeQuestion(rl, 'Introduzca la pregunta:')
 	 .then(a => {
 	 	quiz.question=q;
 	 	quiz.answer =a;
 	 	return quiz;
 	 });
 	 });
 	
 })
	.then(quiz => {
		return quiz.save();
	})
	.then(quiz => {
		log( ` Se ha cambiado el quiz ${colorize(quiz.id, "magenta")} por: ${quiz.question} ${colorize("=>","magenta")} `);
	})
	.catch(error =>{
		errorlog(error.message);
	})
	.then(() =>{
		rl.prompt();
	});
	};
	

exports.creditsCmd = rl => {
log('Autores de la practica:');
log('YANI');
rl.prompt();

};





















