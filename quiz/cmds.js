const  {log,biglog,errorlog,colorize} = require("./out");
const model = require('./model');


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
console.log('Listar todos los quizzes existentes .');
};
exports.addCmd = rl => {
log('Añadir un nuevo quiz.');
rl.prompt();

};

exports.showCmd = (rl,id) => {
log('Mostrar el quiz indicado.');
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
