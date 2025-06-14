// import { PrismaClient } from "@/app/generated/prisma";
// import Link from "next/link";
// import DeleteButton from "../DeleteButton";
// import { revalidatePath } from "next/cache";

// export default async function GetStudentByID({ params }: { params: Promise<{ id: number }> }) {
//     const { id } = await params;
//     const prisma = new PrismaClient();
//     const data = await prisma.stu_details.findUnique({
//         where: {
//             Stu_ID: Number(id)
//         }
//     });


//     async function deleteUser(id: any) {
//         "use server"
//         const prisma = new PrismaClient();
//         const dataDelete = await prisma.stu_details.delete({
//           where: {
//             Stu_ID: id,
//           },
//         });
//         console.log(dataDelete);
//         revalidatePath("/student");
//       }
//     //   return (
//     //     <div>GetStudentByID</div>
//     //   )

//     return (
//         <>
//             {/* Bootstrap Navbar */}
//             <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//                 <div className="container">
//                     <span className="navbar-brand mb-0 h1">Student Management</span>
//                     <Link href={"/student"}><button className="btn btn-outline-light">Back to List</button></Link>


//                 </div>
//             </nav>

//             <div className="bg-light min-vh-100">
//                 <div className="container pt-5">
//                     <div className="row justify-content-center">
//                         <div className="col-lg-6 col-md-8">

//                             {/* Student Details Card */}
//                             <div className="card mb-4 shadow">
//                                 <div className="card-header bg-primary text-white text-center">
//                                     <h4 className="mb-0">Student Details</h4>
//                                 </div>
//                                 <div className="card-body">

//                                     {/* Profile Section */}
//                                     { }
//                                     <div className="text-center mb-4">
//                                         <div className="bg-secondary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
//                                             style={{ width: '100px', height: '100px' }}>
//                                             <i className="text-white" style={{ fontSize: '50px' }}>👤</i>
//                                         </div>
//                                         <h5 className="mb-1">{data?.Stu_Name}</h5>
//                                         <p className="text-muted">Roll No: {data?.Stu_ID}</p>

//                                     </div>

//                                     {/* Student Information */}
//                                     <div className="row mb-3">
//                                         <div className="col-4"><strong>Name:</strong></div>
//                                         <div className="col-8">{data?.Stu_Name}</div>
//                                     </div>
//                                     <div className="row mb-3">
//                                         <div className="col-4"><strong>Roll No:</strong></div>
//                                         <div className="col-8">{data?.Stu_ID}</div>
//                                     </div>
//                                     <div className="row mb-3">
//                                         <div className="col-4"><strong>Email:</strong></div>
//                                         <div className="col-8">{data?.Stu_Email}</div>
//                                     </div>
//                                     <div className="row mb-3">
//                                         <div className="col-4"><strong>Age:</strong></div>
//                                         <div className="col-8">{data?.Stu_Age} years</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="card shadow">
//                                 <div className="card-body text-center">
                                   
//                                         <button className="btn btn-warning me-3 px-4">
//                                             Edit Student
//                                         </button>
//                                     <DeleteButton fnToDelete={deleteUser} id={data?.Stu_ID} />

//                                     {/* <button className="btn btn-danger px-4">
//                                         Delete Student
//                                     </button> */}
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


import { PrismaClient } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "../DeleteButton";

export default async function GetStudentByID({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const prisma = new PrismaClient();
    const data = await prisma.stu_details.findUnique({
        where: {
            Stu_ID: Number(id)
        }
    });

    async function deleteUser(id: any) {
        "use server"
        const prisma = new PrismaClient();
        const dataDelete = await prisma.stu_details.delete({
          where: {
            Stu_ID: id,
          },
        });
        console.log(dataDelete);
        revalidatePath("/student");
        redirect(`/student`);
    }

    return (
        <>
            {/* Bootstrap Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">Student Management</span>
                    <Link href={"/student"}>
                        <button className="btn btn-outline-light">Back to List</button>
                    </Link>
                </div>
            </nav>

            <div className="bg-light min-vh-100">
                <div className="container pt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">

                            {/* Student Details Card */}
                            <div className="card mb-4 shadow">
                                <div className="card-header bg-primary text-white text-center">
                                    <h4 className="mb-0">Student Details</h4>
                                </div>
                                <div className="card-body">

                                    {/* Profile Section */}
                                    <div className="text-center mb-4">
                                        <div >
                                            
                                            {/* <i className="text-white" style={{ fontSize: '50px' }}>👤</i> */}
                                            <img style={{ width: '100px', height: '100px' }} className="bg-secondary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" src={data?.Stu_img} alt="" />
                                        </div>
                                        <h5 className="mb-1">{data?.Stu_Name}</h5>
                                        <p className="text-muted">Roll No: {data?.Stu_ID}</p>
                                    </div>

                                    {/* Student Information */}
                                    <div className="row mb-3">
                                        <div className="col-4"><strong>Name:</strong></div>
                                        <div className="col-8">{data?.Stu_Name}</div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4"><strong>Roll No:</strong></div>
                                        <div className="col-8">{data?.Stu_ID}</div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4"><strong>Email:</strong></div>
                                        <div className="col-8">{data?.Stu_Email}</div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4"><strong>Age:</strong></div>
                                        <div className="col-8">{data?.Stu_Age} years</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="card shadow">
                                <div className="card-body text-center">
                                    {/* Edit Button with Link to Update Page */}
                                    <Link href={`/updatestudent/${data?.Stu_ID}`}>
                                        <button className="btn btn-warning me-3 px-4">
                                            Edit Student
                                        </button>
                                    </Link>
                                    
                                    <DeleteButton fnToDelete={deleteUser} id={data?.Stu_ID} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}