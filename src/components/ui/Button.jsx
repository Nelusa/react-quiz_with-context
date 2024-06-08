const Button = ({ onClick, children, className }) => {
  return (
    <div className={`btn ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
export default Button;
