import "./profile.css";
import getData from "../redux/actions/getData";
import Store from "../redux/store";
import api from "../services/api.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Profile(id) {
  const [details, setDetails] = useState();
  useEffect(() => {
    api.get(`/savedgames/${id.id.id}`).then((response) => {
      details
        ? console.log(details)
        : setDetails({
            name: response.data.username,
            score: response.data.scores,
          });
      console.log(details, "details");
    });

    details ? Store.dispatch(getData(details)) : console.log("Hi");
  }, [details, id.id.id]);

  let x = useSelector((state) => state);

  return (
    <div className="text-center">
      <h3 className="text-light mt-2">Score Card</h3>
      <div className="d-flex flex-row m-3">
        <img
          src="https://res.cloudinary.com/dhbemnr0z/image/upload/v1623057755/first/WhatsApp_Image_2021-06-06_at_2.29.19_PM_cit1gk.jpg"
          alt=""
          height="100px"
          width="100px"
          className="image"
        />
        <div>
          <p className="text-light m-3">
            <b className="m-2">Name:</b>
            {x.name}
          </p>
          <p className="text-light m-3">
            <b className="m-2">Score:</b>
            {x.score}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Profile;
