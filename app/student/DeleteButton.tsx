"use client"

import { redirect } from "next/navigation";

export default function DeleteButton({ id, fnToDelete }: { id: any, fnToDelete: any }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fnToDelete(id);
    }
  };

  return (
    <button 
      className="btn btn-danger btn-sm" 
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}


// "use client"

// import { useState } from "react";

// export default function DeleteButton({ id, fnToDelete }: { id: any, fnToDelete: any }) {
//   const [showModal, setShowModal] = useState(false);

//   const handleDelete = () => {
//     setShowModal(false);
//     fnToDelete(id);
//   };

//   return (
//     <>
//       <button 
//         className="btn btn-danger btn-sm" 
//         onClick={() => setShowModal(true)}
//       >
//         Delete
//       </button>

//       {showModal && (
//         <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Delete</h5>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete this item?</p>
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   type="button" 
//                   className="btn btn-secondary" 
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-danger" 
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }