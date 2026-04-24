import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';

// ── Types ──────────────────────────────────────────────────────────────────────

type Tab = 'profile' | 'account' | 'notifications' | 'billing';

// ── Helpers ────────────────────────────────────────────────────────────────────

const Avatar: React.FC<{ initials: string; size?: number }> = ({ initials, size = 80 }) => (
    <div
        style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1F8F6D 0%, #2aa880 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: size * 0.35,
            fontWeight: 700,
            flexShrink: 0,
        }}
    >
        {initials}
    </div>
);

const SectionCard: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
    title,
    subtitle,
    children,
}) => (
    <div
        style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '28px 32px',
        }}
    >
        <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
            {subtitle && (
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>{subtitle}</p>
            )}
        </div>
        {children}
    </div>
);

const FormRow: React.FC<{
    label: string;
    hint?: string;
    children: React.ReactNode;
    cols?: 1 | 2;
}> = ({ label, hint, children, cols = 1 }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: cols === 2 ? '1fr 1fr' : '1fr',
            gap: 12,
            marginBottom: 20,
        }}
    >
        <div style={{ gridColumn: '1 / -1', marginBottom: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</label>
            {hint && <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '2px 0 0' }}>{hint}</p>}
        </div>
        {children}
    </div>
);

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid var(--border)',
    borderRadius: 8,
    fontSize: 14,
    color: 'var(--text-primary)',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
};

const Input: React.FC<
    React.InputHTMLAttributes<HTMLInputElement> & { fullWidth?: boolean }
> = ({ fullWidth, style, ...props }) => (
    <input style={{ ...inputStyle, ...(fullWidth ? { width: '100%' } : {}), ...style }} {...props} />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ style, children, ...props }) => (
    <select style={{ ...inputStyle, cursor: 'pointer', ...style }} {...props}>
        {children}
    </select>
);

const SaveBtn: React.FC<{ label?: string; onClick?: () => void }> = ({ label = 'Save Changes', onClick }) => (
    <button
        onClick={onClick}
        style={{
            background: 'var(--green)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 22px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
        }}
    >
        {label}
    </button>
);

const DangerBtn: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => (
    <button
        onClick={onClick}
        style={{
            background: '#fff',
            color: 'var(--rose)',
            border: '1px solid var(--rose)',
            borderRadius: 8,
            padding: '10px 22px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
        }}
    >
        {label}
    </button>
);

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        style={{
            width: 44,
            height: 24,
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            background: checked ? 'var(--green)' : '#D1D5DB',
            position: 'relative',
            transition: 'background .2s',
            flexShrink: 0,
        }}
    >
        <span
            style={{
                position: 'absolute',
                top: 3,
                left: checked ? 23 : 3,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left .2s',
                display: 'block',
            }}
        />
    </button>
);

const NotifRow: React.FC<{
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}> = ({ label, description, checked, onChange }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '14px 0',
            borderBottom: '1px solid var(--border)',
        }}
    >
        <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</p>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>{description}</p>
        </div>
        <Toggle checked={checked} onChange={onChange} />
    </div>
);

// ── Tab content components ─────────────────────────────────────────────────────

