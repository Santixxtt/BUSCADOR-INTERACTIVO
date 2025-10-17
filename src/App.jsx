import { useEffect, useState, useCallback } from 'react'
import Card from './components/Card'
import SearchInput from './components/Searchinput'
import axios from 'axios'
import './index.css'

export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [error, setError] = useState(null)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // Abrir/cerrar modal
  const abrirModal = (usuario) => {
    setUsuarioSeleccionado(usuario)
    setMostrarModal(true)
  }

  const cerrarModal = () => {
    setUsuarioSeleccionado(null)
    setMostrarModal(false)
  }

  // Obtener usuarios del backend
  const obtenerUsuarios = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:8000/usuarios')
      setUsuarios(res.data)
      setFiltrados(res.data)
    } catch (err) {
      setError('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  // Filtrar usuarios con debounce simple
  const filtrarUsuarios = useCallback(
    (query) => {
      setLoading(true)
      setTimeout(() => {
        if (query.trim() === '') {
          setFiltrados(usuarios)
        } else {
          const q = query.trim().toLowerCase()
          const resultados = usuarios.filter((u) =>
            [u.nombre, u.apellidos, u.perfil, u.intereses, u.correo].some(
              (campo) => String(campo).toLowerCase().includes(q)
            )
          )
          setFiltrados(resultados)
        }
        setLoading(false)
      }, 400)
    },
    [usuarios]
  )

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className="p-4">
      {/* Header con título y logout */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold">BUSCADOR DE USUARIOS</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition mt-1"
        >
          Logout
        </button>
      </div>

      {/* Barra de búsqueda */}
      <SearchInput onSearch={filtrarUsuarios} />

      {/* Estado de carga o error */}
      {loading ? (
        <div className="text-center py-10">
          <span className="text-lg font-semibold">Cargando...</span>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
          {filtrados.map((usuario) => (
            <Card
              key={usuario.id}
              usuario={usuario}
              onClick={() => abrirModal(usuario)}
            />
          ))}
        </div>
      )}

      {/* Modal de detalle */}
      {mostrarModal && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={cerrarModal}
            >
              &times;
            </button>
            <img
              src={usuarioSeleccionado.foto}
              alt={`${usuarioSeleccionado.nombre} ${usuarioSeleccionado.apellidos}`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-center text-xl font-bold">
              {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellidos}
            </h3>
            <p className="text-center text-sm text-gray-600">
              {usuarioSeleccionado.perfil}
            </p>
            <p className="text-center text-sm text-gray-600">
              {usuarioSeleccionado.intereses}
            </p>
            <p className="text-center text-sm text-blue-600">
              {usuarioSeleccionado.correo}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
