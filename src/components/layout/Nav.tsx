import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Landing</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/example">Examples</Link>
          </li>
          <li>
            <Link to="/schedule/detail">일정 상세 보기</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
