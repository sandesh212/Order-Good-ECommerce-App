import React from "react";

function CategoryForm({handleSubmit,Value,setValue}) {
 
  return (
    <>
      <form onSubmit={handleSubmit}> 
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Category Name"
            value={Value}
            onChange={(e)=>{setValue(e.target.value)}}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
