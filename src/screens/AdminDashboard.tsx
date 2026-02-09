import React, { useState, useEffect } from 'react';

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [verifyingToken, setVerifyingToken] = useState(false);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'MAP' | 'DRIVERS' | 'REVENUE' | 'MSG'>('DRIVERS');

    const [drivers, setDrivers] = useState<any[]>([]);
    const [revenue, setRevenue] = useState<{ labels: string[], values: number[] } | null>(null);

    const simulateBiometric = () => {
        setLoading(true);
        setTimeout(() => {
            setAuthenticated(true);
            setLoading(false);
        }, 1200);
    };

    const handleTokenSubmit = () => {
        if (token === 'Secure-Token-777') {
            setVerifyingToken(true);
            fetchAllData();
        } else {
            alert('Invalid Access Token');
        }
    };

    const fetchAllData = async () => {
        try {
            const drvRes = await fetch('http://localhost:8000/admin/drivers');
            const drvData = await drvRes.json();
            setDrivers(drvData);

            const revRes = await fetch('http://localhost:8000/admin/revenue');
            const revData = await revRes.json();
            setRevenue(revData);
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

    const approveDriver = async (id: string, status: 'approved' | 'rejected') => {
        await fetch('http://localhost:8000/admin/approve-driver', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ driver_id: id, status })
        });
        fetchAllData();
    };

    const sendMessage = async (id: string) => {
        const msg = prompt('Enter message for driver:');
        if (!msg) return;
        await fetch('http://localhost:8000/admin/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ driver_id: id, message: msg })
        });
        alert('Message Sent to Line!');
    };

    if (!authenticated) {
        return (
            <div className="main-container" style={{ background: '#000', textAlign: 'center' }}>
                <div className="glass-card" style={{ border: '2px solid #D4AF37' }}>
                    <h1 style={{ color: '#D4AF37', marginBottom: '20px' }}>CEO Command Center</h1>
                    <div style={{ fontSize: '4rem', marginBottom: '30px' }}>🔐</div>
                    <p style={{ color: '#fff', marginBottom: '40px' }}>Biometric Scan Required</p>
                    <button className="btn-primary" onClick={simulateBiometric} disabled={loading}>
                        {loading ? 'Scanning...' : 'Start Biometric Scan'}
                    </button>
                    <button onClick={onBack} style={{ marginTop: '20px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>Cancel</button>
                </div>
            </div>
        );
    }

    if (!verifyingToken) {
        return (
            <div className="main-container" style={{ background: '#000', textAlign: 'center' }}>
                <div className="glass-card" style={{ border: '2px solid #D4AF37' }}>
                    <h1 style={{ color: '#D4AF37', marginBottom: '20px' }}>Encrypted Access</h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>Security Token 777 Required</p>
                    <input
                        type="password"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid #D4AF37', borderRadius: '12px', color: '#fff', textAlign: 'center', marginBottom: '20px' }}
                    />
                    <button className="btn-primary" onClick={handleTokenSubmit}>Verify Token</button>
                </div>
            </div>
        );
    }

    return (
        <div className="main-container" style={{ display: 'block', padding: '10px', background: '#020202' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', color: '#D4AF37' }}>
                <span style={{ fontWeight: 800 }}>CMD CENTER v2.0</span>
                <button onClick={onBack} style={{ background: '#222', color: '#fff', padding: '5px 12px', borderRadius: '6px', border: 'none', fontSize: '0.7rem' }}>Logoff</button>
            </div>

            {/* Sidebar/Top Tabs */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', overflowX: 'auto', padding: '5px' }}>
                {(['MAP', 'DRIVERS', 'REVENUE', 'MSG'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            padding: '10px 5px',
                            background: activeTab === tab ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                            color: activeTab === tab ? '#000' : '#888',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '0.7rem',
                            fontWeight: activeTab === tab ? 700 : 400
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div style={{ minHeight: '60vh' }}>
                {activeTab === 'MAP' && (
                    <div className="glass-card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div style={{ width: '100%', height: '300px', background: '#111', borderRadius: '12px', border: '1px solid #333', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#D4AF37' }}>📍 Live Phuket Map (Simulated)</div>
                            {/* Mini Dots representing drivers */}
                            <div style={{ position: 'absolute', top: '30%', left: '40%', width: '10px', height: '10px', background: '#D4AF37', borderRadius: '50%', boxShadow: '0 0 10px #D4AF37' }}></div>
                            <div style={{ position: 'absolute', top: '60%', left: '70%', width: '10px', height: '10px', background: '#D4AF37', borderRadius: '50%', boxShadow: '0 0 10px #D4AF37' }}></div>
                        </div>
                        <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#888' }}>Realtime GPS Tracking: Passive</p>
                    </div>
                )}

                {activeTab === 'DRIVERS' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {drivers.map(d => (
                            <div key={d.driver_id} className="glass-card" style={{ padding: '15px', borderRadius: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: '#D4AF37', fontWeight: 700 }}>{d.fullName}</span>
                                    <span style={{
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.6rem',
                                        background: d.status === 'pending' ? '#ff9800' : d.status === 'approved' ? '#4caf50' : '#f44336',
                                        color: '#fff'
                                    }}>{d.status.toUpperCase()}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '15px' }}>
                                    {d.vehicleType} • {d.phone}
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {d.status === 'pending' && (
                                        <>
                                            <button onClick={() => approveDriver(d.driver_id, 'approved')} style={{ flex: 1, padding: '8px', background: '#4caf50', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.7rem' }}>Approve</button>
                                            <button onClick={() => approveDriver(d.driver_id, 'rejected')} style={{ flex: 1, padding: '8px', background: '#f44336', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.7rem' }}>Reject</button>
                                        </>
                                    )}
                                    <button onClick={() => sendMessage(d.driver_id)} style={{ flex: 1, padding: '8px', background: 'rgba(212, 175, 55, 0.2)', border: '1px solid #D4AF37', borderRadius: '8px', color: '#D4AF37', fontSize: '0.7rem' }}>Message</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'REVENUE' && revenue && (
                    <div className="glass-card" style={{ padding: '20px' }}>
                        <h3 style={{ color: '#D4AF37', marginBottom: '20px', fontSize: '0.9rem' }}>Weekly Revenue Trend</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '10px', borderBottom: '1px solid #333' }}>
                            {revenue.values.map((v, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '100%', height: `${(v / 6000) * 100}%`, background: 'linear-gradient(to top, #D4AF37, #af8d1a)', borderRadius: '4px 4px 0 0' }}></div>
                                    <span style={{ fontSize: '0.6rem', color: '#666', marginTop: '5px' }}>{revenue.labels[i]}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800 }}>$20,950</span>
                            <p style={{ fontSize: '0.7rem', color: '#4caf50' }}>▲ 12.5% vs last week</p>
                        </div>
                    </div>
                )}

                {activeTab === 'MSG' && (
                    <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💬</div>
                        <h3 style={{ color: '#D4AF37', marginBottom: '10px' }}>Line Official Hub</h3>
                        <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '20px' }}>Manage all driver communications from one central terminal.</p>
                        <button className="btn-primary" style={{ width: 'auto', padding: '12px 25px' }}>Open Master Chat</button>
                    </div>
                )}
            </div>

            {/* Bottom Status Bar */}
            <div style={{ marginTop: '20px', borderTop: '1px solid #222', padding: '15px 5px', display: 'flex', justifyContent: 'space-between', color: '#444', fontSize: '0.6rem' }}>
                <span>DB: CLOUD_MASTER_READY</span>
                <span>ENC: AES-256-CMD</span>
            </div>
        </div>
    );
};

export default AdminDashboard;
