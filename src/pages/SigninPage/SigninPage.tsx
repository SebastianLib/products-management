import PageLayout from "../../components/PageLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, SigninValues } from "../../schemas/SigninSchema";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlicer";
import { AppDispatch, RootState } from "../../redux/store";


const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state);  
  
  const { register, handleSubmit, formState: { errors } } = useForm<SigninValues>({
    resolver: zodResolver(formSchema), 
  });

  const onSubmit = (data: SigninValues) => {
    dispatch(loginUser(data));
  };

  return (
    <PageLayout className="flex flex-col items-center justify-center ">
      <h1 className="text-5xl font-bold mb-10">Signin</h1>
      <form
        className="flex flex-col gap-6 max-w-[500px] w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        
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
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
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
