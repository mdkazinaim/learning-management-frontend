


const Header = ({title, description} : {title: string, description?: string}) => {
  return (
    <div className="space-y-2">
      <h1 className="tracking-wide uppercase">{title}</h1>
      <h6 className="text-secondary-text font-normal tracking-wide">{description}</h6>
    </div>
  );
};

export default Header;