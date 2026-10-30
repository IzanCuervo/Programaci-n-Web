export default function FiltroRazas({recuento, razaElegida, onCambiar}){
    return (
        <select value={razaElegida} onChange={(evento) => onCambiar(evento.target.value)}> {/*Si el usuario decide cambiar de opcion se ejecuta el evento*/}
            <option value="Todas">Todas</option>
            {Object.entries(recuento).map(([raza, cantidad]) => ( //Object enties convertirá en un array el objeto recuento y de ahí recorreremos las razas cjunto a su cantidad
                <option key={raza} value={raza}>{raza} ({cantidad})</option>
            ))}
            
        </select>
    )
}