// import React from "react";
// import { Menu, Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import logoimage from "../../assets/Logo.png";
// import {
//   HomeOutlined,
//   UsergroupDeleteOutlined,
//   FileOutlined,
//   BookOutlined,
//   VideoCameraOutlined,
//   VideoCameraAddOutlined,
// } from "@ant-design/icons";
// import Cookies from "js-cookie";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   // Retrieve the user's role from cookies
//   const role = Cookies.get("role");
//   console.log("Role:", role);

//   const handleLogout = () => {
//     Cookies.remove("role");
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Logo Section */}
//       <div className="logo">
//         <img
//           src={logoimage}
//           alt="Logo"
//           style={{
//             marginTop: "20px",
//             marginBottom: "20px",
//             marginLeft: "70px",
//             width: "100%",
//             maxWidth: "100px", // Controls max size of logo
//             height: "auto",
//           }}
//         />
//       </div>

//       <Menu
//         mode="inline"
//         defaultSelectedKeys={["1"]}
//         style={{ height: "100%", borderRight: 0, paddingTop: "70px" }}
//         onClick={({ key }) => navigate(key)}
//       >
//         {role === "user" && (
//           <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
//             Dashboard
//           </Menu.Item>
//         )}
//         {/* Users - Visible only to admin */}
//         {role === "user" && (
//           <Menu.Item key="/manage-users" icon={<UsergroupDeleteOutlined />}>
//             Users
//           </Menu.Item>
//         )}
//         {/* Articles - Visible to admin and content roles */}
//         {(role === "admin" || role === "content") && (
//           <Menu.Item key="/manage-articles" icon={<FileOutlined />}>
//             Articles
//           </Menu.Item>
//         )}
//         {/* Magazines - Visible only to admin */}
//         {(role === "admin" || role === "content") && (
//           <Menu.Item key="/manage-magazines1" icon={<BookOutlined />}>
//             March of karnataka
//           </Menu.Item>
//         )}{" "}
//         {(role === "admin" || role === "content") && (
//           <Menu.Item key="/manage-magazines2" icon={<BookOutlined />}>
//             Varthe janapada
//           </Menu.Item>
//         )}{" "}
//         {/* {(role === "admin" || role === "content") && (
//           <Menu.Item key="/manage-category" icon={<BookOutlined />}>
//             Category
//           </Menu.Item>
//         )} */}
//         {(role === "admin" || role === "content") && (
//           <Menu.Item key="/manage-banners" icon={<BookOutlined />}>
//             Banners
//           </Menu.Item>
//         )}
//         {(role === "admin" || role === "content") && (
//           <Menu.Item key="/manage-shortvideos" icon={<VideoCameraOutlined />}>
//             Short Videos
//           </Menu.Item>
//         )}
//         {(role === "admin" || role === "content") && (
//           <Menu.Item key="/manage-longvideo" icon={<VideoCameraAddOutlined />}>
//             Long Videos
//           </Menu.Item>
//         )}{" "}
//         {(role === "admin" || role === "content") && (
//           <Menu.Item
//             key="/manage-notifications"
//             icon={<VideoCameraAddOutlined />}
//           >
//             Notifications
//           </Menu.Item>
//         )}
//         {role === "admin" || role === "moderator" ? (
//           <Menu.Item key="/manage-moderation" icon={<VideoCameraAddOutlined />}>
//             Moderation
//           </Menu.Item>
//         ) : null}
//         {/* Logout Button */}
//         <Menu.Item key="login">
//           <Button
//             type="primary"
//             style={{
//               width: "100%",
//               marginTop: "0px",
//               backgroundColor: "#ff4d4f",
//               borderColor: "#ff4d4f",
//             }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </Menu.Item>
//       </Menu>
//     </>
//   );
// };


import React from "react";
import { Menu, Button, Modal } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import logoimage from "../../assets/Logo.png";
import {
  HomeOutlined,
  UsergroupDeleteOutlined,
  FileOutlined,
  BookOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const role = localStorage.getItem("role");
  const isAdminOrModerator = role === "admin" || role === "moderator";
  const isContentRole = role === "content";
  const canViewContent = isAdminOrModerator || isContentRole;

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      okType: "danger",
      centered: true,
      onOk: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      },
    });
  };

  return (
    <>
      {/* Logo Section */}
      <div className="logo">
        <img
          src={logoimage}
          alt="Logo"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "70px",
            width: "100%",
            maxWidth: "100px",
            height: "auto",
          }}
        />
      </div>

      <Menu
        mode="inline"
        selectedKeys={[currentPath]}
        style={{ height: "100%", borderRight: 0, paddingTop: "70px" }}
        onClick={({ key }) => {
          if (key !== "login") navigate(key);
        }}
      >
        {isAdminOrModerator && (
          <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
        )}

        {isAdminOrModerator && (
          <Menu.Item key="/manage-users" icon={<UsergroupDeleteOutlined />}>
            Users
          </Menu.Item>
        )}

        {canViewContent && (
          <>
            <Menu.Item key="/manage-articles" icon={<FileOutlined />}>
              Articles
            </Menu.Item>
            <Menu.Item key="/manage-magazines1" icon={<BookOutlined />}>
              March of Karnataka
            </Menu.Item>
            <Menu.Item key="/manage-magazines2" icon={<BookOutlined />}>
              Vartha Janapada
            </Menu.Item>
            <Menu.Item key="/manage-banners" icon={<BookOutlined />}>
              Banners
            </Menu.Item>
            <Menu.Item key="/manage-shortvideos" icon={<VideoCameraOutlined />}>
              Short Videos
            </Menu.Item>
            <Menu.Item key="/manage-longvideo" icon={<VideoCameraAddOutlined />}>
              Long Videos
            </Menu.Item>
            <Menu.Item key="/manage-notifications" icon={<VideoCameraAddOutlined />}>
              Notifications
            </Menu.Item>
          </>
        )}

        {isAdminOrModerator && (
          <Menu.Item key="/manage-moderation" icon={<VideoCameraAddOutlined />}>
            Moderation
          </Menu.Item>
        )}

        <Menu.Item key="login">
          <Button
            type="primary"
            style={{
              width: "100%",
              backgroundColor: "#ff4d4f",
              borderColor: "#ff4d4f",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Sidebar;
