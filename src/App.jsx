import { useEffect, useState } from 'react'
import './App.css'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const [datos, setDatos] = useState([])
  const [user, setUser] = useState("")
  const [errores, setErrores] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handle = async() => {
      if(user!=""){
        try {
          setLoading(true)
          let datos
          const response = await fetch("https://api.github.com/users/"+user)
          datos = await response.json()
        
          setLoading(false)
          setDatos(datos)
          if(datos.message){
            if(datos.message == "Not Found")
              setErrores("Usuario no encontrado")
            else
              setErrores("Limite de API excedido")
          }
        } catch (error) {
          setErrores("Error de conexion: "+error)
        }
      }
    }
    handle()
  }, [user])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setUser(e.target.user.value)
  }
  return (
    <>
      <div className='flex flex-col justify-center space-y-4 place-items-center'>
        {errores !== "" ? <ErrorMessage error={errores} /> : <p></p> }
        <form className='space-y-4' action="" onSubmit={handleSubmit}>
          <div className='flex justify-center space-x-4'>
            <label htmlFor="user">https://api.github.com/users/</label>
            <input type="text" name='user' id='user' onChange={() => setErrores("")}/>
          </div>
          <button>Cargar Foto</button>
        </form>
        {loading ? <LoadingSpinner /> /*<figure className='w-64 h-64'><Skeleton count={5}/></figure>*/ : datos.avatar_url && <img className='w-64 h-64' src={datos.avatar_url} alt={datos.login} />}
      </div>
    </>
  )
}

export default App
