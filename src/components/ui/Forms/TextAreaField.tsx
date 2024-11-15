import { Controller, useFormContext } from "react-hook-form";

type TTextareaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
};

const TextareaField = ({
  name,
  label,
  placeholder,
  required,
  className,
  defaultValue,
}: TTextareaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative text-left w-full ${className}`}>
          {label && (
            <label className="font-medium text-gray-700 text-sm">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <textarea
            {...field}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            rows={4}
            className={`mt-1 block w-full pl-3 pr-3 py-2.5 border ${
              error ? "border-red-500" : "border-gray-400"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            onChange={(e) => field.onChange(e.target.value)}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default TextareaField;