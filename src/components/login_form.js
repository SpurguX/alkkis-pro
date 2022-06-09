export default function LoginForm() {
    return (
        <div className="login-form-wrapper">
        <form className="form-horizontal" action="/in">
            <div className="form-group">
                <div>
                    <input type="text" className="form-control form-control-lg" placeholder="Käyttäjänimi" />
                </div>
            </div>
            <div className="form-group">
                <div>
                    <input type="password" className="form-control form-control-lg" placeholder="Salasana" />
                </div>
            </div>
            <div className="form-group">
                <div>
                <input type="submit" className="btn btn-info btn-block btn-lg" value="KIRJAUDU" />
                </div>
            </div>
        </form>
    </div>
    );
}