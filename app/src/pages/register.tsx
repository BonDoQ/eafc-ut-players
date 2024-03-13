const Register = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-lg-6 mx-auto">
          <h2>Create an account</h2>
          <form method="post" action="register" className="d-flex flex-column gap-3 border p-2 mb-2 p-4 rounded-4 shadow">

            <div>
              <label className="form-label">Username <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="username" />
            </div>

            <div>
              <label className="form-label">Email <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="email" />
            </div>

            <div>
              <label className="form-label">Password <span className="text-danger">*</span></label>
              <input type="password" className="form-control" name="password" />
            </div>

            <input type="submit" className="btn btn-primary mt-4" value="Register" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register