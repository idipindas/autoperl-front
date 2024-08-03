// import React from "react";
import BaseTable from "../../components/ui/table/Table";
import { Button, IconButton, Switch, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
// import { ServiceList } from "../../types/serviceTypes";
import { getAllServices } from "../../services/serviceList";
import dayjs from "dayjs";
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const ServiceList = () => {
  const [serviceData, setServiceData] = useState<any[]>([]);

  const columns: Column[] = [
    { id: "sl", label: "Sl No.", minWidth: 50 },
    { id: "serviceName", label: "Service Name", minWidth: 170 },
    { id: "serviceDescription", label: "Service Description", minWidth: 170 },
    {
      id: "servicePrice",
      label: "Service Price",
      minWidth: 100,
      align: "right",
    },
    {
      id: "createdAt",
      label: "Date",
      minWidth: 170,
      align: "center",
      format: (value: any) =>{
        console.log(value,"v");
        return dayjs(value).format("YYYY-MM-DD");
        
      },
    },
    { id: "documentStatus", label: "Status", minWidth: 70, align: "center" },
    { id: "actions", label: "Actions", minWidth: 100, align: "center" },
  ];

  const handleGetServiceList = async () => {
    try {
      const response = await getAllServices();
      const formattedData = response?.data?.serviceLists.map((item: any, index: number) => ({
        sl: index + 1,
        serviceName: item.serviceName,
        serviceDescription: item.serviceDescription,
        servicePrice: item.servicePrice,
        createdAt: dayjs(item.createdAt).format('DD-MM-YYYY'),
        documentStatus: item.documentStatus,
      }));
      setServiceData(formattedData);
      console.log("resp", formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetServiceList();
  }, []);

  const rows = [
    {
      sl: 1,
      service_name: "Service 1",
      service_desc: "Description 1",
      service_price: 100,
      date: "2024-08-03",
      status: true,
    },
    {
      sl: 2,
      service_name: "Service 2",
      service_desc: "Description 2",
      service_price: 200,
      date: "2024-08-03",
      status: false,
    },
    {
      sl: 3,
      service_name: "Service 3",
      service_desc: "Description 3",
      service_price: 150,
      date: "2024-08-02",
      status: true,
    },
    {
      sl: 4,
      service_name: "Service 4",
      service_desc: "Description 4",
      service_price: 250,
      date: "2024-08-02",
      status: false,
    },
    {
      sl: 5,
      service_name: "Service 5",
      service_desc: "Description 5",
      service_price: 300,
      date: "2024-08-01",
      status: true,
    },
    {
      sl: 6,
      service_name: "Service 6",
      service_desc: "Description 6",
      service_price: 350,
      date: "2024-08-01",
      status: true,
    },
    {
      sl: 7,
      service_name: "Service 7",
      service_desc: "Description 7",
      service_price: 400,
      date: "2024-08-01",
      status: false,
    },
    {
      sl: 8,
      service_name: "Service 8",
      service_desc: "Description 8",
      service_price: 450,
      date: "2024-07-31",
      status: true,
    },
    {
      sl: 9,
      service_name: "Service 9",
      service_desc: "Description 9",
      service_price: 500,
      date: "2024-07-31",
      status: false,
    },
    {
      sl: 10,
      service_name: "Service 10",
      service_desc: "Description 10",
      service_price: 550,
      date: "2024-07-30",
      status: true,
    },
    {
      sl: 11,
      service_name: "Service 11",
      service_desc: "Description 11",
      service_price: 600,
      date: "2024-07-30",
      status: false,
    },
    {
      sl: 12,
      service_name: "Service 12",
      service_desc: "Description 12",
      service_price: 650,
      date: "2024-07-29",
      status: true,
    },
    {
      sl: 13,
      service_name: "Service 13",
      service_desc: "Description 13",
      service_price: 700,
      date: "2024-07-29",
      status: false,
    },
    {
      sl: 14,
      service_name: "Service 14",
      service_desc: "Description 14",
      service_price: 750,
      date: "2024-07-28",
      status: true,
    },
    {
      sl: 15,
      service_name: "Service 15",
      service_desc: "Description 15",
      service_price: 800,
      date: "2024-07-28",
      status: true,
    },
    {
      sl: 16,
      service_name: "Service 16",
      service_desc: "Description 16",
      service_price: 850,
      date: "2024-07-27",
      status: false,
    },
    {
      sl: 17,
      service_name: "Service 17",
      service_desc: "Description 17",
      service_price: 900,
      date: "2024-07-27",
      status: true,
    },
    {
      sl: 18,
      service_name: "Service 18",
      service_desc: "Description 18",
      service_price: 950,
      date: "2024-07-26",
      status: false,
    },
    {
      sl: 19,
      service_name: "Service 19",
      service_desc: "Description 19",
      service_price: 1000,
      date: "2024-07-26",
      status: true,
    },
    {
      sl: 20,
      service_name: "Service 20",
      service_desc: "Description 20",
      service_price: 1050,
      date: "2024-07-25",
      status: false,
    },
  ];

  const renderCell = (columnId: string, value: any, row: any) => {
    if (columnId === "actions") {
      return (
        <>
          <Button onClick={() => alert(`View ${row.serviceName}`)}>
            <PageviewIcon />
          </Button>
          <Button onClick={() => alert(`Edit ${row.serviceName}`)}>
            <EditIcon />
          </Button>
          <Button onClick={() => alert(`Delete ${row.serviceName}`)}>
            <DeleteIcon />
          </Button>
        </>
      );
    }
    if (columnId === "documentStatus") {
      return (
        <Switch
          checked={value}
          onChange={() => alert(`Toggle status for ${row.serviceName}`)}
        />
      );
    }
    return value;
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{ fontWeight: "600", marginTop: "10px", marginLeft: "10px" }}
        gutterBottom
      >
        Services{" "}
        <IconButton>
          <AddCircleOutlineIcon fontSize="large" sx={{ color: "#1976d2" }} />
        </IconButton>
      </Typography>
      <BaseTable columns={columns} data={serviceData} renderCell={renderCell} />
    </div>
  );
};

export default ServiceList;
