// import { redirect } from "next/navigation";
// import { PrismaClient } from "@/app/generated/prisma";

// export default async function UpdateStudent({ params }: { params: Promise<{ id: string }> }) {
    
//     async function getStudentData() {
//         const { id } = await params;
//         const prisma = new PrismaClient();
//         const student = await prisma.stu_details.findUnique({
//             where: {
//                 Stu_ID: Number(id)
//             }
//         });
//         return student;
//     }

//     async function updateData(formData: FormData) {
//         "use server"
        
//         const myData = {
//             Stu_Name: String(formData.get("name")),
//             Stu_Email: String(formData.get("email")),
//             Stu_Age: Number(formData.get("age"))   
//         }

//         const prisma = new PrismaClient();
//         const data = await prisma.stu_details.update({
//             where: {
//                 Stu_ID: Number(formData.get("id"))
//             },
//             data: myData
//         });

//         redirect("/student");
//     }

   
//     const student = await getStudentData();

//     if (!student) {
//         return (
//             <div className="container mt-5">
//                 <div className="alert alert-danger text-center">
//                     <h4>Student Not Found</h4>
//                     <p>The student you're trying to update doesn't exist.</p>
//                     <a href="/student" className="btn btn-primary">Back to Students</a>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="container mt-5">
//                 <div className="row justify-content-center">
//                     <div className="col-md-6 col-lg-5">
//                         <div className="card shadow">
//                             <div className="card-header bg-warning text-dark text-center">
//                                 <h4 className="mb-0">
//                                     <i className="fas fa-user-edit me-2"></i>Update Student
//                                 </h4>
//                             </div>
//                             <div className="card-body p-4">
//                                 <form action={updateData}>
//                                     <input type="hidden" name="id" value={student.Stu_ID} />
                                    
//                                     <div className="mb-3">
//                                         <label className="form-label">Full Name *</label>
//                                         <input 
//                                             type="text" 
//                                             className="form-control form-control-lg" 
//                                             name="name" 
//                                             defaultValue={student.Stu_Name}
//                                             required 
//                                         />
//                                     </div>

//                                     <div className="mb-3">
//                                         <label className="form-label">Email Address *</label>
//                                         <input 
//                                             type="email" 
//                                             className="form-control form-control-lg" 
//                                             name="email" 
//                                             defaultValue={student.Stu_Email}
//                                             required 
//                                         />
//                                     </div>

//                                     <div className="mb-4">
//                                         <label className="form-label">Age *</label>
//                                         <input 
//                                             type="number" 
//                                             className="form-control form-control-lg" 
//                                             name="age" 
//                                             defaultValue={student.Stu_Age}
//                                             min="1" 
//                                             max="100" 
//                                             required 
//                                         />
//                                     </div>

//                                     <div className="d-grid gap-2">
//                                         <button type="submit" className="btn btn-warning btn-lg text-dark">
//                                             <i className="fas fa-save me-2"></i>Update Student
//                                         </button>
//                                         <a href="/student" className="btn btn-outline-secondary">
//                                             <i className="fas fa-arrow-left me-2"></i>Cancel
//                                         </a>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }



import { PrismaClient } from "@/app/generated/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdateStudent({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const prisma = new PrismaClient();
    
    // Fetch existing student data
    const data = await prisma.stu_details.findUnique({
        where: {
            Stu_ID: Number(id)
        }
    });

    // Server action to update student
    async function updateStudent(formData: FormData) {
        "use server"
        const prisma = new PrismaClient();
        
        const updatedStudent = await prisma.stu_details.update({
            where: {
                Stu_ID: Number(id)
            },
            data: {
                Stu_Name: formData.get("name") as string,
                Stu_Email: formData.get("email") as string,
                Stu_Age: Number(formData.get("age")),
                Stu_img:formData.get("img") as string
            }
        });
        
        console.log("Updated student:", updatedStudent);
        // revalidatePath("/student");
        // revalidatePath(`/student/${id}`);
        // redirect(`/student/${id}`);
        redirect("/student");

    }

    if (!data) {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container">
                        <span className="navbar-brand mb-0 h1">Student Management</span>
                        <Link href={"/student"}>
                            <button className="btn btn-outline-light">Back to List</button>
                        </Link>
                    </div>
                </nav>
                <div className="container pt-5">
                    <div className="alert alert-danger text-center">
                        <h4>Student not found</h4>
                        <p>The student with ID {id} does not exist.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Bootstrap Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">Student Management</span>
                    <div>
                        <Link href={`/student/${id}`} className="me-2">
                            <button className="btn btn-outline-light">Back to Details</button>
                        </Link>
                        <Link href={"/student"}>
                            <button className="btn btn-outline-light">Student List</button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="bg-light min-vh-100">
                <div className="container pt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="card shadow">
                                <div className="card-header bg-warning text-dark text-center">
                                    <h4 className="mb-0">Update Student Information</h4>
                                    <small className="text-muted">Student ID: {data.Stu_ID}</small>
                                </div>
                                <div className="card-body">
                                    <form action={updateStudent}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                <strong>Full Name:</strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                defaultValue={data.Stu_Name || ""}
                                                placeholder="Enter student's full name"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">
                                                <strong>Email Address:</strong>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                defaultValue={data.Stu_Email || ""}
                                                placeholder="Enter email address"
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="age" className="form-label">
                                                <strong>Age:</strong>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="age"
                                                name="age"
                                                defaultValue={data.Stu_Age || ""}
                                                placeholder="Enter age"
                                                min="1"
                                                max="100"
                                                required
                                            />

                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="img" className="form-label">
                                                <strong>Profile:</strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="img"
                                                name="img"
                                                defaultValue={data.Stu_img || ""}
                                                required
                                            />
                                            
                                        </div>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                            <button type="submit" className="btn btn-success px-4 me-2">
                                                <i className="bi bi-check-circle me-2"></i>
                                                Update Student
                                            </button>
                                            <Link href={`/student/${id}`}>
                                                <button type="button" className="btn btn-secondary px-4">
                                                    <i className="bi bi-x-circle me-2"></i>
                                                    Cancel
                                                </button>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Current Information Display */}
                            <div className="card mt-3 shadow-sm">
                                <div className="card-header bg-info text-white">
                                    <h6 className="mb-0">Current Information</h6>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4"><strong>Name:</strong></div>
                                        <div className="col-8">{data.Stu_Name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4"><strong>Email:</strong></div>
                                        <div className="col-8">{data.Stu_Email}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4"><strong>Age:</strong></div>
                                        <div className="col-8">{data.Stu_Age} years</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}