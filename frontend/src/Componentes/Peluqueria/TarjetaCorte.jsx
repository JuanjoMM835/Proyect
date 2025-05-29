import { Calendar, Star } from "lucide-react";

const TarjetaCorte = ({ corte, onAgendar }) => (
  <article className={`tarjeta ${corte.destacado ? 'destacada' : ''}`}>
    {corte.destacado && <div className="badge"><Star size={16}/> Popular</div>}
    <img src={`/cortes/${corte.imagen}`} alt={corte.nombre} />
    <h3>{corte.nombre}</h3>
    <p>${corte.precio}</p>
    <button className="btn-agendar" onClick={() => onAgendar(corte)}>
      <Calendar size={18}/>
      Agendar
    </button>
  </article>
);

export default TarjetaCorte;

/*
lista-cortes
filas-container
cabeceracabecera
fila-cortes
badge
btn-agendar
pagina-peluqueria
selector-tipo"

btn-tipo

seccion-principal




*/