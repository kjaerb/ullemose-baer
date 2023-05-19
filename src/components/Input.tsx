import clsx from "clsx";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className='flex flex-col mx-4 my-2'>
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
