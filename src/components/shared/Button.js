const Button = ({ children, ...props }) => {
  return (
    <button className="button is-danger is-rounded m-4 p-4" {...props}>
      {children}
    </button>
  );
};

export default Button;
