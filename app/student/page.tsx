// import { PrismaClient } from "../generated/prisma"

// export default async function Student() {

//   const prisma = new PrismaClient();
//   const data = await prisma.stu_details.findMany();

//   // console.log(data);

//   return (
//     data.map((d: any) => (
//       <>
//         <body className="bg-light">
//           <div className="container mt-5">

//             <div className="row">

//               <div className="col-lg-4 col-md-6 mb-4">
//                 <div className="card h-100">
//                   <div className="card-body">
//                     <h5 className="card-title">{d.Stu_Name}</h5>
//                     <p className="card-text"><b>Student ID:&nbsp;</b>{d.Stu_ID}&nbsp;&nbsp;&nbsp;<b>Email:&nbsp;</b>{d.Stu_Email}</p>
//                   </div>
//                   <div className="card-footer text-center">
//                     <button className="btn btn-primary btn-sm me-1">View</button>
//                     <button className="btn btn-warning btn-sm me-1" >Update</button>
//                     <button className="btn btn-danger btn-sm" >Delete</button>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </body>


//       </>
//     ))
//   )
// }





import Link from "next/link";
import { PrismaClient } from "../generated/prisma"
import DeleteButton from "./DeleteButton";
import { revalidatePath } from "next/cache";

export default async function Student() {

  const prisma = new PrismaClient();
  const data = await prisma.stu_details.findMany();

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
  }

  // console.log(data);

  return (
    <>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Student Management</span>
          <Link href="/addstudent"><button className="btn btn-success ms-auto">Add Student</button></Link>

        </div>
      </nav>

      <div className="bg-light min-vh-100">
        <div className="container pt-5">
          <div className="row">
            {data.map((d: any) => (
              <div key={d.Stu_ID} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="card-title">{d.Stu_Name}</h4>
                    <p className="card-text"><b>Roll No:&nbsp;</b>{d.Stu_ID}&nbsp;&nbsp;&nbsp;<b>Email:&nbsp;</b>{d.Stu_Email}&nbsp;&nbsp;&nbsp;<b>Age:&nbsp;</b>{d.Stu_Age}</p>
                  </div>
                  <div className="card-footer text-center">
                    <Link href={"/student/" + d.Stu_ID}><button className="btn btn-primary btn-sm me-1">View</button></Link>
                    {/* <button className="btn btn-warning btn-sm me-1">Update</button> */}
                    <Link href={"/updatestudent/" + d.Stu_ID}>
                      <button className="btn btn-warning btn-sm me-1">Update</button>
                    </Link>
                    <DeleteButton fnToDelete={deleteUser} id={d.Stu_ID} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}