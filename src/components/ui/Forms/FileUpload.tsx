import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CloudUpload } from "lucide-react"; // Using lucide-react for the icon, similar to CloudUploadIcon

type TProps = {
  name: string;
  label?: string;
};

export default function PHFileUploader({ name, label }: TProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <label
            className="flex items-center gap-x-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
          >
            <CloudUpload className="w-5 h-5" />
            {label || "Upload file"}
            <input
              {...field}
              type="file" // Set file as the type instead of name
              value={value?.fileName}
              onChange={(e) =>
                onChange((e?.target as HTMLInputElement).files?.[0])
              }
              className="hidden"
            />
          </label>
        );
      }}
    />
  );
}