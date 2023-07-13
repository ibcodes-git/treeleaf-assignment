import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Profiles = () => {
  let data = localStorage.getItem("formdata");
  let formdata = JSON.parse(data) || [];

  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  
  const handleEdit = (index) => {
    setEditMode(true);
    setEditedItem(formdata[index]);
  };

  const handleSave = () => {
    // Find the index of the edited item in the formdata array
    const index = formdata.findIndex((item) => item.number === editedItem.number);
    if (index !== -1) {
      // Update the item in the formdata array
      formdata[index] = editedItem;
      // Save the updated formdata to the local storage
      localStorage.setItem("formdata", JSON.stringify(formdata));
    }
    setEditMode(true);
    setEditedItem({});
  };

  const handleDelete = (index) => {
    formdata.splice(index, 1);
    localStorage.setItem("formdata", JSON.stringify(formdata));
  };

  const handleChange = (event, field) => {
    setEditedItem({ ...editedItem, [field]: event.target.value });
  };

  return (
    <div className="max-w[1640px] m-auto bg-white px-2 py-2">
      <div className="w-full border bg-blue-500 px-4 py-12 rounded-md">
        <h1 className="font-bold text-4xl text-white text-center">Profiles</h1>
        <div className="bg-white border-collapse rounded-md p-8 mt-4">
          {formdata.map((items, index) => (
            <ul className="my-8 flex flex-col flex-wrap border border-black rounded p-4" key={index}>
              <li className="font-semibold text-xl capitalize ">{items.name}</li>
              <li className="font-normal ">{items.email}</li>
              <li className="font-normal ">{items.number}</li>
              <li className="font-normal ">{items.dob}</li>
              <li className="font-normal ">{items.city}</li>
              <li className="font-normal ">{items.district}</li>
              <li className="font-normal ">{items.province}</li>
              <li className="font-normal ">{items.country}</li>
              {editMode && editedItem.number === items.number ? (
                <React.Fragment>
                  <input
                    type="text"
                    value={editedItem.name}
                    onChange={(event) => handleChange(event, "name")}
                  />
                  <input
                    type="text"
                    value={editedItem.email}
                    onChange={(event) => handleChange(event, "email")}
                  />
                  <input
                    type="text"
                    value={editedItem.number}
                    onChange={(event) => handleChange(event, "number")}
                  />
                  <input
                    type="text"
                    value={editedItem.dob}
                    onChange={(event) => handleChange(event, "dob")}
                  />
                  <input
                    type="text"
                    value={editedItem.city}
                    onChange={(event) => handleChange(event, "city")}
                  />
                  <input
                    type="text"
                    value={editedItem.district}
                    onChange={(event) => handleChange(event, "district")}
                  />
                  <input
                    type="text"
                    value={editedItem.province}
                    onChange={(event) => handleChange(event, "province")}
                  />
                  <input
                    type="text"
                    value={editedItem.country}
                    onChange={(event) => handleChange(event, "country")}
                  />
                  <button className="text-blue-500" onClick={handleSave}>
                    Save
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(index)}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </React.Fragment>
              )}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
