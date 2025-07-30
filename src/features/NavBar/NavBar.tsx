import Link from "../../ui/Link/Link";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="content">
        <img src="/images/logo.svg" alt="logo" />
        <div className="buttons">
          <Link href="#users" label="Users" />
          <Link href="#sign-up" label="Sign up" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
