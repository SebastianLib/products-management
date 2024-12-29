import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { createProductDefaultValues, createProductFormSchema, CreateProductSchema } from "../../schemas/CreateProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createProduct } from "../../redux/productSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.category);

  const onSubmit: SubmitHandler<CreateProductSchema> = (data) => {
    dispatch(createProduct(data)); 
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
        gap: "1rem",
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
        label="Quantity"
        type="number"
        helperText={errors.quantity?.message}
        error={!!errors.quantity}
        sx={{
          width: "100%",
        }}
      />
      <FormControl fullWidth error={!!errors.categoryId}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          {...register("categoryId", { valueAsNumber: true })}
          labelId="category-select-label"
          id="category-select"
          defaultValue=""
          sx={{
            width: "100%",
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="error">
          {errors.categoryId?.message}
        </Typography>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}  // Triggering form submission
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateProduct;
