import {gql, useMutation, useQuery} from "@apollo/client"
import { ThreeDots } from "react-loader-spinner"
import "./App.css"
import { useState } from "react"
import { useForm } from "react-hook-form";


const GetParticularId = gql`
query MESSAGE_QUERY($id: String!){
  message(id: $id) {
    id
    author {
      login
    }
    subject
    body
    language
    metrics {
      views
    }
    view_href
    post_time
  }
}
`

const Update_Messages_Mutation = gql`
mutation ($updateMessageInput :updateMessageInput!) {
  updateMessage(input :$updateMessageInput) {
    id
    body
    subject 
  }
}
`

const ParticularIdApp = props => {
  const [formData, setFormData] = useState(null)

    const {setCurrentState, messageId} = props
    const {register} = useForm()

    const Close = () => {
      setCurrentState(false)
    }

    const changeHandle = (key, value) => {
      setFormData({...formData, [key] : value})
    }

    const {data, loading, error} = useQuery(GetParticularId, {
        variables : {
            id : messageId
        },
        onCompleted : (data) => {
          console.log("info query", data)
          setFormData(data?.message)
        }
    })

    //Mutation 

    const [updateMutation,modifiedData] = useMutation(Update_Messages_Mutation,{
        optimisticResponse : {
          updateMessage : {
            __typename : "message",
            id : messageId,
            subject : "react",
            body : "developer"
          }
        },
    
        onCompleted : (data) => {
          console.log("MutetedData is", data)
        },
    
        onError : (error) => {
          console.log("error in mutation", error)
        },
    
        update(...rest) {
          console.log("optimistic result",rest)
        }
    })
          // mutation



    if (error) <p>{error.errorMessage}</p>

    if (loading) return (
        <ThreeDots color="#00BFFF" height={80} width={80} />
      )


    
    return (
        <form className="particularIdcard" onSubmit={e => {
          e.preventDefault()
          updateMutation({
            variables : {
              updateMessageInput : {
                id : formData.id,
                body : formData.body,
                subject : formData.subject
              }
            }
          })
          
        }}>
            <div>
            {/* <p className="heading">Details Of Messge</p>
            <p><span>Id: </span>{data?.message?.id}</p>
            <p><span>Author: </span>{data?.message?.author?.login}</p>
            <p><span>Subject: </span>{data?.message?.subject}</p>
            <p><span>Language: </span>{data?.message?.language}</p>
            <p><span>Viwes: </span>{data?.message?.metrics.views}</p>
            <p><span>Link : </span><a href={data?.message?.view_href} target="_blank">{data?.message?.view_href}</a></p>
            <p><span>PostTime: </span>{data?.message.post_time}</p>*/}
            </div> 
            <div className="cssOfParticularCard">
              <label>Id : </label>
              <input disabled value={data?.message?.id} readOnly/>
            </div>

            <div className="cssOfParticularCard">
              <label>Subject : </label>
              <input {...register("subject")} value = {formData?.subject} onChange = {e => changeHandle("subject", e.target.value)}/>
            </div>

            <div className="cssOfParticularCard">
              <label>Body : </label>
              <input {...register("body")} value = {formData?.body} onChange = {e => changeHandle("body", e.target.value)} />
            </div>

            <div className="cssOfParticularCard">
              <label>Author : </label>
              <input {...register("Author")} value = {data?.message?.author?.login} readOnly/>
            </div>

            <div className="cssOfParticularCard">
              <label>Language : </label>
              <input {...register("Langauge")} value = {data?.message?.language} readOnly/>
            </div>

            <div className="cssOfParticularCard">
            <p><span>Link : </span><a href={data?.message?.view_href} target="_blank">{data?.message?.view_href}</a></p>
            </div>

            <div className="cssOfParticularCard">
              <label>Viwes : </label>
              <input value={data?.message?.metrics.views} readOnly/>
            </div>

            <div className="cssOfParticularCard">
              <label>PostTime : 
              </label>
              <input value={data?.message.post_time} readOnly/>
            </div>

            <p><b>Note : </b> Here You Can Change Body and Subject Only</p>

            <div className="button-container">
            <button type="submit">
              update
            </button>
            <button onClick={Close}>Close</button>
            </div>
        </form>
    )

}

export default ParticularIdApp
