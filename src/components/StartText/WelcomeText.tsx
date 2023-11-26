import startLogo from "../../../public/welcome_logo.svg";

const WelcomeText = () => {
  return (
    <div className="welcome_block">
      <img src={startLogo} alt="welcome_logo" className="welocme_img" />
      <p className="welcome_text">
        Start with searching a <br /> GitHub User
      </p>
    </div>
  );
};

export default WelcomeText;
