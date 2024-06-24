import React from "react";

const RoomPage = ({ setIsAuth, setRoom }) => {
    // Çıkış yap
    const logout = () => {
        // Yetkiyi false yap
        setIsAuth(false);

        // Local temizle
        localStorage.removeItem("token");
    };

    // Form gönderilince
    const handleSubmit = (e) => {
        e.preventDefault();

        const room = e.target[0].value.trim().toLowerCase();
        

        setRoom(room);
    };

    return (
        <form onSubmit={handleSubmit} className="room-page">
            <h1>Chat Odası</h1>
            <p>Hangi Odaya Gireceksiniz</p>

            <input placeholder=" Ör : Haftasonu" type="text" required />

            <button type="submit">Odaya Gir</button>
            <button onClick={logout} type="button">
                Çıkış Yap
            </button>
        </form>
    );
};

export default RoomPage;
