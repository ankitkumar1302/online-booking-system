interface FormInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  theme: "light" | "dark";
}

export default function FormInput({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  theme
}: FormInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-3 rounded-lg text-sm transition-colors ${
        theme === "dark"
          ? "bg-white/5 text-white placeholder-white/40 focus:bg-white/10 border-0"
          : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-gray-50 border-0"
      }`}
    />
  );
} 