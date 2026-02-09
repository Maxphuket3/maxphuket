import React, { useState, useEffect, useRef } from 'react';

const MOCK_MESSAGES = [
    { id: 1, user: 'Traveler_Kim', text: 'Just arrived at Patong Beach! The sunset is amazing today.', time: '10:30 PM', type: 'user' },
    { id: 2, user: 'Phuket_Lover', text: 'Is it raining in Old Town? Planning to go there now.', time: '10:32 PM', type: 'user' },
    { id: 3, user: 'Manager_Lee', text: 'No rain in Old Town! Perfect weather for the Sunday market.', time: '10:33 PM', type: 'admin' },
];

const LiveTalk = () => {
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simulate incoming messages
    useEffect(() => {
        const interval = setInterval(() => {
            const randomMsgs = [
                "Anyone doing the Phi Phi tour tomorrow?",
                "Found a great Pad Thai place near Jungceylon!",
                "What's the exchange rate at the airport today?",
                "Traffic is a bit heavy near Chalong circle.",
                "The water visibility at Racha Island is crystal clear!"
            ];
            const randomUser = ['ProTraveler', 'Busan_Guy', 'Seoul_Sister', 'Diver_Park'];

            const newMsg = {
                id: Date.now(),
                user: randomUser[Math.floor(Math.random() * randomUser.length)],
                text: randomMsgs[Math.floor(Math.random() * randomMsgs.length)],
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                type: 'user'
            };

            if (Math.random() > 0.7) { // 30% chance to add a message every 5s
                setMessages(prev => [...prev, newMsg]);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const myMsg = {
            id: Date.now(),
            user: 'Me',
            text: inputText,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            type: 'me'
        };

        setMessages(prev => [...prev, myMsg]);
        setInputText('');
    };

    return (
        <div className="page-livetalk" style={{
            maxWidth: '600px',
            margin: '2rem auto',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden'
        }}>
            {/* Chat Header */}
            <div style={{
                padding: '1.5rem',
                background: 'var(--gradient-ocean)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h2 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>Phuket Live Talk 💬</h2>
                    <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>{120 + Math.floor(Math.random() * 50)} Travelers Online</span>
                </div>
            </div>

            {/* Messages Area */}
            <div style={{
                flex: 1,
                padding: '1.5rem',
                overflowY: 'auto',
                backgroundColor: '#f5f7fa',
                backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        marginBottom: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.type === 'me' ? 'flex-end' : 'flex-start'
                    }}>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '4px', marginLeft: '4px' }}>
                            {msg.type !== 'me' && <strong>{msg.user}</strong>}
                        </div>
                        <div style={{
                            maxWidth: '80%',
                            padding: '0.8rem 1.2rem',
                            borderRadius: '16px',
                            borderTopLeftRadius: msg.type === 'me' ? '16px' : '2px',
                            borderTopRightRadius: msg.type === 'me' ? '2px' : '16px',
                            backgroundColor: msg.type === 'me' ? 'var(--color-primary)' : 'white',
                            color: msg.type === 'me' ? 'white' : '#333',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            position: 'relative'
                        }}>
                            {msg.text}
                            <span style={{
                                fontSize: '0.7rem',
                                color: msg.type === 'me' ? 'rgba(255,255,255,0.7)' : '#999',
                                display: 'block',
                                marginTop: '4px',
                                textAlign: 'right'
                            }}>
                                {msg.time}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} style={{
                padding: '1rem',
                backgroundColor: 'white',
                borderTop: '1px solid #eee',
                display: 'flex',
                gap: '0.5rem'
            }}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Share your Phuket story..."
                    style={{
                        flex: 1,
                        padding: '1rem',
                        borderRadius: '25px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        fontSize: '1rem'
                    }}
                />
                <button type="submit" style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    ➤
                </button>
            </form>
        </div>
    );
};

export default LiveTalk;
