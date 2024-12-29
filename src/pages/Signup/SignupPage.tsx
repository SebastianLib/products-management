import PageLayout from "../../components/PageLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, SignupValues, roleValues } from "../../schemas/SignupSchema";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/userSlicer";
import { AppDispatch, RootState } from "../../redux/store";


const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupValues>({
    resolver: zodResolver(formSchema), 
  });

  const onSubmit = (data: SignupValues) => {
    dispatch(createUser(data));
  };

  return (
    <PageLayout className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-10">Signup</h1>
      <form
        className="flex flex-col gap-6 max-w-[500px] w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className="border-2 border-black p-4 rounded-lg text-xl w-full"
            {...register("fullName")}
            placeholder="Full Name"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName.message}</span>
          )}
        </div>
        
        <div>
          <input
            className="border-2 border-black p-4 rounded-lg text-xl w-full"
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <input
            className="border-2 border-black p-4 rounded-lg text-xl w-full"
            {...register("otp")}
            placeholder="Password"
            type="password"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName.message}</span>
          )}
        </div>
        
        <div>
          <input
            className="border-2 border-black p-4 rounded-lg text-xl w-full"
            {...register("mobile")}
            placeholder="Phone"
          />
          {errors.mobile && (
            <span className="text-red-500 text-sm">{errors.mobile.message}</span>
          )}
        </div>
        
        <div>
          <select
            className="border-2 border-black p-4 rounded-lg text-xl w-full"
            {...register("role")}
            defaultValue={"customer"}
          >
            {roleValues.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <span className="text-red-500 text-sm">{errors.role.message}</span>
          )}
        </div>
        
        <button
          type="submit"
          className="bg-red-500 text-white py-4 text-xl font-bold"
        >
          {user.isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </PageLayout>
  );
};

export default SignupPage;
