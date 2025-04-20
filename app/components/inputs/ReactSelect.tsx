import Select from "react-select";

const customStyles = (
  padding: string,
  backgroundColor: string,
  borderRadius: string,
  border: string
) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    width: "100%",
    borderShadow: "none",
    textAlign: "left",
    backgroundColor,
    padding,
    borderRadius,
    border,
    fontSize: "14px",
    borderColor: state.isFocused ? "transparent" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px #16a34a" : "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "black" : "grey",
    backgroundColor: state.isSelected
      ? "#ECF1F7"
      : state.isFocused
      ? "#ECF1F7"
      : "white",
    fontSize: "14px",
    lineHeight: "20px",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#94A3B8",
  }),
});

export default function ReactSelect({ options, placeholder, onChange, value, padding="10px", backgroundColor = "#ffffff", borderRadius="none", border="1px solid #cbd5e1 " }: any) {
  return (
    <Select
      options={options}
      styles={customStyles(padding, backgroundColor, borderRadius, border)}
      onChange={(option) => {
        onChange(option);
      }}
      placeholder={placeholder}
      value={value}
    />
  );
}
