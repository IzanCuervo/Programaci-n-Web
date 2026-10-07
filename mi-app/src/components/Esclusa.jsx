export default function Esclusa({abierta, avisos}){
    return (
        <section>
            <h2>{abierta ? "Esclusa Abierta" : "Esclusa Cerrada"}</h2>
            {avisos > 0 && <p>Tienes {avisos} avisos</p>}
        </section>
    );
}