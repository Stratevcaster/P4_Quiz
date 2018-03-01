const fs = require("fs"); //modulo de node leer un fichero 
const DB_FILENAME = "quizzes.json"; // para poder guardar en un fichero los cambios modificados 


//En esta variable se mantienen todos los quizzes existentes
// Es un array de objetos, donde cada objeto tiene los atribuots question y answer 
//para guardar el texto de la pregunta y el de la resuta
// Al arrancar la aplicacion esta varible contiene estas cuatro preguntas
//estamos guardando en el fichero DB_FILENAME. 
let quizzes = [

	{
	question: "Capital de Italia",
	answer: "Roma"
	},
	{
	question: "Capital de Francia",
	answer: "París"
	},
	{
	question: "Capital de España",
	answer: "Madrid"
	},
	{
	question: "Capital de Portugal",
	answer: "Lisboa"
	}
	];
// Me cuenta cuantos quizzes tengo guardados

exports.count = () => quizzes.length;

// Añade un nuevo quiz nueva pregunta y respuesta al array 
exports.add = (question, answer) => {
	quizzes.push({

	question: (question || "").trim(),
	answer: (answer || "").trim()
	});
	save();
};
// Este metodo carga el contenido del fichero DB_FIlename en la varible 
//quizzes. El contenido de ese fichero esta en formato JSON
//La primera vez que se ejecute este metodo el fichero DB_Filename no existe y se producirá el error ENOENT. 
// EN este caso se salva el contenido inicale almacenado en quizes
// Si se produce otro tipo de error se lanza una excepticon que 
//abortará la ejecucion del programa
const load = () => {
	fs.readFile(DB_FILENAME,(err,data) =>{
		if(err) {
			//la primera vez  no existe el fichero 
			if (err.code ==="ENOENT"){
				save(); //valores iniciales
				return;

			}
			throw err;
		}
		let json = JSON.parse(data);
		if (json) {
			quizzes=json;
		}
	});
};

//Funcion que guarda las preguntas en el fichero
// GUarda en formato JSON el valor de quizes en el fichero  DB_FILENAME
//si se preoduce algun tipo de error se lanza una excepcion que abortará 
//la ejecucion del programa

const save = () => {
	fs.writeFile(DB_FILENAME,
		JSON.stringify(quizzes),
		err => {
			if (err) throw err;
		});
};

//array de quizes
// Actualiza el quiz situado en la posicion inicial
 // id es la posicion del array
exports.update = (id, question, answer) => {

	const quiz = quizzes[id];
	if (typeof quiz === "undefined") {
	throw new Error('El valor del parámetro id no es valido')
	}
// en esa posicion quiero quitar un elemento , estoy actualizando el array
	quizzes.splice(id,1,{
	question: (question || "").trim(),
	answer: (answer ||"").trim()
});
	save();
}; 


// Devuelve todos los elementos en el arrray
// estamos clonando el valor del array
exports.getAll = () =>  JSON.parse(JSON.stringify(quizzes));

exports.getByIndex = id => {
 	const quiz = quizzes[id];
	if (typeof quiz === "undefined"){
	throw new Error('El valor del parámetro id no es válido');
}
return JSON.parse(JSON.stringify(quiz));
};
 // BOrrar un elemento del array

exports.deleteByIndex = id => {
	const quiz = quizzes[id];
	if (typeof quiz === "undefined"){
        throw new Error('El valor del parámetro id no es válido');
}
	quizzes.splice(id,1);
	save();
};


// Carga los quizzes almacenados en el fichero 
load();
