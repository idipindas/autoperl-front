import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PlanCreateType } from "../../../types/planTypes";
import { createPlan, getOnePlan } from "../../../services/planService";

interface ServiceFormProps {
  onCancel: () => void;
  id?: string;
}

const validationSchema = Yup.object({
    planName: Yup.string().required("Plan Name is required"),
    planDescription: Yup.string().required("Plan Description is required"),
    planPrice: Yup.number()
      .required("Plan Price is required")
      .positive("Plan Price must be a positive number"),
    planDuration: Yup.number()
      .required("Plan Duration is required")
      .positive("Plan Duration must be a positive number"),
    planServices: Yup.array()
      .of(Yup.string().required("Service ID is required"))
      .min(1, "At least one service is required"),
    isOfferValid: Yup.boolean().required("Offer status is required"),
    offerPercentage: Yup.number().when('isOfferValid', {
      is: true,
      then: (schema) => schema.required("Offer Percentage is required").positive("Offer Percentage must be a positive number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    offerDuration: Yup.number().when('isOfferValid', {
      is: true,
      then: (schema) => schema.required("Offer Duration is required").positive("Offer Duration must be a positive number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    documentStatus: Yup.boolean().required("Status is required"),
  });
  

const PlansForm: React.FC<ServiceFormProps> = ({ onCancel, id }) => {
  const [data, setData] = useState<any>();

  const formik = useFormik({
    initialValues: {
      planName: id ? data?.planName : "",
      planDescription: id ? data?.planDescription : "",
      planPrice: id ? data?.planPrice : 0,
      planDuration: id ? data?.planDuration : 0,
      planServices: id ? data?.planServices : [""],
      isOfferValid: id ? data?.isOfferValid : false,
      offerPercentage: id ? data?.offerPercentage : 0,
      offerDuration: id ? data?.offerDuration : 0,
      documentStatus: id ? data?.documentStatus : false,
      createdUser: "60c72b4f4f1a2c001c8e4d7e",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: PlanCreateType) => {
      console.log(values);
      handleAddPlan(values);
    },
  });

  const handleAddPlan = async (data: PlanCreateType) => {
    try {
      const apiResponse = await createPlan(data);
      if (apiResponse.statusCode === 201) {
        alert("Plan added successfully");
        onCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOnePlans = async (id: string) => {
    try {
      const response: any = await getOnePlan(id);
      if (response.statusCode === 200) {
        console.log(response);
        setData(response?.data?.serviceList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getOnePlans(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      formik.setValues({
        planName: data.planName,
        planDescription: data.planDescription,
        planPrice: data.planPrice,
        planDuration: data.planDuration,
        planServices: data.planServices,
        isOfferValid: data.isOfferValid,
        offerPercentage: data.offerPercentage,
        offerDuration: data.offerDuration,
        documentStatus: data.documentStatus,
        createdUser: "60c72b4f4f1a2c001c8e4d7e",
      });
    }
  }, [data]);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
    >
      <Typography variant="h6" sx={{ fontWeight: "600" }} component="h2">
        Plan Form
      </Typography>

      <TextField
        id="planName"
        name="planName"
        label="Plan Name"
        variant="outlined"
        value={formik.values.planName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.planName && Boolean(formik.errors.planName)}
        helperText={formik.touched.planName && formik.errors.planName}
      />

      <TextField
        id="planDescription"
        name="planDescription"
        label="Plan Description"
        variant="outlined"
        multiline
        rows={4}
        value={formik.values.planDescription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.planDescription && Boolean(formik.errors.planDescription)}
        helperText={formik.touched.planDescription && formik.errors.planDescription}
      />

      <TextField
        id="planPrice"
        name="planPrice"
        label="Plan Price"
        variant="outlined"
        type="number"
        value={formik.values.planPrice}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.planPrice && Boolean(formik.errors.planPrice)}
        helperText={formik.touched.planPrice && formik.errors.planPrice}
      />

      <TextField
        id="planDuration"
        name="planDuration"
        label="Plan Duration (days)"
        variant="outlined"
        type="number"
        value={formik.values.planDuration}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.planDuration && Boolean(formik.errors.planDuration)}
        helperText={formik.touched.planDuration && formik.errors.planDuration}
      />

      <TextField
        id="planServices"
        name="planServices"
        label="Plan Services (comma separated IDs)"
        variant="outlined"
        value={formik.values.planServices}
        onChange={(e) => formik.setFieldValue("planServices", e.target.value.split(","))}
        onBlur={formik.handleBlur}
        error={formik.touched.planServices && Boolean(formik.errors.planServices)}
        helperText={formik.touched.planServices && formik.errors.planServices}
      />

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Offer Valid</Typography>
        <Switch
          id="isOfferValid"
          name="isOfferValid"
          checked={formik.values.isOfferValid}
          onChange={formik.handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>

      {formik.values.isOfferValid && (
        <>
          <TextField
            id="offerPercentage"
            name="offerPercentage"
            label="Offer Percentage"
            variant="outlined"
            type="number"
            value={formik.values.offerPercentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.offerPercentage && Boolean(formik.errors.offerPercentage)}
            helperText={formik.touched.offerPercentage && formik.errors.offerPercentage}
          />

          <TextField
            id="offerDuration"
            name="offerDuration"
            label="Offer Duration (days)"
            variant="outlined"
            type="number"
            value={formik.values.offerDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.offerDuration && Boolean(formik.errors.offerDuration)}
            helperText={formik.touched.offerDuration && formik.errors.offerDuration}
          />
        </>
      )}

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

export default PlansForm;
