import { redirect } from "next/navigation";
import { PrismaClient } from "../generated/prisma";
export const dynamic = "force-dynamic";

export default function AddStudent() {

    async function saveData(formData: FormData) {
        "use server"
        const myData = {
            Stu_Name: String(formData.get("name")),
            Stu_Email: String(formData.get("email")),
            Stu_Age: Number(formData.get("age")),
            Stu_img: String(formData.get("img"))
        }

        const prisma = new PrismaClient();
        const data = await prisma.stu_details.create({
            data: myData
        });

        redirect("/student");
    }

    return (
        <>
            {/* <body className="bg-light"> */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white text-center">
                                <h4 className="mb-0">
                                    <i className="fas fa-user-plus me-2"></i>Add New Student
                                </h4>
                            </div>
                            <div className="card-body p-4">
                                <form action={saveData}>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name *</label>
                                        <input type="text" className="form-control form-control-lg" id="name" name="name" required></input>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email Address *</label>
                                        <input type="email" className="form-control form-control-lg" id="email" name="email" required></input>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Age *</label>
                                        <input type="number" className="form-control form-control-lg" id="age" name="age" min="1" max="100" required></input>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Profile *</label>
                                        <input type="text" className="form-control form-control-lg" id="img" name="img"  required></input>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            <i className="fas fa-save me-2"></i>Add Student
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary" >
                                            <i className="fas fa-undo me-2"></i>Reset Form
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </body> */}
        </>
    )
}
