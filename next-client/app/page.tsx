export default function Home() {
  return (
    <main className="">

      {/* Hero Section */}
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm border">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-primary">Next.js + Bootstrap</h1>
          <p className="col-md-8 fs-4 text-muted">
            Your Next.js environment is configured with Bootstrap grid utilities and responsive utility parameters.
          </p>

          {/* Test Interactivity (Dropdown) */}
          <div className="dropdown">
            <button
              className="btn btn-dark btn-lg dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Interactive Dropdown Test
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-menu-item dropdown-item" href="#">Action Option</a></li>
              <li><a className="dropdown-menu-item dropdown-item" href="#">Another Option</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-menu-item dropdown-item" href="#">Separated Link</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Grid Cards Section */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 border-start border-3 border-info">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Grid Box 1</h5>
              <p className="card-text text-secondary">Responsive utility column setup using Bootstrap grids natively inside Next.js.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-start border-3 border-success">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Grid Box 2</h5>
              <p className="card-text text-secondary">No custom configuration CSS needed for clean column padding setups.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}