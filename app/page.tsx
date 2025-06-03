import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-primary">
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
          <div className="row justify-content-center w-100">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg border-0">
                <div className="card-body text-center p-5">
                  <h1 className="display-4 fw-bold text-primary mb-4">Welcome to the CRUD Operations</h1>
                  <p className="lead text-muted mb-4">Manage your student data with Next.js</p>
                  <Link href="/student">
                    <button className="btn btn-success btn-lg px-5 py-3">
                      View Student CRUD
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>
    </>
  );
}
