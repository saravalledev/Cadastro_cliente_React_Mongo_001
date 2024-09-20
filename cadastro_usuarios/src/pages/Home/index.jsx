import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {

  useEffect(() => {
    getUsers()
  }, [])

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    if (!inputName.current.value || !inputEmail.current.value || !inputAge.current.value) {
      console.error("Todos os campos são obrigatórios")
      return
    }

    try {
      const response = await api.post('/usuarios', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        age: inputAge.current.value
      })
      console.log("Resposta da API:", response)
      getUsers()
    } catch (error) {
      console.error("Erro ao deletar usuário:", error)
    }
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }



  return (
    <div className='container'>
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" type='text' name='name' ref={inputName} />
        <input placeholder="Idade" type='number' name='age' ref={inputAge} />
        <input placeholder="E-mail" type='email' name='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <div>
            <button onClick={() => deleteUser(user.id)}>
              <img src={Trash} alt="Lixeira" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home