import Select from "react-select";

const customStyles = (width: string) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    width: width,
    borderShadow: "none",
    textAlign: "left",
    padding: "10px",
    boxShadow: provided.boxShadow,
    borderColor: state.isFocused ? "transparent" : provided.borderColor,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "black" : "grey",
    backgroundColor: state.isSelected ? "#ECF1F7" : state.isFocused ? "#ECF1F7" : "white",
    fontSize: "14px",
    lineHeight: "20px",
  }),
});

export default function ReactSelect({ options, setOptionPicked, placeholder, width = "220px" }: any) {
  return (
    <Select
      options={options}
      styles={customStyles(width)}
      onChange={(option) => setOptionPicked(option)}
      placeholder={placeholder}
    />
  );
}
