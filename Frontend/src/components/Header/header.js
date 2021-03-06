import "./header.css";

const Header = () => {
  return (
    <div className="header container-fluid mt-5">
      <div className="headerTitles ">
        <span className="headerTitleSm">Frontend with React js</span>
        <span className="headerTitleLg">Tech Blogs</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
};

export default Header;
