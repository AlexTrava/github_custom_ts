import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { avatar, userName, name, follower, following, url } = useSelector(
    (state) => state.fetch.items
  );
  return (
    <div className="profile_card">
      <img src={avatar} alt="#" className="profile_img" />
      <h2 className="profile_name">{name}</h2>
      <a href={url} className="profile_link">
        {userName}
      </a>
      <div className="profile_info">
        <div className="profile_followers">
          <img src="#" alt="" className="profile_folowers_img" />
          <p className="followers">{follower} followers</p>
        </div>
        <div className="profile_following">
          <img src="" alt="" className="profile_following_img" />
          <p className="following">{following} following</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
