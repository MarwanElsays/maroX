import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IconTimeline,
  IconBellRinging,
  IconUser,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import classes from "./NavBar.module.css";

export function NavBar() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") ?? "0";
    setUserId(storedUserId);
  }, []);

  const data = [
    { link: `/profile/${userId}`, label: "Profile", icon: IconUser },
    { link: "/timeline", label: "Timeline", icon: IconTimeline },
    { link: "/notifications", label: "Notifications", icon: IconBellRinging },
    { link: "/bookmarks", label: "Bookmarks", icon: IconReceipt2 },
    { link: "/settings", label: "Other Settings", icon: IconSettings },
  ];

  const links = data.map((item) => (
    <NavLink
      to={item.link}
      key={item.label}
      className={({ isActive }) =>
        `${classes.link} ${isActive ? classes.active : ""}`
      }
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <NavLink to="/change-account" className={classes.link}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </NavLink>

        <NavLink to="/logout" className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink>
      </div>
    </nav>
  );
}
