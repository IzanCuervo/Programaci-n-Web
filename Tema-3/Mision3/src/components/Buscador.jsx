export default function Buscador({ busqueda, onBuscar }){
    return (
        <input type="search" placeholder="Busca un personaje.." value={busqueda} onChange={evento => onBuscar(evento.target.value)}/>
    )
}