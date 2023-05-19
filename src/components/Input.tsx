import clsx from "clsx";
import { ComponentPropsWithRef, forwardRef } from "react";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
}

const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className='flex flex-col mx-4 my-2' ref={ref}>
        {label && <label className='mb-2'>{label}</label>}
        <input
          {...props}
          className={clsx(
            "px-4 py-2 border border-gray-300 shadow-md rounded-md ",
            props.className
          )}
        />
      </div>
    );
  }
);

export { Input };
