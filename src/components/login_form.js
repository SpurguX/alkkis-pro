export default function LoginForm() {
    return (
        <div className="login-form-wrapper container-wooden-borders">
            <form className="form-horizontal bg-blackboard p-4" action="/calculator">
                <div className="form-group mb-4">
                    <div className="">
                        <input type="text" className="form-control form-control-lg" placeholder="KutsumaNimi" />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <div>
                        <input type="password" className="form-control form-control-lg" placeholder="TunnussaNa" />
                    </div>
                </div>
                <div className="form-group mt-4 mb-0">
                    <div>
                        <input type="submit" className="btn btn-block btn-lg btn-wood bg-wood-force" value="KÄY SISÄÄN" />
                    </div>
                </div>
            </form>
        </div>
    );
}