const ProfileTab: React.FC = () => {
    const [firstName, setFirstName] = useState('Jane');
    const [lastName, setLastName] = useState('Doe');
    const [email] = useState('jane.doe@email.com');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [timezone, setTimezone] = useState('America/New_York');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvDragOver, setCvDragOver] = useState(false);

    const handleCvFile = (file: File | null) => {
        if (!file) return;
        const allowed = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (allowed.includes(file.type)) setCvFile(file);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Avatar */}
            <SectionCard title="Profile Photo">
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <Avatar initials="JD" size={80} />
                    <div>
                        <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--text-secondary)' }}>
                            JPG, PNG or GIF · max 2 MB
                        </p>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button
                                style={{
                                    background: 'var(--green)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '8px 16px',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                Upload Photo
                            </button>
                            <button
                                style={{
                                    background: '#fff',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 8,
                                    padding: '8px 16px',
                                    fontSize: 13,
                                    cursor: 'pointer',
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </SectionCard>

            {/* Personal info */}
            <SectionCard title="Personal Information" subtitle="Update your name, bio, and contact details.">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                            First Name
                        </label>
                        <Input value={firstName} onChange={e => setFirstName(e.target.value)} fullWidth />
                    </div>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                            Last Name
                        </label>
                        <Input value={lastName} onChange={e => setLastName(e.target.value)} fullWidth />
                    </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                        Email Address
                    </label>
                    <Input value={email} disabled fullWidth style={{ background: '#F9FAFB', color: 'var(--text-secondary)' }} />
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>
                        To change your email, contact support.
                    </p>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                        Phone Number <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(optional)</span>
                    </label>
                    <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" fullWidth />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                        Bio <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(optional)</span>
                    </label>
                    <textarea
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        rows={3}
                        placeholder="Tell us a little about yourself..."
                        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                        Timezone
                    </label>
                    <Select value={timezone} onChange={e => setTimezone(e.target.value)}>
                        <option value="America/New_York">Eastern Time (ET) — UTC−5</option>
                        <option value="America/Chicago">Central Time (CT) — UTC−6</option>
                        <option value="America/Denver">Mountain Time (MT) — UTC−7</option>
                        <option value="America/Los_Angeles">Pacific Time (PT) — UTC−8</option>
                        <option value="America/Anchorage">Alaska Time (AKT) — UTC−9</option>
                        <option value="Pacific/Honolulu">Hawaii Time (HT) — UTC−10</option>
                        <option value="Europe/London">London (GMT) — UTC+0</option>
                        <option value="Europe/Paris">Central European (CET) — UTC+1</option>
                    </Select>
                </div>
                <SaveBtn />
            </SectionCard>

            {/* CV / Resume */}
            <SectionCard title="CV / Resume" subtitle="Upload your resume so employers on the job board can find you.">
                {/* Drop zone */}
                <div
                    onDragOver={e => { e.preventDefault(); setCvDragOver(true); }}
                    onDragLeave={() => setCvDragOver(false)}
                    onDrop={e => {
                        e.preventDefault();
                        setCvDragOver(false);
                        handleCvFile(e.dataTransfer.files[0] ?? null);
                    }}
                    style={{
                        border: `2px dashed ${cvDragOver ? 'var(--green)' : 'var(--border)'}`,
                        borderRadius: 10,
                        padding: '28px 20px',
                        textAlign: 'center',
                        background: cvDragOver ? 'var(--green-light)' : '#FAFAFA',
                        transition: 'border-color .15s, background .15s',
                        marginBottom: 16,
                    }}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 36, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}
                    >
                        upload_file
                    </span>
                    <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                        Drag & drop your CV here
                    </p>
                    <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--text-secondary)' }}>
                        PDF, DOC, or DOCX · max 5 MB
                    </p>
                    <label
                        style={{
                            display: 'inline-block',
                            background: 'var(--green)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '8px 18px',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Browse File
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            style={{ display: 'none' }}
                            onChange={e => handleCvFile(e.target.files?.[0] ?? null)}
                        />
                    </label>
                </div>

                {/* Current file */}
                {cvFile ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                            padding: '12px 16px',
                            background: 'var(--green-light)',
                            border: '1px solid #B6DDD4',
                            borderRadius: 8,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Icon icon="description" style={{ color: 'var(--green)', fontSize: 22 }} />
                            <div>
                                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {cvFile.name}
                                </p>
                                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>
                                    {(cvFile.size / 1024).toFixed(0)} KB · ready to save
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setCvFile(null)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--rose)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            title="Remove"
                        >
                            <Icon icon="delete" />
                        </button>
                    </div>
                ) : (
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
                        No CV uploaded yet.
                    </p>
                )}

                {cvFile && (
                    <div style={{ marginTop: 16 }}>
                        <SaveBtn label="Save CV" />
                    </div>
                )}
            </SectionCard>
        </div>
    );
};

