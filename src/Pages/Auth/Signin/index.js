import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import { LoginIcon } from '@heroicons/react/outline'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 450px;
  height: 400px;
  margin: auto;
  border: 2px solid #fccf03;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #fccf03;
  color: black;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  cursor: pointer;
  width: 100%;
  height: 30px;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Heading = styled.h1`
font-size: 50px;
margin-top: 30px;
padding: 0px 60px;
justify-content: center;
`

const StyledForm = styled.form`
  /* margin-top: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledInput = styled.input`
   margin-top: 20px;
   width: 100%;
   height: 35px;
   border-radius: 5px;
   padding:10px;
   color:black;
`
const Styleddiv = styled.div`
  margin-top: 15px;
  span{
    display: flex;
    flex-direction: row;
  }
  p{
    color: #fccf03;
    padding-left: 5px;
  }
`

const Signin = () => {

  const { currentUser, login, setCurrentUser, setIsSubmitting, loggedIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      alert("Error!")
    }
    setIsSubmitting(false)
  }

  const navigate = useNavigate()

  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn])



  return (
    <Container>
      <div>
        <div>
          <Heading>Login</Heading>
        </div>
        <StyledForm
          autoComplete="off"
          onSubmit={handleSignIn}
        >
          <div>
            <div>
              <StyledInput
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <StyledInput
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div>
              <Styleddiv>
                <span>
                  Don't have an account? Sign up{" "}
                  <Link to="/signup">
                    
                    <p>{" "} here</p>
                  </Link>
                </span>
              </Styleddiv>
            </div>
            <div>
              <StyledButton type="submit">
                <LoginIcon aria1-hidden="true"  className="h-6 w-6" />
                Login
              </StyledButton>
            </div>
          </div>
        </StyledForm>
      </div>
    </Container>
  )
}

export default Signin