import React, { useRef, useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
export default function Form(){


    
        // hooks
    
        const name = useRef()
        const mail = useRef()
        const message = useRef()
        const acceptAllConditions = useRef()
        
        
        const [isFormSent,setIsFormSent]=useState(false)
        const [errors,setErrors]=useState({})
        const [isFormValid,setisFormValid]=useState(false)
       
            
        // reset form
            const resetForm= ()=>{
                name.current.value=""
                mail.current.value=""
                message.current.value=""
                acceptAllConditions.current.checked=false
             }
             
        // form validation 
            const validateRequiredElement = (ref)=>{
                
                if(ref===message && ref.current.value.length<200){
                    const currentMessageLength=ref.current.value.length
                    setErrors(prevState=> { return {...prevState,...{[ref.current.id]:`characters must be over 200 (${currentMessageLength}/200)`}} })
                    setisFormValid(false)
                }
                
                if(ref.current.value.trim()===""){
                    setErrors(prevState=> { return {...prevState,...{[ref.current.id]:'Field required'}} })
                    setisFormValid(false)
                }
                
            }
            
            const validateForm = ()=>{
                
                const mailValue=mail.current.value
                const acceptAllConditionsValue=acceptAllConditions.current.checked
                setErrors([])
                let isFormValid=true
                
                validateRequiredElement(name)
                validateRequiredElement(mail)
                validateRequiredElement(message)
                if(!mailValue.match(/^\S+@\S+\.\S+$/)){
                    setErrors(prevState=> { return {...prevState,...{mail:'field incorrect'}} })
                    isFormValid=false
                    
                }
                if(acceptAllConditionsValue===false){
                    setErrors(prevState=> { return {...prevState,...{acceptAllConditions:'must be checked'}} })
                    isFormValid=false
                    
                }
                
            setisFormValid(isFormValid)
            return isFormValid
            }
        
       
        
        // handles
        
        const handleSubmit=(e)=>{
            e.preventDefault()
            setIsFormSent(false)
            if(validateForm()){
                setIsFormSent(true)
                resetForm()
            }
            
        }
        const handleChange = () => {
            validateForm()
        }
        
        // Displaying errors
        
            const displayErrors=()=>{
           
                return  Object.entries(errors).map((error,key)=> {
                            const [field,message]= error 
                            return <li key={key}>{field}: {message}</li>
                        })
                }
            const displayError=(fieldname)=>{
                const error = errors[fieldname]
                const field = document.querySelector(`#${fieldname}`)
                
                if(error!==undefined){ 
                    
                    field.style.border="1px solid red "
                    return <div className='text-danger'>{error}</div>
                }
                if(field!==null){field.removeAttribute("style")}
                }
                
            
  return (
    <div className="container-fluid w-75 mx-auto my-5">
    
            {isFormSent? 
                
                <div class="p-5 mb-4 bg-light rounded-3">
                    <div class="container-fluid py-5">
                        <h1 class="display-5 fw-bold">The form was sent successfully</h1>
                        <p class="col-md-8 fs-4">
                            Thanks for your time dear github user !</p>
                        <a class="btn btn-success btn-lg" type="button" role="button" href='.'>
                            return to the form page
                        </a>
                    </div>
                </div>
            :
            
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <h1> Contact form</h1>
                <hr />
                
                    {
                        Object.keys(errors).length>0 ?
                        <div className='alert alert-danger' role="danger">
                            <ul>
                                {displayErrors()}
                            </ul>
                        </div>                          
                        :""}
                
                
                <div className="form-outline mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" ref={name}/>
                     {displayError('name')}
                </div> 
                
                <div className="form-outline mb-3">
                    <label htmlFor="mail" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="mail"ref={mail}/>
                    {displayError('mail')}
                    
                </div> 
                
                <div className="form-outline mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="4" ref={message}></textarea>
                    {displayError('message')}
                    
                </div> 
                
                <div className="form-check mb-3">
                    <div className="d-flex">
                        <input type="checkbox" className="form-check-input me-2" id="acceptAllConditions" ref={acceptAllConditions}/>
                        <label htmlFor="acceptAllConditions" className="form-check-label ">Accept all conditions</label>
                    </div>
                    {displayError('acceptAllConditions')}
                </div> 
                
              
              <button disabled={!isFormValid} type="submit" className="btn btn-primary w-100 ">Submit</button>
              
            </form>
        }
    
    </div>
  )
}
