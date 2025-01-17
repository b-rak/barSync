import { Link } from "react-router";

interface NavigationLinkProps {
  route: string,
  text: string
}

function NavigationLink({route, text}: NavigationLinkProps) {
  return (
    <>
      <Link to={route} className="nav-button">
        <p>{text}</p>
      </Link>
    </>
  );
}

export default NavigationLink;
