// import React from "react";
import BaseTable from "../../components/ui/table/Table";
import { Button, IconButton, Switch, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
// import { ServiceList } from "../../types/serviceTypes";
import { deleteService, getAllServices } from "../../services/serviceList";
import dayjs from "dayjs";
import { KeepMountModal } from "../../components/ui/modal/KeepMountModal";
import ServiceForm from "./components/ServiceForm";
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const ServiceList = () => {
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleOpenEditModal = () => setOpenEditModal(true);

  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseEditModal = () => setOpenEditModal(false);

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
      format: (value: any) => {
        console.log(value, "v");
        return dayjs(value).format("YYYY-MM-DD");
      },
    },
    { id: "documentStatus", label: "Status", minWidth: 70, align: "center" },
    { id: "actions", label: "Actions", minWidth: 100, align: "center" },
  ];

  const handleGetServiceList = async () => {
    try {
      const response = await getAllServices();
      const formattedData = response?.data?.serviceLists.map(
        (item: any, index: number) => ({
          sl: index + 1,
          serviceName: item.serviceName,
          serviceDescription: item.serviceDescription,
          servicePrice: item.servicePrice,
          createdAt: dayjs(item.createdAt).format("DD-MM-YYYY"),
          documentStatus: item.documentStatus,
          id: item?._id,
        })
      );
      setServiceData(formattedData);
      console.log("resp", formattedData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteServices = async (id: string) => {
    try {
      const apiResponse = await deleteService( id);
      if (apiResponse.statusCode === 200) {
        alert("Service Deleted successfully");
        handleGetServiceList()
        // onCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetServiceList();
  }, [openAddModal]);

  const renderCell = (columnId: string, value: any, row: any) => {
    if (columnId === "actions") {
      return (
        <>
          <Button onClick={() => alert(`View ${row.serviceName}`)}>
            <PageviewIcon />
          </Button>
          <Button
            onClick={() => {
              handleOpenEditModal();
              setId(row?.id);
              console.log("c", columnId, value, row);
            }}
          >
            <EditIcon />
          </Button>
          <Button 
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${row.serviceName}?`)) {
                  handleDeleteServices(row.id);
                }
              }}
          >
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
    <>
      <div>
        <Typography
          variant="h4"
          sx={{ fontWeight: "600", marginTop: "10px", marginLeft: "10px" }}
          gutterBottom
        >
          Services{" "}
          <IconButton onClick={handleOpenAddModal}>
            <AddCircleOutlineIcon fontSize="large" sx={{ color: "#1976d2" }} />
          </IconButton>
        </Typography>
        <BaseTable
          columns={columns}
          data={serviceData}
          renderCell={renderCell}
        />
      </div>
      <KeepMountModal open={openAddModal} onClose={handleCloseAddModal}>
        <>
          <ServiceForm onCancel={handleCloseAddModal} />
        </>
      </KeepMountModal>
      <KeepMountModal open={openEditModal} onClose={handleCloseEditModal}>
        <>
          <ServiceForm onCancel={handleCloseEditModal} id={id} />
        </>
      </KeepMountModal>
    </>
  );
};

export default ServiceList;
