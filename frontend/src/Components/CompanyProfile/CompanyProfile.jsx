import React, { useEffect } from "react";
import Table from "../UniversalUI/Table/Table";
import { useDispatch } from "react-redux";
import { changeSearchParams } from "../../redux/reducers/TableSlice";

function CompanyProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeSearchParams({active:'', quickSearch: ""}))
  }, []);
  const columns = [
    {
      id: 1,
      title: "Id",
      key: "id",
      type: "int",
      show: true,
      order: 1
    },
    {
      id: 2,
      title: "Name",
      key: "name",
      type: "str",
      show: true,
      order: 1
    },
    {
      id: 4,
      title: "CompanyName",
      key: "companyName",
      type: "str",
      show: true,
      order: 3
    },
    {
      id: 5,
      title: "Region",
      key: "region",
      type: "str",
      show: true,
      order: 4
    },
    {
      id: 6,
      title: "Phone",
      key: "supportPhone",
      type: "str",
      show: true,
      order: 5
    },
    {
      id: 3,
      title: "Email",
      key: "email",
      type: "str",
      show: true,
      order: 2
    },
    {
      id: 7,
      title: "Title",
      key: "title",
      type: "str",
      show: true,
      order: 5
    }
  ];
  return (
    <div
      style={{
        background: "rgb(238, 238, 238)",
        borderRadius: "15px",
        padding: "20px",
        width: "100%",
        overflowY: "auto"
      }}
    >
      <p style={{ fontSize: "25pt" }}>Company Profile</p>
      <hr />
      <Table
        isDark={false}
        requestApi={"/api/v1/company/profile?page={page}&size={limit}"}
        columns={columns}
        path={"company/profile"}
      />
    </div>
  );
}

export default CompanyProfile;
