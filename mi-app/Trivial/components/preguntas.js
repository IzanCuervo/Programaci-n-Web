//Esto debería pedirse a la API pero aqui lo vamos a hardcodear

export const PREGUNTAS = [
    {
        id: "q1",
        texto: "¿Qué hook añade memoria a un componente?",
        opciones: ["useEffect", "useState", "useRef", "useContext"],
        correcta: 1,
    },

    {
        id: "q2",
        texto: "¿Qué prop necesita cada elemento al pintar una lista con map?",
        opciones: ["id", "index", "key", "ref"],
        correcta: 2,
    },

    {
        id: "q3",
        texto: "¿Cómo se actualiza bien un array guardado en el estado?",
        opciones: ["lista.push(x)", "setLista([...lista, x])", "lista[0] = x", "setLista(lista)"],
        correcta: 1,
    },

    {
        id: "q4",
        texto: "¿Qué devuelve useState?",
        opciones: ["Un array con el valor y su función para cambiarlo", "Solo el valor", "Un objeto con get y set", "Una promesa"],
        correcta: 0,
    },
];