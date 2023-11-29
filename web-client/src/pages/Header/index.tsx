import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import { Menu, Layout, Typography, Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { WebClientLogout } from "../../services/webClient";

const { Header } = Layout;

const MenuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Configurações",
    icon: <SettingOutlined />,
    disabled: true,
  },
  {
    key: "2",
    label: "Sair",
    icon: <LogoutOutlined />,
    onClick: () => {
      WebClientLogout();
      window.location.href = "/login";
    },
  },
];

export default function AppHeader() {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="h-[30px] w-[200px] text-white flex items-center justify-center" >
      Biblitoeca Augusto Severo
        </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        className="w-full items-center justify-center"
      >
        {MenuItems.map((item) => (
          <Menu.Item key={item.title}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <Dropdown menu={{ items }} className="ml-auto mr-4 flex gap-4">
        <div
          className="ant-dropdown-link text-white flex items-center w-[150px]"
          onClick={(e) => e.preventDefault()}
        >
          Hello, user <DownOutlined />
        </div>
      </Dropdown>
    </Header>
  );
}
