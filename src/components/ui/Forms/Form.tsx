import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const Form = ({ children, onSubmit, resolver, defaultValues }: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    await onSubmit(data); // onSubmit is now called with correct data type
    reset(); // Reset the form after submission
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export default Form;