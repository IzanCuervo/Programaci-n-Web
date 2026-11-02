export default function FiltroRazas({recuento, razaElegida, onCambiar}){
    return (
        <select value={razaElegida} onChange={(evento) => onCambiar(evento.target.value)}> {/*Si el usuario decide cambiar de opción se ejecuta el evento*/}
            <option value="Todas">Todas</option>
            {Object.entries(recuento).map(([raza, cantidad]) => ( //Object.entries convertirá en un array el objeto recuento y de ahí recorreremos las razas junto a su cantidad
                <option key={raza} value={raza}>{raza} ({cantidad})</option>
            ))}
            
        </select>
    )
}