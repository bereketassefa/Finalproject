import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const Practice = (setImage) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (formData: any) => {
      const data = new FormData();
      data.append("coverimagee", formData.file);
      // Replace with your actual endpoint URL
      return fetch("http://localhost:3000/api/projects/uploadimages", {
        method: "POST",
        body: data,
      });
    },

    onError: (error: any) => {
      console.error(error);
      // Handle upload errors here (e.g., display error message)
    },
    onSuccess: () => {
      // Handle upload success here
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("file", { required: true })} />
      {errors.file && <span>This field is required</span>}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default Practice;
