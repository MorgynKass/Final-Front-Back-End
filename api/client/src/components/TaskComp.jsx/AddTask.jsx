/* eslint-disable no-unused-vars */
"react-router-dom";
import { queryClient } from "../../constants/config";
import { useCreateTask } from "../../queries/tasks";
import { useSingleTask } from "../../queries/tasks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IoIosAddCircleOutline } from "react-icons/io";

const CreateTask = () => {
  const { mutate: createtask, isLoading: loading } = useCreateTask();

  function refreshPage() {
    window.location.reload();
  }

  const schema = z.object({
    task: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValidating: validating },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="add-task-container" >
      <form className="add-form"
        action="submit"
        onSubmit={handleSubmit((d) =>
          createtask(d, {
            onSuccess: () => {
              queryClient.invalidateQueries("singleTask");
            },
          })
        )}
      >
        <div>
          <input
            type="text"
            className="add-input"
            placeholder="Add Task"
            {...register("task")}
          />
          <button className="add-btn" onClick={refreshPage}>
            <IoIosAddCircleOutline className="add-icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
