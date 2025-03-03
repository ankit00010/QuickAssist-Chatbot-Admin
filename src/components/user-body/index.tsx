"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 180 },
  { field: "user_id", headerName: "User ID", width: 180 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "phone_number", headerName: "Phone Number", width: 180 },
];

const rows = [
  {
    id: 1,
    user_id: "508599499011931",
    phone_number: "919326413041",
    name: "Ankit",
  },
  {
    id: 2,
    user_id: "508599499011932",
    phone_number: "919326413042",
    name: "Rahul",
  },
  {
    id: 3,
    user_id: "508599499011933",
    phone_number: "919326413043",
    name: "Priya",
  },
  {
    id: 4,
    user_id: "508599499011934",
    phone_number: "919326413044",
    name: "Amit",
  },
  {
    id: 5,
    user_id: "508599499011935",
    phone_number: "919326413045",
    name: "Sonia",
  },
  {
    id: 6,
    user_id: "508599499011936",
    phone_number: "919326413046",
    name: "Vikas",
  },
  {
    id: 7,
    user_id: "508599499011937",
    phone_number: "919326413047",
    name: "Neha",
  },
  {
    id: 8,
    user_id: "508599499011938",
    phone_number: "919326413048",
    name: "Manish",
  },
  {
    id: 9,
    user_id: "508599499011939",
    phone_number: "919326413049",
    name: "Pooja",
  },
  {
    id: 10,
    user_id: "508599499011940",
    phone_number: "919326413050",
    name: "Deepak",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAEAEA",
      }}
    >
      <Paper sx={{ height: 400, width: "70%", padding: 2, borderRadius: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            "& .MuiDataGrid-columnHeaders":{
                backgroundColor:"#1976d2"
            }
          }}
        />
      </Paper>
    </Box>
  );
}
