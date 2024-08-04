import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addServiceType } from "../../../types/serviceTypes";
import { createService } from "../../../services/serviceList";

interface ServiceFormProps {
  onCancel: () => void;
}

const validationSchema = Yup.object({
  serviceName: Yup.string().required("Service Name is required"),
  serviceDescription: Yup.string().required("Service Description is required"),
  servicePrice: Yup.number()
    .required("Service Price is required")
    .positive("Service Price must be a positive number")
    .integer("Service Price must be an integer"),
  documentStatus: Yup.boolean().required("Status is required"),
});

const ServiceForm: React.FC<ServiceFormProps> = ({ onCancel }) => {
  const formik = useFormik({
    initialValues: {
      serviceName: "",
      serviceDescription: "",
      servicePrice: 0,
      documentStatus: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: addServiceType) => {
      console.log(values);
      handleAddService(values)
    },
  });

  const handleAddService = async(data:addServiceType)=>{
    try{
        const apiResponse = await createService(data)
        if(apiResponse.statusCode ===201){
            alert("Service added successfully");
            onCancel();
        }
    }catch(error){
        console.error(error);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
    >
      <Typography variant="h6" sx={{ fontWeight: "600" }} component="h2">
        Service Form
      </Typography>

      <TextField
        id="serviceName"
        name="serviceName"
        label="Service Name"
        variant="outlined"
        value={formik.values.serviceName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.serviceName && Boolean(formik.errors.serviceName)}
        helperText={formik.touched.serviceName && formik.errors.serviceName}
      />

      <TextField
        id="serviceDescription"
        name="serviceDescription"
        label="Service Description"
        variant="outlined"
        multiline
        rows={4}
        value={formik.values.serviceDescription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.serviceDescription &&
          Boolean(formik.errors.serviceDescription)
        }
        helperText={
          formik.touched.serviceDescription && formik.errors.serviceDescription
        }
      />

      <TextField
        id="servicePrice"
        name="servicePrice"
        label="Service Price"
        variant="outlined"
        type="number"
        value={formik.values.servicePrice}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.servicePrice && Boolean(formik.errors.servicePrice)
        }
        helperText={formik.touched.servicePrice && formik.errors.servicePrice}
      />

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Status</Typography>
        <Switch
          id="documentStatus"
          name="documentStatus"
          checked={formik.values.documentStatus}
          onChange={formik.handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceForm;
