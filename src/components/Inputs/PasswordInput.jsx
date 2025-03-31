import {
  Eye,
  EyeClosedIcon,
  EyeIcon,
  EyeOffIcon,
  Lock,
  LockIcon,
} from "lucide-react";
import React, { useState } from "react";

const PasswordInput = ({
  label,
  placeholder,
  name,
  value,
  handleChange,
  handleBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className=" form-control">
      {/* <label className="lablel mb-3">
        <span className=" label-text font-medium">{label} :</span>
      </label> */}
      <div className="relative mt-1 mb-4 ">
        <div
          className="absolute z-20  pl-2 top-[0.7rem]
        flex items-center justify-center pointer-events-none"
        >
          <LockIcon className="size-5" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className={`input input-bordered w-full pl-10 hover:outline-none focus-within:outline-none bg-transparent placeholder:text-zinc-400`}
          placeholder={placeholder || "password"}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div onClick={togglePassword} className="absolute right-3 top-2">
          {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
