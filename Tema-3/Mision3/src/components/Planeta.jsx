export default function Planeta({planeta}){
    return(
    <div className="Planetas">
        <img src={planeta.imagen} alt={planeta.nombre}></img>
        <p>{planeta.nombre}</p>
        <p>{planeta.destruido ? "Planeta Destruido" : "Planeta intacto"}</p>
    </div>
    )
}
