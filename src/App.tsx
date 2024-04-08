import {useEffect, useState} from 'react'
import './App.css'

function App() {


    const [passwordInput, setPasswordInput] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [show, setShow] = useState<boolean>(false)
    useEffect(() => {

        const getAscii = (char: string) => {
            return char.charCodeAt(0);
        }
        const isPasswordValid = (password: string) => {
            if (password.length < 8) {
                return 'Password darf nicht weniger als 8 Zeichen lang sein'
            } else if (password.length > 32) {
                return 'Password darf nicht mehr als 32 Zeichen lang sein'
            } else if (!password.match(/\d/)) {
                return 'Password muss mindestens eine Zahl enthalten'
            } else if (!password.match(/[a-z]/)) {
                return 'Password muss mindestens einen Kleinbuchstaben enthalten'
            } else if (!password.match(/[A-Z]/)) {
                console.log('Password muss mindestens einen Großbuchstaben enthalten')
            } else if (!password.match(/[^a-zA-Z0-9]/)) {
                return 'Password muss mindestens ein Sonderzeichen enthalten'
            }
            for (const passwordElement of password) {
                if (getAscii(passwordElement) < 0 || getAscii(passwordElement) > 127) {
                    return 'Password darf nur ASCII Zeichen enthalten'
                }
            }
            return null;
        }

        if (isPasswordValid(passwordInput)) {
            setError(isPasswordValid(passwordInput))
        } else {
            setError(null)
        }
    }, [passwordInput]);
    return (
        <>
            <div className={''}>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={show ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                </div>
                {error != null && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <button onClick={() => setShow(!show)}>Toggle show</button>
            </div>
        </>
    )
}

export default App
