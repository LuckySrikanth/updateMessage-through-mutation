import { useQuery,gql } from '@apollo/client'
import { ThreeDots } from 'react-loader-spinner'
import AllMessage  from './AllMessage'
import "./App.css"


const GetQuery = gql`
query{
  messages{
    size
    items{
      subject
      id
      body
      post_time
    }
  }
}
`

function App() {

  const {data , loading, error} = useQuery(GetQuery)

  if (loading) return (
    <ThreeDots color="#00BFFF" height={80} width={80} />
  )


  return (
    <div>
      <h2 className='heading'>Messages</h2>
      <div className='message-container'>
      {
        data?.messages?.items.map(msg => {
          return (
            <div>
              {/* <p><b>Id :</b> {msg.id}</p>
              <p><b>Subject : </b> {msg.subject}</p>
              <p><b>Post Time: </b>{msg.post_time}</p> */}
              <AllMessage  key = {msg.id} msgList = {msg}/>
              </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default App
