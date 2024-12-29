import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createProductDefaultValues,
  createProductFormSchema,
  CreateProductSchema,
} from "../../schemas/CreateProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateProduct = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateProductSchema>({
    mode: "all",
    resolver: zodResolver(createProductFormSchema),
    defaultValues: createProductDefaultValues,
  });

  const onSubmit: SubmitHandler<CreateProductSchema> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        backgroundColor: "lightgray",
        borderRadius: "5px",
        marginTop: "30px",
        maxWidth: "500px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem"
      }}
    >
      <TextField
        {...register("name")}
        label="Name"
        helperText={errors.name?.message}
        error={!!errors.name}
        sx={{
          width: "100%",
        }}
      />
      <TextField
        {...register("description")}
        label="Full description"
        multiline
        minRows={2}
        maxRows={4}
        helperText={errors.description?.message}
        error={!!errors.description}
        sx={{
          width: "100%",
        }}
      />
      <TextField
        {...register("price", { valueAsNumber: true })} 
        label="Price"
        type="number"
        helperText={errors.price?.message}
        error={!!errors.price}
        sx={{
          width: "100%",
        }}
      />
      <TextField
        {...register("quantity", { valueAsNumber: true })} 
        label="quantity"
        type="number"
        helperText={errors.quantity?.message}
        error={!!errors.quantity}
        sx={{
          width: "100%",
        }}
      />
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Box>
  );
};

export default CreateProduct;
