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
import { createPlan, getOnePlan, updatePlan } from "../../../services/planService";
import { ServiceList } from "../../../types/serviceTypes";
import { getAllMinialServices } from "../../../services/serviceList";
import { Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";

interface ServiceFormProps {
  onCancel: () => void;
  id?: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  const [data, setData] = useState<PlanCreateType | null>(null);
  const [serviceList, setServiceList] = useState<ServiceList[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      planName: "",
      planDescription: "",
      planPrice: 0,
      planDuration: 0,
      planServices: [],
      isOfferValid: false,
      offerPercentage: 0,
      offerDuration: 0,
      documentStatus: false,
      createdUser: "60c72b4f4f1a2c001c8e4d7e",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: PlanCreateType) => {
      console.log(values);
      if (id) {
        handleUpdatePlan(values,id);
      } else {
        handleAddPlan(values);
      }
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

  const handleUpdatePlan = async (data: PlanCreateType,id:string) => {
    try {
      
      const apiResponse = await updatePlan(data,id);
      console.log('updata',data,id,apiResponse);

      if (apiResponse.statusCode === 200) {
        alert("Plan updated successfully");
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
        setData(response.data?.plans);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getServiceMinimals = async () => {
    try {
      const response: any = await getAllMinialServices();
      console.log(response?.data?.serviceLists, "t");

      if (response.statusCode === 200) {
        setServiceList(response?.data?.serviceLists);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedServices>) => {
    const { target: { value } } = event;
    setSelectedServices(
      typeof value === 'string' ? value.split(',') : value,
    );
    formik.setFieldValue("planServices", typeof value === 'string' ? value.split(',') : value);
  };

  const getServiceNameById = (id: string) => {
    const service = serviceList.find(service => service._id === id);
    return service ? service.serviceName : '';
  };

  useEffect(() => {
    if (id) {
      getOnePlans(id);
    }
  }, [id]);

  useEffect(() => {
    getServiceMinimals();
  }, []);
console.log('plan ser',selectedServices);

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
        createdUser: data.createdUser,
      });
      setSelectedServices(data.planServices);
    }
  }, [data]);

  console.log('rt', serviceList);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
    >
      <Typography variant="h6" sx={{ fontWeight: "600" }} component="h2">
        {id ? "Edit Plan" : "Create Plan"}
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

      <InputLabel id="planServices-label">Plan Services</InputLabel>
      <Select
        labelId="planServices-label"
        id="planServices"
        multiple
        value={selectedServices}
        onChange={handleChange}
        input={<OutlinedInput label="Plan Services" />}
        renderValue={(selected) => selected.map((id) => getServiceNameById(id)).join(', ')}
        MenuProps={MenuProps}
      >
        {serviceList?.length && serviceList.map((item) => (
          <MenuItem key={item?._id} value={item?._id}>
            <Checkbox checked={selectedServices?.indexOf(item?._id) > -1} />
            <ListItemText primary={item?.serviceName} />
          </MenuItem>
        ))}
      </Select>

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
