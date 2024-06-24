import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

function App() {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  const [room, setRoom] = useState(null);
  

  // Kullanıcının yetkisi yoksa: login sayfasına git
  if (!isAuth) {
    return <LoginPage setIsAuth={setIsAuth} />;
  }

  // Kullanıcının yetkisi varsa: 
  return (
    <div className="container">
      {room ? (
        // Oda seçildiyse: Sohbete
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        // Oda seçilmesiyse: Oda seçme sayfasına
        <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
      )}
    </div>
  );
}

export default App;
