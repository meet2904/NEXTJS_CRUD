import { redirect } from "next/navigation";
import { PrismaClient } from "@/app/generated/prisma";

export default async function UpdateStudent({ params }: { params: Promise<{ id: string }> }) {
    
    async function getStudentData() {
        const { id } = await params;
        const prisma = new PrismaClient();
        const student = await prisma.stu_details.findUnique({
            where: {
                Stu_ID: Number(id)
            }
        });
        return student;
    }

    async function updateData(formData: FormData) {
        "use server"
        
        const myData = {
            Stu_Name: String(formData.get("name")),
            Stu_Email: String(formData.get("email")),
            Stu_Age: Number(formData.get("age"))   
        }

        const prisma = new PrismaClient();
        const data = await prisma.stu_details.update({
            where: {
                Stu_ID: Number(formData.get("id"))
            },
            data: myData
        });

        redirect("/student");
    }

    // Get student data
    const student = await getStudentData();

    if (!student) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center">
                    <h4>Student Not Found</h4>
                    <p>The student you're trying to update doesn't exist.</p>
                    <a href="/student" className="btn btn-primary">Back to Students</a>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow">
                            <div className="card-header bg-warning text-dark text-center">
                                <h4 className="mb-0">
                                    <i className="fas fa-user-edit me-2"></i>Update Student
                                </h4>
                            </div>
                            <div className="card-body p-4">
                                <form action={updateData}>
                                    <input type="hidden" name="id" value={student.Stu_ID} />
                                    
                                    <div className="mb-3">
                                        <label className="form-label">Full Name *</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            name="name" 
                                            defaultValue={student.Stu_Name}
                                            required 
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email Address *</label>
                                        <input 
                                            type="email" 
                                            className="form-control form-control-lg" 
                                            name="email" 
                                            defaultValue={student.Stu_Email}
                                            required 
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Age *</label>
                                        <input 
                                            type="number" 
                                            className="form-control form-control-lg" 
                                            name="age" 
                                            defaultValue={student.Stu_Age}
                                            min="1" 
                                            max="100" 
                                            required 
                                        />
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-warning btn-lg text-dark">
                                            <i className="fas fa-save me-2"></i>Update Student
                                        </button>
                                        <a href="/student" className="btn btn-outline-secondary">
                                            <i className="fas fa-arrow-left me-2"></i>Cancel
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}