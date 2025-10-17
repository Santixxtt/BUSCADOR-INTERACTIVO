export default function Card({ usuario, onClick }) {
  return (
    <div
      className="p-4 bg-white shadow-md rounded hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={usuario.foto}
        alt={`${usuario.nombre} ${usuario.apellidos}`}
        className="w-20 h-20 rounded-full mx-auto"
      />
      <h3 className="text-center font-bold mt-2">
        {usuario.nombre} {usuario.apellidos}
      </h3>
      <p className="text-center text-sm text-gray-600">{usuario.perfil}</p>
      <p className="text-center text-xs text-gray-600">{usuario.intereses}</p>
      <p className="text-center text-xs text-blue-600">{usuario.correo}</p>
    </div>
  );
}
