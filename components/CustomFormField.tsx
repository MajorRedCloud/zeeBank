import React from "react";
import { FormField, FormLabel, FormMessage, FormControl, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { States } from "@/constants";

type Props = {
  form: any;
  name: string;
  label: string;
  placeholder: string;
};

const CustomFormField = ({ form, name, label, placeholder }: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <>
        {name == "state" ? (
          <FormItem>
              <FormLabel>
                <h1 className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                {label}
                </h1>
              </FormLabel>
              <div className="flex w-full flex-col min-w-[200px]">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state"
                    className="placeholder-text text-gray-500" // Modified line
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">
                 {States.map((state) => (
                    <SelectItem key={state} value={state} className="cursor-pointer">
                      {state}
                    </SelectItem>
                    ))}
                  
                </SelectContent>
              </Select>
              <FormMessage />
              </div>
            </FormItem>
        ) : (
          <div className="flex flex-col gap-1.5">
          <FormLabel>
            <h1 className="text-14 w-full max-w-[280px] font-medium text-gray-700">
              {label}
            </h1>
          </FormLabel>
          <div className="flex w-full flex-col min-w-[200px]">
            <FormControl>
                <Input
                placeholder={placeholder}
                className="text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                type={
                  name === "password"
                    ? "password"
                    : name === "email"
                    ? "email"
                    : "text"
                }
                {...field}
              />
            </FormControl>
            <FormMessage className="text-12 text-red-500 mt-2" />
          </div>
        </div>
        )}
        
      </>
      )}
    />
  );
};

export default CustomFormField;
