import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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

  const onSubmit = (event) => {
    event.preventDefault();
    if (newAccount) {
      console.log("create new account");
    } else {
      console.log("log in");
    }
  };

  return (
    <div>
      <form>
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
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
