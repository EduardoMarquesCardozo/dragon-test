import "./Login.scss";

const Login = () => {
    return (
        <div className="wrapper dark">
            <header>Sign in</header>
            <div>
                <input placeholder="Username"></input>
                <input placeholder="Password"></input>
            </div>
            <div>
                <button>Sign in</button>
            </div>
        </div>
    );
};

export default Login;