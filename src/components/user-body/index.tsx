"use client";
import React, { useContext } from "react";
import "./style.css";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import { BounceLoader } from "react-spinners";
const UserTable = () => {
  const { userData, user_data_pagination, loading } = useContext(
    AdminContext
  ) as AdminContextType;

  const headers = ["ID", "NAME", "PHONE NUMBER", "USERID"];
  // const [id, setID] = useState(1);
  // const [userData, setUserData] = useState([
  //   {
  //     _id: "67c5b63e1f1a1b9b8d0e2838",
  //     user_id: "508599499011935",
  //     phone_number: "919326413045",
  //     name: "Sakshi",
  //   },
  //   {
  //     _id: "67c5b63e1f1a1b9b8d0e2839",
  //     user_id: "508599499011936",
  //     phone_number: "919326413046",
  //     name: "Vikram",
  //   },
  //   {
  //     _id: "67c5b63e1f1a1b9b8d0e283a",
  //     user_id: "508599499011937",
  //     phone_number: "919326413047",
  //     name: "Neha",
  //   },
  //   {
  //     _id: "67c5b63e1f1a1b9b8d0e283b",
  //     user_id: "508599499011938",
  //     phone_number: "919326413048",
  //     name: "Suresh",
  //   },
  //   {
  //     _id: "67c5b63e1f1a1b9b8d0e283c",
  //     user_id: "508599499011939",
  //     phone_number: "919326413049",
  //     name: "Kavita",
  //   },
  // ]);
  // useEffect(() => {
  //   const id = (user_data_pagination.page - 1) * 5 + 1;

  //   setID(id);
  // }, [user_data_pagination.page]);
  const startID = (user_data_pagination.page - 1) * 5 + 1;

  return (
    <div className="user-table-container">
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <BounceLoader loading={loading} size={50} />
        </div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {user_data_pagination.totalItems > 0 ? (
              userData.map((user, index) => (
                <tr key={index}>
                  <td>{startID + index}</td>
                  <td>{user.name}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.user_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  style={{ textAlign: "center", padding: "10px", height:"200px" }}
                >
                  No Data Available
                </td>
                
              </tr>
              
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
