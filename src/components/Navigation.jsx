import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-smoothie">New Smoothie</Link>
          </li>
          <li>
            <Link to="/smoothies">Smoothies</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