const AccountTab: React.FC = () => {
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const pwStrength = (pw: string) => {
        if (!pw) return null;
        if (pw.length < 6) return { label: 'Too short', color: 'var(--rose)', pct: 20 };
        if (pw.length < 8) return { label: 'Weak', color: '#F59E0B', pct: 40 };
        const has = (r: RegExp) => r.test(pw);
        const score =
            (has(/[a-z]/) ? 1 : 0) +
            (has(/[A-Z]/) ? 1 : 0) +
            (has(/[0-9]/) ? 1 : 0) +
            (has(/[^a-zA-Z0-9]/) ? 1 : 0);
        if (score <= 2) return { label: 'Fair', color: '#F59E0B', pct: 55 };
        if (score === 3) return { label: 'Good', color: 'var(--green)', pct: 75 };
        return { label: 'Strong', color: 'var(--green)', pct: 100 };
    };

    const strength = pwStrength(newPw);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Change password */}
            <SectionCard title="Change Password" subtitle="Use a strong password with at least 8 characters.">
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                        Current Password
                    </label>
                    <Input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} fullWidth />
                </div>
                <div style={{ marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                        New Password
                    </label>
                    <Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} fullWidth />
                </div>
                {strength && (
                    <div style={{ marginBottom: 16 }}>
                        <div style={{ height: 4, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                            <div
                                style={{
                                    width: `${strength.pct}%`,
                                    height: '100%',
                                    background: strength.color,
                                    transition: 'width .3s',
                                }}
                            />
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: 12, color: strength.color, fontWeight: 600 }}>
                            {strength.label}
                        </p>
                    </div>
                )}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                        Confirm New Password
                    </label>
                    <Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} fullWidth />
                    {confirmPw && newPw !== confirmPw && (
                        <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--rose)' }}>Passwords do not match.</p>
                    )}
                </div>
                <SaveBtn label="Update Password" />
            </SectionCard>

            {/* Linked accounts */}
            <SectionCard title="Linked Accounts" subtitle="Sign in faster by linking your social accounts.">
                {[
                    { name: 'Google', icon: '🔵', linked: false },
                    { name: 'Facebook', icon: '🔷', linked: false },
                ].map(acct => (
                    <div
                        key={acct.name}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 0',
                            borderBottom: '1px solid var(--border)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 22 }}>{acct.icon}</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{acct.name}</span>
                        </div>
                        <button
                            style={{
                                background: acct.linked ? '#fff' : 'var(--green)',
                                color: acct.linked ? 'var(--text-secondary)' : '#fff',
                                border: acct.linked ? '1px solid var(--border)' : 'none',
                                borderRadius: 8,
                                padding: '7px 16px',
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            {acct.linked ? 'Unlink' : 'Link Account'}
                        </button>
                    </div>
                ))}
            </SectionCard>

            {/* Danger zone */}
            <SectionCard title="Danger Zone">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        padding: '16px',
                        background: '#FFF1F4',
                        border: '1px solid #FECDD3',
                        borderRadius: 10,
                    }}
                >
                    <div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--rose)' }}>Delete Account</p>
                        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9F1239' }}>
                            Permanently delete your account and all associated data. This cannot be undone.
                        </p>
                    </div>
                    <DangerBtn label="Delete Account" onClick={() => setShowDeleteModal(true)} />
                </div>
            </SectionCard>

            {/* Delete confirm modal */}
            {showDeleteModal && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.45)',
                        zIndex: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => setShowDeleteModal(false)}
                >
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: 14,
                            padding: '32px',
                            width: 420,
                            maxWidth: '90vw',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 style={{ margin: '0 0 8px', color: 'var(--rose)', fontSize: 18 }}>Delete Account?</h3>
                        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--text-secondary)' }}>
                            This action is irreversible. All your progress, certificates, and data will be permanently removed.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                style={{
                                    background: '#fff',
                                    border: '1px solid var(--border)',
                                    borderRadius: 8,
                                    padding: '9px 20px',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                }}
                            >
                                Cancel
                            </button>
                            <DangerBtn label="Yes, Delete" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const NotificationsTab: React.FC = () => {
    const [notifs, setNotifs] = useState({
        courseUpdates: true,
        quizReminders: true,
        gradePosted: true,
        newDiscussion: false,
        discussionReplies: true,
        jobAlerts: false,
        promotions: false,
        weeklyDigest: true,
        smsNotifs: false,
    });

    const toggle = (key: keyof typeof notifs) =>
        setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionCard title="Email Notifications" subtitle="Choose which emails you'd like to receive.">
                <NotifRow
                    label="Course Updates"
                    description="New lessons, materials, or announcements for your enrolled courses"
                    checked={notifs.courseUpdates}
                    onChange={() => toggle('courseUpdates')}
                />
                <NotifRow
                    label="Quiz & Assignment Reminders"
                    description="Reminders about upcoming quizzes or assignment due dates"
                    checked={notifs.quizReminders}
                    onChange={() => toggle('quizReminders')}
                />
                <NotifRow
                    label="Grade Posted"
                    description="Notification when a new grade or feedback is available"
                    checked={notifs.gradePosted}
                    onChange={() => toggle('gradePosted')}
                />
                <NotifRow
                    label="New Discussion Posts"
                    description="When someone posts a new question in the community forum"
                    checked={notifs.newDiscussion}
                    onChange={() => toggle('newDiscussion')}
                />
                <NotifRow
                    label="Replies to My Posts"
                    description="When someone replies to a discussion you started or commented on"
                    checked={notifs.discussionReplies}
                    onChange={() => toggle('discussionReplies')}
                />
                <NotifRow
                    label="Job Board Alerts"
                    description="New transcription job postings matching your profile"
                    checked={notifs.jobAlerts}
                    onChange={() => toggle('jobAlerts')}
                />
                <NotifRow
                    label="Promotions & Offers"
                    description="Discounts, course sales, and special announcements"
                    checked={notifs.promotions}
                    onChange={() => toggle('promotions')}
                />
                <div style={{ paddingTop: 14 }}>
                    <NotifRow
                        label="Weekly Digest"
                        description="A weekly summary of your activity and recommended content"
                        checked={notifs.weeklyDigest}
                        onChange={() => toggle('weeklyDigest')}
                    />
                </div>
            </SectionCard>

            <SectionCard title="SMS Notifications" subtitle="Receive text messages for critical updates only.">
                <NotifRow
                    label="SMS Notifications"
                    description="Get text alerts for grade postings and assignment deadlines"
                    checked={notifs.smsNotifs}
                    onChange={() => toggle('smsNotifs')}
                />
                {notifs.smsNotifs && (
                    <div style={{ marginTop: 14 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 6 }}>
                            Mobile Number
                        </label>
                        <Input placeholder="+1 (555) 000-0000" fullWidth />
                    </div>
                )}
            </SectionCard>
        </div>
    );
};

