import { IdentificationIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import validations from './validations'
import styled from 'styled-components'

const Container = styled.div` 
  max-width: 450px;
  height: 500px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`
const Heading = styled.h1`
  font-size: 50px;
  margin-top: 20px;
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

const StyledButton = styled.button`
  background-color: #fccf03;
  color: black;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  cursor: pointer;
  width: 100%;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;


const Signup = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    errors,
    setErrors,
    setIsSubmitting
  } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn])

  const handleSignUpFormChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    setErrors(validations(currentUser, users))
    setIsSubmitting(true)
    localStorage.setItem('user', JSON.stringify(currentUser))
    localStorage.setItem('users', JSON.stringify(users))
  }

  return (
    <Container >
      <div >
        <div>
          <Heading >Sign Up</Heading>
        </div>
        <StyledForm
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
        >
          <div >
            <div>
              {errors.firstName && <span>{errors.firstName}</span>}
              <StyledInput
                type="text"
                onChange={handleSignUpFormChange}
                value={currentUser.firstName}
                name="firstName"
                placeholder="First Name"
              />

            </div>

            <div>
              {errors.lastName && <span>{errors.lastName}</span>}
              <StyledInput
                type="text"
                onChange={handleSignUpFormChange}
                value={currentUser.lastName}
                name="lastName"
                placeholder="Last Name"
              />

            </div>
            <div>
              {errors.email && <span >{errors.email}</span>}
              <StyledInput
                type="email"
                onChange={handleSignUpFormChange}
                value={currentUser.email}
                name="email"
                placeholder="Email Address"
              />

            </div>
            <div>
              {errors.password && <span >{errors.password}</span>}
              <StyledInput
                type="Password"
                onChange={handleSignUpFormChange}
                value={currentUser.password}
                name="password"
                placeholder="Password"
              />

            </div>
            <div>
              {errors.passwordConfirm && <span>{errors.passwordConfirm}</span>}
              <StyledInput
                type="Password"
                onChange={handleSignUpFormChange}
                value={currentUser.passwordConfirm}
                name="passwordConfirm"
                placeholder="Confirm Password"
              />

            </div>
            <div >
              <Styleddiv >
                <span>
                  Already have an account? Login{" "}
                  <Link to="/signin" >
                    <p>{" "}
                    here.
                    </p>
                  </Link>
                </span>
              </Styleddiv>
            </div>
            <div >
              <StyledButton type="submit" >
                <IdentificationIcon className="h-6 w-6"
                  aria1-hidden="true"
                />
                Sign Up
              </StyledButton>
            </div>
          </div>
        </StyledForm>
      </div>
    </Container>
  )
}

export default Signup
