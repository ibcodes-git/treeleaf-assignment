import React, { useEffect, useState } from "react";
import {
  AiOutlineUserAdd,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillCaretUp,
  AiFillCaretDown,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Form = () => {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "",
  });

  const [formDataArray, setFormDataArray] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [sortOrder, setSortOrder] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };

  const validateNumber = (number) => {
    const numberRegex = /^\d{7,}$/;
    return numberRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, number } = formdata;
    let isValid = true;

    if (!validateName(name)) {
      setNameError("Please enter a valid name.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validateNumber(number)) {
      setNumberError("Please enter a valid phone number (at least 7 digits).");
      isValid = false;
    } else {
      setNumberError("");
    }

    if (isValid) {
      if (editIndex !== -1) {
        // Update existing entry
        const updatedFormDataArray = [...formDataArray];
        updatedFormDataArray[editIndex] = formdata;
        setFormDataArray(updatedFormDataArray);
        setEditIndex(-1);
      } else {
        // Add new entry
        setFormDataArray([...formDataArray, formdata]);
      }

      setFormData({
        name: "",
        email: "",
        number: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "",
      });

      localStorage.setItem(
        "formdata",
        JSON.stringify([...formDataArray, formdata])
      );
    }
  };

  const handleEdit = (index) => {
    setFormData(formDataArray[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedFormDataArray = formDataArray.filter((_, i) => i !== index);
    setFormDataArray(updatedFormDataArray);
    localStorage.setItem("formdata", JSON.stringify(updatedFormDataArray));
  };

  const handleSort = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
      setFormDataArray(
        [...formDataArray].sort((a, b) => b.name.localeCompare(a.name))
      );
    } else {
      setSortOrder("asc");
      setFormDataArray(
        [...formDataArray].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formdata");
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      setFormDataArray(parsedFormData);
    }
  }, []);

  return (
    <div className="max-w-[1640px] m-auto px-2 py-4 bg-white">
      <form>
        <div className="border border-black rounded w-full text bg-[#1b63c9] p-4  ">
          <h1 className="font-bold text-4xl text-center text-white">Form</h1>
          <div className="border border-white rounded  flex flex-col  md:flex-row  sm:justify-between   gap-8 mt-4 px-8 py-8  bg-white w-[100%]">
            <div className="flex flex-col items-center ">
              <h2 className="font-semibold text-xl underline">
                Personal Details
              </h2>
              <div className="mt-4 ">
                <label>Name :</label>
                <div className="flex border rounded border-black p-1 w-[200px]">
                  <AiOutlineUserAdd size={20} className="mt-1" />
                  <input
                    className=" border-none outline-none px-4 w-full"
                    type="text"
                    placeholder="Enter your name"
                    required
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                  />
                </div>
                {nameError && (
                  <p className="text-red-500 w-[200px]">{nameError}</p>
                )}
              </div>
              <div className="mt-4 ">
                <label>Email :</label>
                <div className="flex border rounded border-black p-1 w-[200px]">
                  <AiOutlineMail size={20} className="mt-1" />
                  <input
                    className="border-none outline-none px-4 w-full"
                    type="email"
                    placeholder="Enter your email"
                    required
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 w-[200px]">{emailError}</p>
                )}
              </div>
              <div className="mt-4 ">
                <label>Phone Number :</label>
                <div className="flex border rounded border-black p-1 w-[200px]">
                  <AiOutlinePhone size={20} className="mt-1" />
                  <input
                    className="border-none outline-none px-4 w-full"
                    type="number"
                    placeholder="Enter your phone no."
                    required
                    name="number"
                    value={formdata.number}
                    onChange={handleChange}
                  />
                </div>
                {numberError && (
                  <p className="text-red-500 w-[200px]">{numberError}</p>
                )}
              </div>
              <div className="mt-4">
                <label>DOB :</label>
                <div className="flex border rounded border-black p-1 w-[200px]">
                  <input
                    className="border-none outline-none px-4 w-full"
                    type="date"
                    placeholder="Enter your DOB"
                    name="dob"
                    value={formdata.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center ">
              <h2 className="font-semibold text-xl underline">
                Address Details
              </h2>
              <p className="mt-4 flex flex-col w-[200px]">
                <label>City:</label>
                <input
                  className="border border-black rounded p-1"
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  value={formdata.city}
                  onChange={handleChange}
                />
              </p>
              <p className="mt-4 flex flex-col w-[200px]">
                <label>District:</label>
                <input
                  className="border border-black rounded p-1"
                  type="text"
                  placeholder="Enter your district"
                  name="district"
                  value={formdata.district}
                  onChange={handleChange}
                />
              </p>
              <p className="mt-4 flex flex-col w-[200px]">
                <label>Province:</label>
                <select
                  className="border border-black rounded p-1 w-[200px]"
                  name="province"
                  value={formdata.province}
                  onChange={handleChange}
                >
                  <optgroup>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </optgroup>
                </select>
              </p>
              <p className="mt-4 flex flex-col w-[200px]">
                <label>Country:</label>
                <input
                  className="border border-black rounded p-1"
                  type="text"
                  defaultValue="Nepal"
                  name="country"
                  onChange={handleChange}
                />
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="border bg-red-500 rounded-lg mt-4  p-1 text-white w-16 "
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="bg-white">
        <div className="flex  flex-wrap w-[100%] bg-blue-500 border mt-10 rounded-md">
          <table className="m-4 border-collapse w-full bg-gray-200 text-black rounded-md table-fixed">
            <caption className="font-bold text-3xl my-4">Form Data</caption>
            <thead>
              <p onClick={handleSort}>
                {sortOrder === "asc" ? <AiFillCaretUp /> : <AiFillCaretDown />}
              </p>
              <tr>
                <th className="w-auto">Name</th>
                <th className="w-auto">Email</th>
                <th className="w-auto">Number</th>
                <th className="w-auto">Dob</th>
                <th className="w-auto">City</th>
                <th className="w-auto">District</th>
                <th className="w-auto">Province</th>
                <th className="w-auto">Country</th>
                <th className="w-auto">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formDataArray.map((data, index) => (
                <tr key={index}>
                  <td className="w-auto">{data.name}</td>
                  <td className="w-auto">{data.email}</td>
                  <td className="w-auto">{data.number}</td>
                  <td className="w-auto">{data.dob}</td>
                  <td className="w-auto">{data.city}</td>
                  <td className="w-auto">{data.district}</td>
                  <td className="w-auto">{data.province}</td>
                  <td className="w-auto">{data.country}</td>
                  <td className="w-auto">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" flex justify-center w-full">
            <Link
              className=" mb-4 border bg-red-500 rounded-lg mt-4  p-1 text-white w-16 "
              to="/profiles"
            >
              Submit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
