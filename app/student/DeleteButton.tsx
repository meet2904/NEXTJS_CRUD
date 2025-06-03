"use client"

export default function DeleteButton({id,fnToDelete}:{id:any,fnToDelete:any}) {
  return (
    <button className="btn btn-danger btn-sm" onClick={()=>{fnToDelete(id)}}>Delete</button>
  )
}
