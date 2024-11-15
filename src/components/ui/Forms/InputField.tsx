import { Input } from "@/components/ui/Forms/input";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
};

const InputFeild = ({
  name,
  label,
  placeholder,
  type = "text",
  required,
  className,
  defaultValue,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative text-left w-full ${className}`}>
          {label && (
            <label
              className={`font-medium text-gray-700 text-sm
              }`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}

          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            onChange={(e) => {
              if (type === "number") {
                field.onChange(
                  e.target.value === "" ? undefined : Number(e.target.value)
                );
              } else {
                field.onChange(e);
              }
            }}
            className={`${
              error && "border-red-500"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default InputFeild;
