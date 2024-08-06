// import React from "react";
import BaseTable from "../../components/ui/table/Table";
import { Button, IconButton, Switch, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { KeepMountModal } from "../../components/ui/modal/KeepMountModal";
import PlansFrom from "./components/PlansForm";
import { deletePlan, getAllPlan } from "../../services/planService";
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const PlansList = () => {
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
    { id: "planName", label: "Plan Name", minWidth: 170 },
    { id: "planDescription", label: "Plan Description", minWidth: 170 },
    {
      id: "planPrice",
      label: "Plan Price",
      minWidth: 100,
      align: "right",
      format: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      id: "planDuration",
      label: "Plan Duration (days)",
      minWidth: 100,
      align: "center",
    },
    // {
    //   id: "planServices",
    //   label: "Services",
    //   minWidth: 200,
    // //   format: (value: string[]) => value.join(", "),
    // },
    {
      id: "isOfferValid",
      label: "Offer Valid",
      minWidth: 70,
      align: "center",
    //   format: (value: boolean) => (value ? "Yes" : "No"),
    },
    // {
    //   id: "offerPercentage",
    //   label: "Offer Percentage",
    //   minWidth: 100,
    //   align: "right",
    //   format: (value: number) => `${value}%`,
    // },
    // {
    //   id: "offerDuration",
    //   label: "Offer Duration (days)",
    //   minWidth: 100,
    //   align: "center",
    // },
    {
      id: "documentStatus",
      label: "Status",
      minWidth: 70,
      align: "center",
    //   format: (value: boolean) => (value ? "Active" : "Inactive"),
    },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 170,
      align: "center",
      format: (value: any) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      id: "createdUser",
      label: "Created User",
      minWidth: 170,
    },
    { id: "actions", label: "Actions", minWidth: 100, align: "center" },
  ];

  const handleGetPlans = async () => {
    try {
      const response = await getAllPlan();
      const formattedData = response?.data?.plans.map(
        (item: any, index: number) => ({
            sl: index + 1,
            planName: item?.planName,
            planDescription: item?.planDescription,
            planPrice: item?.planPrice,
            planDuration: item?.planDuration,
            // planServices: item?.planServices,
            isOfferValid: item?.isOfferValid ? "Yes":"No",
            offerPercentage: item?.isOfferValid ? item?.offerPercentage : null,
            offerDuration: item?.isOfferValid ? item?.offerDuration : null,
            documentStatus: item?.documentStatus,
            createdAt: dayjs(item?.createdAt)?.format("DD-MM-YYYY"),
            createdUser: item?.createdUser?.adminUserName,
            id: item?._id,
        })
      );
      setServiceData(formattedData);
      console.log("resp", formattedData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeletePlan = async (id: string) => {
    try {
      const apiResponse = await deletePlan( id);
      if (apiResponse.statusCode === 200) {
        alert("Plan Deleted successfully");
        // onCancel();
        handleGetPlans()
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetPlans();
  }, [openAddModal]);

  const renderCell = (columnId: string, value: any, row: any) => {
    if (columnId === "actions") {
      return (
        <>
          <Button onClick={() => alert(`View ${row.planName}`)}>
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
                if (window.confirm(`Are you sure you want to delete ${row.planName}?`)) {
                  handleDeletePlan(row.id);
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
          Plans{" "}
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
          <PlansFrom onCancel={handleCloseAddModal} />
        </>
      </KeepMountModal>
      <KeepMountModal open={openEditModal} onClose={handleCloseEditModal}>
        <>
          <PlansFrom onCancel={handleCloseEditModal} id={id} />
        </>
      </KeepMountModal>
    </>
  );
};

export default PlansList;
