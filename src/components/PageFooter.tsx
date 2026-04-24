import React from 'react';
import { Icon } from '../components/Icon';

const PageFooter: React.FC = () => {
    return (
        <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 32px', marginTop: 'auto', background: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                    <Icon icon="" style={{ fontSize: 18 }} />
                    <p style={{ fontSize: '13px', margin: 0 }}>© 2024 Transcription Certification Institute. All rights reserved.</p>
                </div>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <a style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} href="#">Help Center</a>
                    <a style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} href="#">Terms of Service</a>
                    <a style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }} href="#">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default PageFooter;
