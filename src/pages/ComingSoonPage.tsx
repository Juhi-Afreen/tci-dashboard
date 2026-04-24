import React from 'react';
import { Icon } from '../components/Icon';
import DashboardLayout from '../layouts/DashboardLayout';
import PageBreadcrumb from '../components/PageBreadcrumb';

interface ComingSoonPageProps {
  title: string;
  icon: string;
  description?: string;
  breadcrumb?: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  title,
  icon,
  description = 'This feature is currently under development and will be available soon.',
  breadcrumb,
}) => {
  return (
    <DashboardLayout>
      <div
        className="page-content"
        style={{ padding: '28px 32px 40px' }}
      >
        <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {breadcrumb && (
            <PageBreadcrumb pageName={breadcrumb} />
          )}

          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid #E8EDEC',
              boxShadow: '0 2px 20px rgba(0,0,0,.05)',
              padding: '64px 48px',
              textAlign: 'center',
              marginTop: breadcrumb ? '24px' : '0',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#E8F5F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '36px', color: '#1F8F6D' }}
              >
                {icon}
              </span>
            </div>

            <h1
              style={{
                fontWeight: 700,
                fontSize: '22px',
                color: '#111827',
                marginBottom: '12px',
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: 1.7,
                maxWidth: '420px',
                margin: '0 auto 32px',
              }}
            >
              {description}
            </p>

            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#E8F5F1',
                border: '1.5px solid #1F8F6D',
                borderRadius: '100px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#1F8F6D',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                construction
              </span>
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComingSoonPage;
