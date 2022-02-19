import React from "react";
import "../css/nav.css";

function Nav({radio , onChange, $Nav}) {
  return (
    <nav className={$Nav === "active" ? 'active' : 'passive'}>
      <div>
        <label htmlFor="depth_1">
          <input type="radio" name="depth" id="depth_1" checked={radio.selectedValue === "AboutMe"} value="AboutMe" onChange={onChange} />
          <span>About Me</span>
        </label>
      </div>
      <div>
        <label htmlFor="depth_2">
          <input type="radio" name="depth" id="depth_2" checked={radio.selectedValue === "Portfolio"} value="Portfolio" onChange={onChange} />
          <span>Portfolio</span>
        </label>
      </div>
      <div>
        <label htmlFor="depth_3">
          <input type="radio" name="depth" id="depth_3" checked={radio.selectedValue === "Blog"} value="Blog" onChange={onChange} />
          <span>Blog</span>
        </label>
      </div>
    </nav>
  );
}

export default Nav;
