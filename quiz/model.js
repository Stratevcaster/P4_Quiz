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
	}];
// Me cuenta cuantos quizzes tengo guardados

exports.count = () => quizzes.length;

// Añade un nuevo quiz nueva pregunta y respuesta al array 
exports.add = (question, answer) => {
	quizzes.push({

	question: (question || "").trim(),
	answer: (answer || "").trim()
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
};
