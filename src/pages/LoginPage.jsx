import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = ({ setIsAuth }) => {
  // Butona tıklanınca
  const handleClick = () => {
    // Google ile giriş yap
    signInWithPopup(auth, provider)
      // Başarılı olursa:
      .then((res) => {
        // Yetkiyi true yap
        setIsAuth(true);

        // Locale tokeni kaydet
        localStorage.setItem("token", res.user.refreshToken);
      })
      // Başarısız olursa
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapınız</p>

        <button onClick={handleClick}>
          <img src="google.webp" />
          <span>Google ile Giriş Yap</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
