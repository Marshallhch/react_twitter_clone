import { authService } from "fbase";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    //console.log(event.target.name);
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // console.log("create new account");
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // console.log("log in");
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      // console.log(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='email'
          placeholder='Email'
          reauired='true'
          name='email'
          value={email || ""}
          onChange={onChange}
        />
        <input
          type='password'
          placeholder='Password'
          requried='true'
          name='password'
          value={password || ""}
          onChange={onChange}
        />
        <input type='submit' value={newAccount ? "Create Account" : "Log In"} />
        {error}
        <span onClick={toggleAccount}>
          {newAccount ? "Sign In" : "Create Account"}
        </span>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