const BillingTab: React.FC = () => {
    const plan = {
        name: 'General + Legal Bundle',
        price: '$149.00',
        renewsOn: 'Jan 15, 2025',
        status: 'Active',
    };

    const invoices = [
        { id: 'INV-2024-003', date: 'Oct 15, 2024', amount: '$149.00', status: 'Paid' },
        { id: 'INV-2024-002', date: 'Jul 15, 2024', amount: '$149.00', status: 'Paid' },
        { id: 'INV-2024-001', date: 'Apr 15, 2024', amount: '$79.00', status: 'Paid' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Current plan */}
            <SectionCard title="Current Plan">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 16,
                        padding: '16px 20px',
                        background: 'var(--green-light)',
                        border: '1px solid #B6DDD4',
                        borderRadius: 10,
                        marginBottom: 16,
                    }}
                >
                    <div>
                        <p style={{ margin: 0, fontWeight: 700, color: 'var(--green)', fontSize: 15 }}>{plan.name}</p>
                        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                            Renews {plan.renewsOn} · {plan.price} one-time payment
                        </p>
                    </div>
                    <span
                        style={{
                            background: '#D1FAE5',
                            color: '#065F46',
                            fontSize: 12,
                            fontWeight: 700,
                            borderRadius: 20,
                            padding: '4px 12px',
                        }}
                    >
                        {plan.status}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        style={{
                            background: 'var(--green)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '9px 18px',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Upgrade Plan
                    </button>
                    <button
                        style={{
                            background: '#fff',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                            borderRadius: 8,
                            padding: '9px 18px',
                            fontSize: 13,
                            cursor: 'pointer',
                        }}
                    >
                        Cancel Plan
                    </button>
                </div>
            </SectionCard>

            {/* Payment method */}
            <SectionCard title="Payment Method" subtitle="Manage your saved payment methods.">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        padding: '14px 16px',
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        marginBottom: 14,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div
                            style={{
                                width: 44,
                                height: 28,
                                background: '#1A1F71',
                                borderRadius: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <span style={{ color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: 0.5 }}>VISA</span>
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                                •••• •••• •••• 4242
                            </p>
                            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>Expires 08 / 26</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button
                            style={{
                                background: '#fff',
                                border: '1px solid var(--border)',
                                borderRadius: 7,
                                padding: '6px 14px',
                                fontSize: 13,
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            Edit
                        </button>
                        <button
                            style={{
                                background: '#fff',
                                border: '1px solid #FECDD3',
                                borderRadius: 7,
                                padding: '6px 14px',
                                fontSize: 13,
                                cursor: 'pointer',
                                color: 'var(--rose)',
                            }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <button
                    style={{
                        background: '#fff',
                        color: 'var(--green)',
                        border: '1px dashed var(--green)',
                        borderRadius: 8,
                        padding: '9px 18px',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    + Add Payment Method
                </button>
            </SectionCard>

            {/* Invoice history */}
            <SectionCard title="Invoice History" subtitle="Download past receipts for your records.">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                {['Invoice', 'Date', 'Amount', 'Status', ''].map(h => (
                                    <th
                                        key={h}
                                        style={{
                                            textAlign: 'left',
                                            padding: '8px 12px 10px',
                                            color: 'var(--text-secondary)',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(inv => (
                                <tr key={inv.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px 12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                                        {inv.id}
                                    </td>
                                    <td style={{ padding: '12px 12px', color: 'var(--text-secondary)' }}>{inv.date}</td>
                                    <td style={{ padding: '12px 12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                                        {inv.amount}
                                    </td>
                                    <td style={{ padding: '12px 12px' }}>
                                        <span
                                            style={{
                                                background: '#D1FAE5',
                                                color: '#065F46',
                                                fontSize: 12,
                                                fontWeight: 700,
                                                borderRadius: 20,
                                                padding: '3px 10px',
                                            }}
                                        >
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 12px' }}>
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--green)',
                                                fontSize: 13,
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                padding: 0,
                                            }}
                                        >
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>
        </div>
    );
};

// ── Main component ─────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'account', label: 'Account & Security', icon: 'lock' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'billing', label: 'Billing', icon: 'credit_card' },
];

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('profile');

    return (
        <DashboardLayout>
            <div className="page-content" style={{ padding: '32px 32px 48px' }}>
                <main style={{ width: '100%', maxWidth: 1440, margin: '0 auto' }}>
                    {/* Breadcrumb */}
                    <PageBreadcrumb pageName="Settings" />

                    {/* Page header */}
                    <div style={{ marginBottom: 28 }}>
                        <h2
                            style={{
                                fontSize: 26,
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                margin: '0 0 4px',
                            }}
                        >
                            Settings
                        </h2>
                        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>
                            Manage your profile, security, notifications, and billing preferences.
                        </p>
                    </div>

                    {/* Layout: sidebar tabs + content */}
                    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                        {/* Tab sidebar */}
                        <div
                            style={{
                                width: 220,
                                flexShrink: 0,
                                background: '#fff',
                                border: '1px solid var(--border)',
                                borderRadius: 12,
                                overflow: 'hidden',
                            }}
                        >
                            {TABS.map((tab, i) => {
                                const active = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                            padding: '14px 18px',
                                            background: active ? 'var(--green-light)' : 'transparent',
                                            border: 'none',
                                            borderBottom:
                                                i < TABS.length - 1 ? '1px solid var(--border)' : 'none',
                                            borderLeft: active ? '3px solid var(--green)' : '3px solid transparent',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'background .15s',
                                        }}
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            style={{
                                                fontSize: 20,
                                                color: active ? 'var(--green)' : 'var(--text-secondary)',
                                            }}
                                        >
                                            {tab.icon}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 13,
                                                fontWeight: active ? 700 : 500,
                                                color: active ? 'var(--green)' : 'var(--text-primary)',
                                            }}
                                        >
                                            {tab.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content area */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {activeTab === 'profile' && <ProfileTab />}
                            {activeTab === 'account' && <AccountTab />}
                            {activeTab === 'notifications' && <NotificationsTab />}
                            {activeTab === 'billing' && <BillingTab />}
                        </div>
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
};

export default SettingsPage;
