import { MailIcon, User } from "lucide-react";
import React from "react";

const InputBox = ({
  type = "text",
  label,
  name,
  value,
  placeholder,
  icon,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className="">
      {/* <label className="lablel">
        <span className=" label-text font-medium">{label} :</span>
      </label> */}
      <div className="relative mt-1 mb-4">
        <div
          className="absolute z-20  pl-2 top-[0.7rem]
        flex items-center justify-center pointer-events-none"
        >
          {icon === "user" ? (
            <User className="size-5 text-base-content/40" />
          ) : (
            <MailIcon className="size-5 text-base-content/40" />
          )}
          {/* <User size={22} className="absolute top-2 left-2" /> */}
        </div>
        <input
          type={type === "text" ? "text" : "email"}
          className={`input input-bordered w-full pl-10 hover:outline-none focus-within:outline-none bg-transparent placeholder:text-zinc-400`}
          placeholder={placeholder}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default InputBox;
