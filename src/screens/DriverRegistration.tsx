import React, { useState } from 'react';

const DriverRegistration: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        vehicleType: 'Sedan',
        photo: null as File | null
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, photo: e.target.files[0] });
        }
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/register-driver', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    vehicleType: formData.vehicleType,
                    photoName: formData.photo?.name
                })
            });

            const result = await response.json();
            if (result.status === 'success') {
                alert(`Register Success!\nDriver ID: ${result.driver_id}`);
                onBack();
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('등록 중 오류가 발생했습니다. (Error connecting to DB)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container" style={{ background: 'linear-gradient(135deg, #0a192f, #000)', padding: '40px 20px' }}>
            <div className="glass-card" style={{ maxWidth: '600px', width: '100%', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ color: '#D4AF37', fontSize: '2.5rem', marginBottom: '8px', fontWeight: 700 }}>ลงทะเบียนคนขับ</h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>Driver Registration (Luxury-Dark-Gold)</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#D4AF37', fontWeight: 600 }}>ชื่อ-นามสกุล (Full Name) *</label>
                        <input
                            type="text"
                            required
                            placeholder="กรุณากรอกชื่อจริงและนามสกุล"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#D4AF37', fontWeight: 600 }}>เบอร์โทรศัพท์ (Phone) *</label>
                        <input
                            type="tel"
                            required
                            placeholder="0XX-XXX-XXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#D4AF37', fontWeight: 600 }}>ประเภทรถ (Vehicle Type)</label>
                        <select
                            value={formData.vehicleType}
                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(212, 175, 55, 0.2)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        >
                            <option value="Sedan">Sedan (รถเก๋ง)</option>
                            <option value="SUV">SUV (รถอเนกประสงค์)</option>
                            <option value="VIP Van">VIP Van (รถตู้ VIP)</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#D4AF37', fontWeight: 600 }}>รูปถ่ายรถและป้ายทะเบียน (Car & Plate Photo)</label>
                        <div style={{
                            border: '2px dashed rgba(212, 175, 55, 0.3)',
                            borderRadius: '16px',
                            padding: '30px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            {formData.photo ? (
                                <p style={{ color: '#D4AF37' }}>{formData.photo.name} เลือกแล้ว</p>
                            ) : (
                                <>
                                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📸</div>
                                    <p style={{ color: 'rgba(255,255,255,0.5)' }}>อัปโหลดรูปภาพที่นี่</p>
                                </>
                            )}
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '16px' }}>
                        <button type="button" onClick={onBack} style={{
                            flex: 1,
                            padding: '16px',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            borderRadius: '14px',
                            cursor: 'pointer'
                        }}>ยกเลิก (Cancel)</button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            style={{ flex: 2, marginTop: 0, opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'กำลังส่ง... (Submitting)' : 'ลงทะเบียนตอนนี้ (Register Now)'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DriverRegistration;
