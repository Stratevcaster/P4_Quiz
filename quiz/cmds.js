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
   log(' [${colorize(id,"magenta")}]:  ${quiz.question} '); 
});

rl.prompt();
};

exports.addCmd = rl => {
//rl.question(colorize(" Introduzca una pregunta: ", "red"), question => {
//	rl.question(colorize("Introduzcala respuesta","red"), answer => {

//		model.add(question,answer);
//		log(' ${colorize("Se ha añadido", "magenta")}: ${question} ${colorize("=>","magenta")} ');

//			rl.prompt();
//}):
//});
};

exports.showCmd = (rl,id) => {
 if (typeof id === "undefined"){
 	 errorlog('Falta el parámetro id.');
 	} else{
 		try{
 			const quiz = model.getByIndex(id);
 			log(' [${colorize(id, "magenta")}]: ${quiz.question} ${colorize} ${colorize("=>","magenta")} ${answer}');
 		} catch(error) {
 			errorlog(error.message);
 		}
 	}
 	rl.prompt();



};

exports.testCmd = (rl,id) => {
log('Probar el quiz indicado.');
rl.prompt();

};

exports.playCmd = rl => {
log('Jugar');
rl.prompt();

};

exports.deleteCmd = (rl,id) => {
log('Borrar el quiz indicado.');
rl.prompt();

};
exports.editCmd = (rl,id) =>{
log('Editar el quiz indicado.');
rl.prompt();

};
exports.creditsCmd = rl => {
log('Autores de la practica:');
log('Nombre 1');
rl.prompt();

};
