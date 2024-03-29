const Error = ({ children, ...props }) => {
  return (
    <div
      className=""
      style={{ color: "#FF0000", textAlign: "center", margin: "0.9rem 0" }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Error;
