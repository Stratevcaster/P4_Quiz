
const Sequelize = require('sequelize');
const {models} = require('./model');
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


exports.quitCmd = rl => {
rl.close();
rl.prompt();
};


exports.listCmd = rl => {
//recorrer con for each

// modelos de la base de datos 
// llamo a findall promesa
//devuelve todos los quizes existentes
// registro la funcion con .then que toma un parametro todos los quizes 
models.quiz.findAll()
.then(quizzes=> {
	// en cada vuelta de foreach me pasan un quiz 

	quizzes.forEach((quiz)=> {
		log(` [${colorize(quiz.id, "magenta")}]: ${quiz.question}`);

	});
})
.catch(error => {
	 errorlog(error.message);
})
.then(() =>{
	rl.prompt();

});
};

// funcion auxiliar 
 const makeQuestion = (rl,text) => {
 	return new Sequelize.Promise((resolve,reject) => {
 		rl.question(colorize(text,'red'), answer => {
 			resolve(answer.trim());
 		});
 	});
 };

// usamos la llamada create
// vamos a hacerlo con promesas no con callbacks 
//
exports.addCmd = rl => {
	makeQuestion(rl, 'Introduzca la pregunta: ' )
	.then(q=> {
		return makeQuestion(rl, 'Introduzca la respuesta ')
		.then(a => {
			return {question:q ,answer: a};
		});
	})
	.then(quiz => {
		return models.quiz.create(quiz);

	})
	.then(quiz=> {
		log(`${colorize('Se ha añadido',"magenta")}: ${quiz.question}  ${colorize('=>',"magenta")} ${quiz.answer}`);
	})
	.catch(Sequelize.ValidationError, error => {
		errorlog('El quiz es erroneo:');
		error.errors.forEach(({message}) =>errorlog(message));

	})
	.catch(error => {
		errorlog(error.message);
	})
	.then(() =>{
		rl.prompt();
	});
};

// coge el valor del id y va a la base de datos
// para mostrarlo 
// lo hacemos con promesas
// promesa auxiliar que se encargue de comprobar si es correcto
exports.showCmd = (rl,id) => {

 validateId(id)
 .then(id => models.quiz.findById(id))
 .then(quiz =>{
 	 if(!quiz) {
 	 	 throw new Error(`No existe un quiz asociado al id = ${id}.`);
 	 	}
 	 	log(` [${colorize(quiz.id,"magenta")}]: ${quiz.question} ${colorize("=>","magenta")} ${quiz.answer}`);

 	 })
 .catch(error=> {
 	errorlog(error.message);
 })
 .then(() => {
 	 rl.prompt();

 });
 };


const validateId= id => {
	return new Sequelize.Promise((resolve,reject) => {
		if (typeof id === "undefined"){
			reject(new Error(`Falta el parametro <id>, `));
		} else{
			id = parseInt(id);
			if (Number.isNaN(id)){
				reject(new Error(`El valor del parámetro <id> no es un número`));
			} else {
				resolve(id);
			}
		}
	});
	};
	
// se pasa el id de una de las preguntas 
//Pregunta al usuario a ver si contesta o no, 
// En funcion de su respuesta se comprueba si ha fallado o ha acertado
exports.testCmd = (rl,id) => {
	validateId(id)
 .then(id => models.quiz.findById(id))
 .then(quiz => {
 	if (!quiz){
 		throw new Error(`No existe un quiz asociado al id =${id}.`);
 	}

 		makeQuestion(rl, ` [${colorize(quiz.id,"magenta")}]: ${quiz.question} `)
 		.then(a => {
 			if(a === quiz.answer){
 				log( "La respuesta es correcta");
						rl.prompt();
						}
						else{
							log( "La respuesta no es correcta");
							rl.prompt();
						}	

				})
				.catch(error=> {
 	errorlog(error.message);
 })
 .then(() => {
 	 rl.prompt();

})
})
};


exports.playCmd = rl => {

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
 	 .then(q => {
 	   process.stdout.isTTY && setTimeout(() =>{rl.write(quiz.answer)},0);	
 	 return makeQuestion(rl, 'Introduzca la respuesta:')
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
