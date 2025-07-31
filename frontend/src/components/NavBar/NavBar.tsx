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
  IconUserCog,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import classes from "./NavBar.module.css";
import { useKeycloak } from "@/keycloak/keycloakContext";

export function NavBar() {
  const [userId, setUserId] = useState<string | null>(null);
  const keycloak  = useKeycloak();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") ?? "0";
    setUserId(storedUserId);
  }, []);

  const data = [
    { link: `/profile/${userId}`, label: "Profile", icon: IconUser },
    { link: "/timeline", label: "Timeline", icon: IconTimeline },
    { link: "/notifications", label: "Notifications", icon: IconBellRinging },
    { link: "/bookmarks", label: "Bookmarks", icon: IconReceipt2 },
    { link: "/settings", label: "Settings", icon: IconSettings },
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

  const handleLogout = async () => {
    try {
      await keycloak.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleManageAccount = async () => {
    try {
      await keycloak.accountManagement();
    } catch (error) {
      console.error("Failed to open manage account:", error);
    }
  };

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
        <button onClick={handleManageAccount} className={classes.anyButton}>
          <IconUserCog className={classes.linkIcon} stroke={1.5} />
          <span>Manage account</span>
        </button>

        <NavLink to="/change-account" className={classes.link}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </NavLink>

        <button onClick={handleLogout} className={classes.anyButton}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}