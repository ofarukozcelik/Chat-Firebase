import {
    addDoc,
    collection,
    onSnapshot,
    serverTimestamp,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import Message from "../components/Message";


const ChatPage = ({ room, setRoom }) => {
    const [messages, setMessages] = useState();
    const lastMsg = useRef();

    // Form gönderilince
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mesajın ekleneceği kolleksiyonun referansını al
        const messagesCol = collection(db, "messages");

        // Kolleksiyona döküman ekle
        await addDoc(messagesCol, {
            room,
            text: e.target[0].value,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL,
            },
            createdAt: serverTimestamp(),
        });

        // Son mesaja kaydır
        lastMsg.current.scrollIntoView({ behavior: "smooth" });

        // Formu sıfırla
        e.target.reset();
    };

    // Mevcut odada gönderilen mesajları anlık olarak al
    useEffect(() => {
        // Abone olunacak kolleksiyonun referansını al
        const messagesCol = collection(db, "messages");

        // Sorgu ayarlarını yap
        const q = query(
            messagesCol,
            where("room", "==", room),
            orderBy("createdAt", "asc")
        );

        onSnapshot(q, (snaphot) => {
           console.log(snaphot.docs)
            let tempMsg = [];

            // Dökümanların içerisindeki veriye eriş ve geçici diziye aktar
            snaphot.docs.forEach((doc) => tempMsg.push(doc.data()));

            // State güncelle
            setMessages(tempMsg);
        });
    }, []);

    return (
        <div className="chat-page">
            <header>
                <p>{auth.currentUser.displayName}</p>
                <p>{room}</p>
                <button onClick={() => setRoom(null)}>Farklı Oda</button>
            </header>

            <main>
                {!messages ? (
                    <p>Sohbete ilk mesajı gönderin</p>
                ) : (
                    messages.map((data, i) => <Message data={data} key={i} />)
                )}

                <div ref={lastMsg} />
            </main>

            <form onSubmit={handleSubmit}>
                <input placeholder="mesajınızı yazınız.." type="text" required />
                <button>Gönder</button>
            </form>
        </div>
    );
};

export default ChatPage;
