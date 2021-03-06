// import Sidebar from "../../components/sidebar/sidebar";
import "./setting.css";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import axios from "axios";
import { Apikey, postPicApi } from "../../api";
import { toast } from "react-toastify";

const Setting = () => {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(Apikey + "/upload", data);
      } catch (err) {
        console.log("pic error ");
      }
    }
    try {
      const res = await axios.put(Apikey + "/users/" + user._id, updatedUser);
      setSuccess(true);
      await toast.success("Profile updated successfully.", {
        autoClose: 1200,
      });
      await dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      // window.location.replace("/");
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <>
      <div className="setting">
        <div className="settingWrapper">
          <div className="settingTitle">
            <span className="settingUpdateTitle">Update your Account</span>
          </div>

          <form className="settingForm" onSubmit={handleSubmit}>
            <label className="PP">Profile Picture</label>
            <div className="settingPP">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : postPicApi + user.profilePic
                }
                alt="userPic5"
              />

              <label htmlFor="fileInput">
                <i className="settingPpIcon far fa-user-circle"></i>
              </label>

              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>

            <input
              type="email"
              value={email}
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingSubmit" type="submit">
              Update
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
        {/* <Sidebar /> */}
      </div>
    </>
  );
};

export default Setting;
