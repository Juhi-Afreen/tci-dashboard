import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Course {
  id: string;
  name: string;
  desc: string;
  price: number;
  origPrice: number;
  img: string;
  bundle: boolean;
}

interface Addon {
  id: string;
  badge: string;
  badgeText: string;
  name: string;
  benefit: string;
  origPrice: number;
  price: number;
  img: string;
}

interface Coupon {
  type: 'percent' | 'fixed';
  value: number;
  label: string;
}

interface AppliedCoupon extends Coupon {
  code: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const COURSES: Record<string, Course> = {
  gt: { id: 'gt', name: 'General Transcription', desc: 'Master general transcription skills to build a diverse client base across industries.', price: 499, origPrice: 499, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg', bundle: false },
  lt: { id: 'lt', name: 'Legal Transcription', desc: 'Transcribe legal proceedings, depositions and court documents at premium rates.', price: 649, origPrice: 649, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg', bundle: false },
  ap: { id: 'ap', name: 'AAERT Exam Prep', desc: 'Comprehensive preparation for the AAERT certification exam to validate your expertise.', price: 399, origPrice: 399, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/aaertbook.jpg', bundle: false },
  ga: { id: 'ga', name: 'General + AAERT Bundle', desc: 'Combine general transcription with AAERT certification preparation.', price: 750, origPrice: 898, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg', bundle: true },
  la: { id: 'la', name: 'Legal + AAERT Bundle', desc: 'Master legal transcription and get AAERT certified — the ultimate combination.', price: 999, origPrice: 1048, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg', bundle: true },
  lg: { id: 'lg', name: 'Legal + General Bundle', desc: 'Cover both legal and general transcription to maximize your client opportunities.', price: 999, origPrice: 1148, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg', bundle: true },
  all: { id: 'all', name: 'All-in-One (3 Courses)', desc: 'Every course included — the complete path to a certified transcription career.', price: 1499, origPrice: 1547, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg', bundle: true },
};

const ADDONS: Record<string, Addon[]> = {
  gt: [
    { id: 'lt', badge: 'badge-popular', badgeText: 'Most Popular', name: 'Legal Transcription', benefit: 'Add legal clients and charge premium rates', origPrice: 649, price: 619, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg' },
    { id: 'ap', badge: 'badge-value', badgeText: 'Best Value', name: 'AAERT Exam Prep', benefit: 'Get certified and stand out to employers', origPrice: 399, price: 369, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/aaertbook.jpg' },
    { id: 'all', badge: 'badge-bundle', badgeText: 'Bundle', name: 'Upgrade to All-in-One', benefit: 'All 3 courses at the lowest possible price', origPrice: 1547, price: 1499, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg' },
  ],
  lt: [
    { id: 'gt', badge: 'badge-popular', badgeText: 'Most Popular', name: 'General Transcription', benefit: 'Diversify your client base beyond legal work', origPrice: 499, price: 499, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg' },
    { id: 'ap', badge: 'badge-value', badgeText: 'Best Value', name: 'AAERT Exam Prep', benefit: 'Get certified and stand out to every employer', origPrice: 399, price: 399, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/aaertbook.jpg' },
  ],
  ap: [
    { id: 'gt', badge: 'badge-popular', badgeText: 'Most Popular', name: 'General Transcription', benefit: 'Build your career foundation alongside AAERT', origPrice: 499, price: 469, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg' },
    { id: 'lt', badge: 'badge-value', badgeText: 'Best Value', name: 'Legal Transcription', benefit: 'Maximize earning with legal specialization', origPrice: 649, price: 619, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg' },
    { id: 'all', badge: 'badge-bundle', badgeText: 'Bundle', name: 'Upgrade to All-in-One', benefit: 'Complete all three at the bundle price', origPrice: 1547, price: 1499, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg' },
  ],
  ga: [
    { id: 'lt', badge: 'badge-popular', badgeText: 'Upgrade', name: 'Legal Transcription', benefit: 'Add legal work to your General + AAERT bundle', origPrice: 649, price: 619, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/legaltranscriptionbook.jpg' },
  ],
  la: [
    { id: 'gt', badge: 'badge-popular', badgeText: 'Upgrade', name: 'General Transcription', benefit: 'Complete the full suite with General', origPrice: 499, price: 469, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/generaltranscriptioncourse.jpg' },
  ],
  lg: [
    { id: 'ap', badge: 'badge-popular', badgeText: 'Upgrade', name: 'AAERT Exam Prep', benefit: 'Get certified on top of your bundle', origPrice: 399, price: 369, img: 'https://www.transcriptioncertificationinstitute.org/blog/uploads/aaertbook.jpg' },
  ],
  all: [],
};

const COUPONS: Record<string, Coupon> = {
  SAVE10: { type: 'percent', value: 10, label: 'SAVE10 — 10% off' },
  SAVE20: { type: 'percent', value: 20, label: 'SAVE20 — 20% off' },
  SAVE50: { type: 'percent', value: 50, label: 'SAVE50 — 50% off' },
  TCI50: { type: 'fixed', value: 50, label: 'TCI50 — $50 off' },
  TCI100: { type: 'fixed', value: 100, label: 'TCI100 — $100 off' },
  WELCOME: { type: 'percent', value: 15, label: 'WELCOME — 15% off' },
};

// ── Component ──────────────────────────────────────────────────────────────────
const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState<string>('gt');
  const [courseDeselected, setCourseDeselected] = useState<boolean>(false);
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [addedBundles, setAddedBundles] = useState<Record<string, Addon>>({});
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponInput, setCouponInput] = useState<string>('');
  const [couponInputState, setCouponInputState] = useState<'default' | 'error' | 'success'>('default');
  const [couponFeedback, setCouponFeedback] = useState<{ msg: string; isOk: boolean } | null>(null);
  const [payTab, setPayTab] = useState<'card' | 'paypal'>('card');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // ── Derived values ──────────────────────────────────────────────────────────
  const main = COURSES[selectedCourse];
  const addons = Object.values(addedBundles);
  const subtotal = courseDeselected ? 0 : main.price + addons.reduce((s, a) => s + a.price, 0);
  const origTotal = courseDeselected ? 0 : main.origPrice + addons.reduce((s, a) => s + a.origPrice, 0);
  const bundleSavings = origTotal - subtotal;
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === 'percent'
      ? Math.round(subtotal * appliedCoupon.value / 100)
      : Math.min(appliedCoupon.value, subtotal)
    : 0;
  const finalTotal = subtotal - couponDiscount;
  const totalSavings = bundleSavings + couponDiscount;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const pickCourse = (id: string) => {
    setSelectedCourse(id);
    setCourseDeselected(false);
    setAddedBundles({});
    setPickerOpen(false);
  };

  const toggleDeselect = () => {
    if (courseDeselected) return;
    setCourseDeselected(true);
    setAddedBundles({});
  };

  const toggleAddon = (id: string) => {
    const addonList = ADDONS[selectedCourse] || [];
    const addon = addonList.find(a => a.id === id);
    if (!addon) return;
    setAddedBundles(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = addon;
      }
      return next;
    });
  };

  const applyCouponHandler = () => {
    const code = couponInput.trim().toUpperCase();
    setCouponFeedback(null);
    setCouponInputState('default');
    if (!code) {
      setCouponFeedback({ msg: 'Please enter a coupon code.', isOk: false });
      return;
    }
    if (COUPONS[code]) {
      const c = COUPONS[code];
      setAppliedCoupon({ code, ...c });
      setCouponInputState('success');
      setCouponFeedback(null);
    } else {
      setCouponInputState('error');
      setCouponFeedback({ msg: 'Invalid coupon code. Please try again.', isOk: false });
    }
  };

  const removeCouponHandler = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponInputState('default');
    setCouponFeedback(null);
  };

  const completePurchase = () => {
    if (courseDeselected) return;
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Inline styles (cart CSS vars scoped here) ───────────────────────────────
  const css = `
    .cart-page { font-family: 'Poppins', sans-serif; background: #f4f7fb; min-height: 100vh; color: #1a2332; }
    .cart-topbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
    .cart-logo { font-weight: 700; font-size: 18px; color: #1a2332; display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; background: none; border: none; font-family: 'Poppins', sans-serif; }
    .cart-logo-dot { width: 28px; height: 28px; background: #4fb783; border-radius: 8px; display: grid; place-items: center; flex-shrink: 0; }
    .cart-progress-wrap { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 1rem 2rem; display: flex; justify-content: center; }
    .cart-steps { display: flex; align-items: center; }
    .cart-step { display: flex; align-items: center; gap: 10px; padding: 8px 20px; border-radius: 100px; font-size: 13px; font-weight: 500; color: #94a3b8; background: transparent; border: 1.5px solid #e2e8f0; }
    .cart-step.done { background: #e8f7ef; border-color: #4fb783; color: #4fb783; }
    .cart-step.active { background: #4fb783; border-color: #4fb783; color: #fff; box-shadow: 0 4px 18px rgba(79,183,131,.3); }
    .cart-step-num { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
    .cart-step.done .cart-step-num { background: #4fb783; color: #fff; }
    .cart-step.active .cart-step-num { background: rgba(255,255,255,.25); color: #fff; }
    .cart-step-connector { width: 56px; height: 2px; margin: 0 4px; }
    .cart-step-connector.done { background: #4fb783; }
    .cart-step-connector.plain { background: #e2e8f0; }
    .cart-page-wrap { max-width: 1080px; margin: 0 auto; padding: 2.5rem 1.5rem; }
    .cart-back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #4a5568; text-decoration: none; cursor: pointer; border: none; background: none; font-family: 'Poppins', sans-serif; padding: 0; margin-bottom: 1.25rem; }
    .cart-back-link:hover { color: #4fb783; }
    .cart-page-title { font-weight: 700; font-size: 24px; color: #1a2332; margin-bottom: .25rem; }
    .cart-page-subtitle { font-size: 14px; color: #94a3b8; margin-bottom: 2rem; }
    .cart-grid { display: grid; grid-template-columns: 1fr 380px; gap: 1.75rem; align-items: start; }
    @media (max-width: 860px) { .cart-grid { grid-template-columns: 1fr; } }
    .cart-card { background: #fff; border-radius: 14px; border: 1px solid #e2e8f0; padding: 1.75rem; box-shadow: 0 2px 20px rgba(0,0,0,.05); margin-bottom: 1.5rem; }
    .cart-card:last-child { margin-bottom: 0; }
    .cart-card-heading { font-weight: 600; font-size: 17px; color: #1a2332; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px; }
    .cart-selected-wrap { background: linear-gradient(135deg, #f0faf5 0%, #e8f7ef 100%); border: 2px solid #4fb783; border-radius: 12px; padding: 1.25rem; display: flex; gap: 1.25rem; align-items: flex-start; position: relative; overflow: hidden; transition: all .25s; }
    .cart-selected-wrap.deselected { background: #fafbfc; border-color: #e2e8f0; border-style: dashed; opacity: .6; }
    .cart-selected-wrap::before { content: ''; position: absolute; top: -24px; right: -24px; width: 96px; height: 96px; background: rgba(79,183,131,.08); border-radius: 50%; }
    .cart-selected-badge { position: absolute; top: 12px; right: 14px; background: #4fb783; color: #fff; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 100px; letter-spacing: .4px; text-transform: uppercase; }
    .cart-selected-img { width: 80px; height: 108px; border-radius: 8px; object-fit: contain; object-position: center; flex-shrink: 0; background: #f8f9fb; padding: 4px; border: 1px solid rgba(79,183,131,.2); }
    .cart-selected-info { flex: 1; min-width: 0; }
    .cart-selected-name { font-weight: 700; font-size: 16px; color: #1a2332; margin-bottom: 5px; line-height: 1.3; }
    .cart-selected-desc { font-size: 13px; color: #4a5568; line-height: 1.6; margin-bottom: 10px; }
    .cart-pricing-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .cart-orig-price { font-size: 14px; color: #94a3b8; text-decoration: line-through; }
    .cart-disc-price { font-size: 24px; font-weight: 700; color: #4fb783; }
    .cart-save-badge { background: #fff8e1; color: #b45309; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 100px; letter-spacing: .2px; }
    .cart-course-controls { display: flex; align-items: center; gap: 8px; margin-top: 1rem; flex-wrap: wrap; }
    .cart-change-btn { display: inline-flex; align-items: center; gap: 5px; padding: 7px 14px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 12px; font-weight: 600; font-family: 'Poppins', sans-serif; background: #fff; color: #4a5568; cursor: pointer; transition: all .2s; }
    .cart-change-btn:hover { border-color: #4fb783; color: #4fb783; background: #e8f7ef; }
    .cart-deselect-btn { display: inline-flex; align-items: center; gap: 5px; padding: 7px 14px; border: 1.5px solid #fca5a5; border-radius: 8px; font-size: 12px; font-weight: 600; font-family: 'Poppins', sans-serif; background: #fff; color: #dc2626; cursor: pointer; transition: all .2s; }
    .cart-deselect-btn:hover { background: #fef2f2; border-color: #dc2626; }
    .cart-deselect-btn:disabled { opacity: .5; cursor: default; }
    .cart-course-picker { display: none; margin-top: 1rem; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
    .cart-course-picker.visible { display: block; }
    .cart-picker-header { padding: 12px 16px; background: #f4f7fb; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: .6px; display: flex; align-items: center; justify-content: space-between; }
    .cart-picker-close { background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 20px; line-height: 1; padding: 0; transition: color .2s; font-family: 'Poppins', sans-serif; }
    .cart-picker-close:hover { color: #1a2332; }
    .cart-picker-option { display: flex; align-items: center; gap: 12px; padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #e2e8f0; transition: background .15s; }
    .cart-picker-option:last-child { border: none; }
    .cart-picker-option:hover { background: #e8f7ef; }
    .cart-picker-option.active { background: #f0faf5; }
    .cart-picker-option.active .cart-picker-opt-name { color: #4fb783; }
    .cart-picker-thumb { width: 36px; height: 48px; object-fit: contain; border-radius: 5px; background: #f8f9fb; padding: 2px; border: 1px solid #e2e8f0; flex-shrink: 0; }
    .cart-picker-opt-name { font-weight: 600; font-size: 13px; color: #1a2332; }
    .cart-picker-opt-price { font-size: 13px; font-weight: 700; color: #4fb783; margin-top: 1px; }
    .cart-picker-opt-badge { margin-left: auto; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 100px; background: #4fb783; color: #fff; flex-shrink: 0; }
    .cart-empty-note { display: none; text-align: center; padding: 1.5rem 1rem; background: #fff8f8; border: 1.5px dashed #fca5a5; border-radius: 10px; margin-top: 1rem; font-size: 13px; color: #dc2626; font-weight: 500; }
    .cart-empty-note.visible { display: block; }
    .cart-section-label { font-size: 11px; font-weight: 700; letter-spacing: .9px; text-transform: uppercase; color: #94a3b8; margin: 1.5rem 0 .875rem; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 8px; }
    .cart-label-badge { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 100px; background: #fff8e1; color: #b45309; letter-spacing: .3px; }
    .cart-bundle-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 1rem; }
    .cart-bundle-card { border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; cursor: pointer; transition: border-color .2s, transform .2s, box-shadow .2s; background: #fff; position: relative; }
    .cart-bundle-card:hover { border-color: #4fb783; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.1); }
    .cart-bundle-card.selected { border-color: #4fb783; box-shadow: 0 0 0 3px rgba(79,183,131,.15); }
    .cart-bundle-card.selected::after { content: '✓'; position: absolute; top: 10px; right: 10px; width: 22px; height: 22px; background: #4fb783; color: #fff; border-radius: 50%; display: grid; place-items: center; font-size: 11px; font-weight: 700; z-index: 2; }
    .cart-bundle-img-wrap { position: relative; height: 160px; background: #f8f9fb; display: flex; align-items: center; justify-content: center; overflow: hidden; border-bottom: 1px solid #e2e8f0; }
    .cart-bundle-img { width: auto; height: 148px; max-width: 90%; object-fit: contain; display: block; }
    .cart-bundle-badge { position: absolute; bottom: 8px; left: 8px; font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 100px; letter-spacing: .3px; text-transform: uppercase; }
    .badge-popular { background: #ede9fe; color: #5b21b6; }
    .badge-value { background: #e8f7ef; color: #166534; }
    .badge-bundle { background: #fff8e1; color: #92400e; }
    .cart-bundle-body { padding: .875rem; }
    .cart-bundle-name { font-weight: 600; font-size: 14px; color: #1a2332; margin-bottom: 3px; line-height: 1.3; }
    .cart-bundle-benefit { font-size: 12px; color: #94a3b8; margin-bottom: 10px; line-height: 1.5; }
    .cart-bundle-pricing { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
    .cart-bundle-orig { font-size: 12px; color: #94a3b8; text-decoration: line-through; }
    .cart-bundle-disc { font-size: 17px; font-weight: 700; color: #4fb783; }
    .cart-bundle-save { font-size: 11px; font-weight: 600; color: #166534; }
    .cart-add-btn { width: 100%; margin-top: 10px; padding: 8px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 12px; font-weight: 600; background: transparent; cursor: pointer; transition: all .2s; font-family: 'Poppins', sans-serif; color: #1a2332; }
    .cart-add-btn:hover { border-color: #4fb783; color: #4fb783; background: #e8f7ef; }
    .cart-bundle-card.selected .cart-add-btn { background: #4fb783; border-color: #4fb783; color: #fff; }
    .cart-sticky-panel { position: sticky; top: 80px; }
    .cart-order-card { background: #fff; border-radius: 14px; border: 1px solid #e2e8f0; padding: 1.5rem; box-shadow: 0 4px 24px rgba(0,0,0,.07); }
    .cart-order-heading { font-weight: 600; font-size: 17px; color: #1a2332; margin-bottom: 1.25rem; }
    .cart-order-item { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid #e2e8f0; align-items: center; }
    .cart-order-thumb { width: 44px; height: 58px; border-radius: 6px; object-fit: contain; object-position: center; flex-shrink: 0; border: 1px solid #e2e8f0; background: #f8f9fb; padding: 2px; }
    .cart-order-item-name { font-weight: 600; font-size: 13px; color: #1a2332; line-height: 1.3; }
    .cart-order-item-orig { font-size: 11px; color: #94a3b8; text-decoration: line-through; margin-top: 1px; }
    .cart-order-item-price { font-weight: 700; font-size: 14px; color: #1a2332; margin-left: auto; white-space: nowrap; padding-left: 8px; }
    .cart-summary-rows { margin-top: 1rem; }
    .cart-s-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
    .cart-s-row:last-child { border: none; }
    .cart-s-row.subtotal { color: #4a5568; }
    .cart-s-row.discount { color: #166534; font-weight: 600; }
    .cart-s-row.total { font-weight: 700; font-size: 18px; color: #1a2332; padding-top: 14px; }
    .cart-savings-banner { background: linear-gradient(90deg, #e8f7ef, #d1fae5); border: 1px solid #4fb783; border-radius: 10px; padding: 12px 16px; text-align: center; margin: 1rem 0; }
    .cart-savings-amt { font-size: 22px; font-weight: 700; color: #4fb783; }
    .cart-savings-lbl { font-size: 12px; color: #166534; margin-top: 2px; }
    .cart-coupon-section { margin: 1rem 0; border-top: 1px solid #e2e8f0; padding-top: 1rem; }
    .cart-coupon-label { font-size: 12px; font-weight: 600; color: #4a5568; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: .5px; }
    .cart-coupon-row { display: flex; gap: 8px; }
    .cart-coupon-input { flex: 1; padding: 12px 16px; border: 2px dashed #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 600; font-family: 'Poppins', sans-serif; color: #1a2332; outline: none; text-transform: uppercase; letter-spacing: 1.5px; background: #fafbfc; transition: border-color .2s, box-shadow .2s, background .2s; }
    .cart-coupon-input:focus { border-color: #4fb783; border-style: solid; background: #fff; box-shadow: 0 0 0 3px rgba(79,183,131,.12); }
    .cart-coupon-input.error { border-color: #fca5a5; border-style: solid; background: #fff8f8; }
    .cart-coupon-input.success { border-color: #4fb783; border-style: solid; background: #e8f7ef; color: #166534; }
    .cart-coupon-apply-btn { padding: 12px 20px; background: #4fb783; color: #fff; border: none; border-radius: 10px; font-size: 13px; font-weight: 700; font-family: 'Poppins', sans-serif; cursor: pointer; transition: all .2s; white-space: nowrap; letter-spacing: .3px; }
    .cart-coupon-apply-btn:hover { background: #3a9a6a; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(79,183,131,.3); }
    .cart-coupon-apply-btn:disabled { background: #94a3b8; cursor: default; transform: none; box-shadow: none; }
    .cart-coupon-feedback { margin-top: 8px; font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 5px; }
    .cart-coupon-feedback.ok { color: #166534; }
    .cart-coupon-feedback.err { color: #dc2626; }
    .cart-coupon-applied-tag { display: flex; align-items: center; gap: 10px; background: #e8f7ef; border: 1.5px solid #4fb783; border-radius: 10px; padding: 10px 14px; margin-top: .875rem; }
    .cart-coupon-applied-tag span { font-size: 13px; font-weight: 600; color: #166534; flex: 1; }
    .cart-coupon-remove-btn { background: none; border: 1.5px solid #a7f3d0; border-radius: 6px; cursor: pointer; color: #166534; font-size: 13px; line-height: 1; padding: 3px 8px; transition: all .2s; font-family: 'Poppins', sans-serif; font-weight: 600; }
    .cart-coupon-remove-btn:hover { background: #dc2626; border-color: #dc2626; color: #fff; }
    .cart-payment-tabs { display: flex; border: 1.5px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 1.25rem; }
    .cart-ptab { flex: 1; padding: 10px; text-align: center; font-size: 13px; font-weight: 500; cursor: pointer; background: #fff; color: #4a5568; border: none; font-family: 'Poppins', sans-serif; transition: all .2s; }
    .cart-ptab:not(:last-child) { border-right: 1.5px solid #e2e8f0; }
    .cart-ptab.active { background: #1a2332; color: #fff; }
    .cart-input-group { margin-bottom: .875rem; }
    .cart-input-label { font-size: 12px; font-weight: 600; color: #4a5568; margin-bottom: 5px; display: block; }
    .cart-input-field { width: 100%; padding: 11px 14px; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 14px; font-family: 'Poppins', sans-serif; color: #1a2332; outline: none; transition: border-color .2s, box-shadow .2s; }
    .cart-input-field:focus { border-color: #4fb783; box-shadow: 0 0 0 3px rgba(79,183,131,.12); }
    .cart-card-row { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
    .cart-pay-btn { width: 100%; padding: 15px; background: #4fb783; color: #fff; border: none; border-radius: 11px; font-size: 15px; font-weight: 700; font-family: 'Poppins', sans-serif; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 1rem; letter-spacing: .2px; }
    .cart-pay-btn:hover { background: #3a9a6a; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(79,183,131,.3); }
    .cart-pay-btn:disabled { opacity: .5; cursor: default; transform: none; box-shadow: none; }
    .cart-pay-btn.paypal { background: #003087; }
    .cart-pay-btn.paypal:hover { background: #001f5c; box-shadow: 0 8px 24px rgba(0,48,135,.3); }
    .cart-ssl-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: .875rem; font-size: 11px; color: #94a3b8; }
    .cart-trust-bar { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid #e2e8f0; }
    .cart-trust-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; }
    .cart-trust-icon { width: 26px; height: 26px; background: #e8f7ef; border-radius: 6px; display: grid; place-items: center; flex-shrink: 0; }
    .cart-paypal-box { background: #f8f9ff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 2rem; text-align: center; margin-bottom: .875rem; }
    .cart-pp-logo { font-size: 36px; margin-bottom: .5rem; }
    .cart-pp-title { font-weight: 600; color: #003087; margin-bottom: .25rem; }
    .cart-pp-sub { font-size: 13px; color: #4a5568; }
    .cart-success-wrap { max-width: 1080px; margin: 0 auto; padding: 2.5rem 1.5rem; }
    .cart-success-screen { background: #fff; border-radius: 14px; border: 1px solid #e2e8f0; padding: 4rem 2rem; text-align: center; box-shadow: 0 2px 20px rgba(0,0,0,.05); }
    .cart-success-icon { width: 80px; height: 80px; border-radius: 50%; background: #4fb783; display: grid; place-items: center; margin: 0 auto 1.5rem; font-size: 32px; box-shadow: 0 8px 28px rgba(79,183,131,.35); }
    .cart-success-title { font-weight: 700; font-size: 30px; color: #1a2332; margin-bottom: .5rem; }
    .cart-success-sub { color: #4a5568; font-size: 15px; line-height: 1.6; max-width: 440px; margin: 0 auto 2rem; }
    .cart-unlocked-box { max-width: 420px; margin: 0 auto 2rem; background: #e8f7ef; border: 1px solid #4fb783; border-radius: 12px; padding: 1.25rem 1.5rem; text-align: left; }
    .cart-unlocked-title { font-weight: 700; font-size: 14px; color: #1a2332; margin-bottom: .75rem; }
    .cart-unlocked-item { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid rgba(79,183,131,.2); }
    .cart-unlocked-item:last-child { border: none; }
    .cart-unlocked-thumb { width: 36px; height: 48px; border-radius: 5px; object-fit: contain; background: #f8f9fb; padding: 2px; border: 1px solid #e2e8f0; }
    .cart-unlocked-name { font-size: 13px; font-weight: 500; color: #1a2332; }
    .cart-start-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: #4fb783; color: #fff; border: none; border-radius: 11px; font-size: 15px; font-weight: 700; font-family: 'Poppins', sans-serif; cursor: pointer; transition: all .2s; text-decoration: none; }
    .cart-start-btn:hover { background: #3a9a6a; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(79,183,131,.3); }
    @media (max-width: 600px) {
      .cart-topbar { padding: 0 1rem; }
      .cart-page-wrap { padding: 1.5rem 1rem; }
      .cart-card { padding: 1.25rem; }
      .cart-order-card { padding: 1.25rem; }
      .cart-selected-wrap { flex-direction: column; }
      .cart-step { padding: 8px 12px; font-size: 12px; }
      .cart-step-connector { width: 24px; }
    }
  `;

  const allItems = courseDeselected ? [] : [main, ...addons];

  return (
    <div className="cart-page">
      <style>{css}</style>

      {/* Top Bar */}
      <header className="cart-topbar">
        <button className="cart-logo" onClick={() => navigate('/signup')}>
          <div className="cart-logo-dot">
            <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
              <path d="M2 4h10M2 7h7M2 10h5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          Transcription Certification Institute
        </button>
        <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="4" width="10" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
            <path d="M4.5 4V3a2.5 2.5 0 015 0v1" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Secure Checkout
        </div>
      </header>

      {/* Progress Steps */}
      <div className="cart-progress-wrap">
        <div className="cart-steps">
          <div className="cart-step done">
            <div className="cart-step-num">✓</div>
            Registration
          </div>
          <div className="cart-step-connector done"></div>
          <div className="cart-step active">
            <div className="cart-step-num">2</div>
            Cart &amp; Payment
          </div>
        </div>
      </div>

      {/* Main Content or Success */}
      {showSuccess ? (
        <div className="cart-success-wrap">
          <div className="cart-success-screen">
            <div className="cart-success-icon">🎉</div>
            <div className="cart-success-title">You're Enrolled!</div>
            <p className="cart-success-sub">Your purchase is confirmed. Check your inbox for login details and instant course access.</p>
            <div className="cart-unlocked-box">
              <div className="cart-unlocked-title">Courses Unlocked:</div>
              {allItems.map(item => (
                <div className="cart-unlocked-item" key={item.id}>
                  <img className="cart-unlocked-thumb" src={item.img} alt={item.name} />
                  <div className="cart-unlocked-name">{item.name}</div>
                </div>
              ))}
            </div>
            <button className="cart-start-btn" onClick={() => navigate('/dashboard')}>
              Start Learning Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-page-wrap">
          <button className="cart-back-link" onClick={() => navigate('/signup')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Registration
          </button>

          <div className="cart-page-title">Review Your Order</div>
          <p className="cart-page-subtitle">Your selected course is ready. Add more courses to your bundle and save.</p>

          <div className="cart-grid">
            {/* LEFT COLUMN */}
            <div>
              {/* Selected Course Card */}
              <div className="cart-card">
                <div className="cart-card-heading">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <rect x="1" y="1" width="15" height="15" rx="3" stroke="#4fb783" strokeWidth="1.5" />
                    <path d="M4 8.5l3 3 6-6" stroke="#4fb783" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Your Selected Course
                </div>

                <div className={`cart-selected-wrap${courseDeselected ? ' deselected' : ''}`}>
                  {!courseDeselected && <span className="cart-selected-badge">Selected</span>}
                  <img
                    className="cart-selected-img"
                    src={courseDeselected ? '' : main.img}
                    alt="Course"
                    style={{ opacity: courseDeselected ? 0.35 : 1 }}
                  />
                  <div className="cart-selected-info">
                    <div className="cart-selected-name">
                      {courseDeselected ? 'No course selected' : main.name}
                    </div>
                    <div className="cart-selected-desc">
                      {courseDeselected ? 'Use "Change Course" below to pick a course.' : main.desc}
                    </div>
                    {!courseDeselected && (
                      <div className="cart-pricing-row">
                        {main.origPrice > main.price && (
                          <span className="cart-orig-price">${main.origPrice.toLocaleString()}</span>
                        )}
                        <span className="cart-disc-price">${main.price.toLocaleString()}</span>
                        {main.origPrice > main.price && (
                          <span className="cart-save-badge">Save ${(main.origPrice - main.price).toLocaleString()}</span>
                        )}
                      </div>
                    )}
                    {courseDeselected && (
                      <div className="cart-pricing-row">
                        <span className="cart-disc-price">—</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="cart-course-controls">
                  <button className="cart-change-btn" onClick={() => setPickerOpen(p => !p)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Change Course
                  </button>
                  <button
                    className="cart-deselect-btn"
                    onClick={toggleDeselect}
                    disabled={courseDeselected}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    {courseDeselected ? 'Removed' : 'Remove'}
                  </button>
                </div>

                {/* Course Picker */}
                <div className={`cart-course-picker${pickerOpen ? ' visible' : ''}`}>
                  <div className="cart-picker-header">
                    Change Course
                    <button className="cart-picker-close" onClick={() => setPickerOpen(false)}>&#xD7;</button>
                  </div>
                  {['gt', 'lt', 'ap'].map(id => {
                    const c = COURSES[id];
                    const isActive = !courseDeselected && selectedCourse === id;
                    return (
                      <div
                        key={id}
                        className={`cart-picker-option${isActive ? ' active' : ''}`}
                        onClick={() => pickCourse(id)}
                      >
                        <img className="cart-picker-thumb" src={c.img} alt={c.name} />
                        <div>
                          <div className="cart-picker-opt-name">{c.name}</div>
                          <div className="cart-picker-opt-price">${c.price.toLocaleString()}</div>
                        </div>
                        {isActive && <span className="cart-picker-opt-badge">Current</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Empty Cart Warning */}
                <div className={`cart-empty-note${courseDeselected ? ' visible' : ''}`}>
                  ⚠️ Your cart is empty. Please select a course to continue.
                </div>
              </div>

              {/* Frequently Bought Together */}
              <div className="cart-card">
                <div className="cart-section-label">
                  Frequently Bought Together
                  <span className="cart-label-badge">Save More</span>
                </div>
                <div className="cart-bundle-grid">
                  {(ADDONS[selectedCourse] || []).length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#94a3b8', padding: '.5rem 0' }}>
                      You already have our most complete bundle! 🎉
                    </p>
                  ) : (
                    (ADDONS[selectedCourse] || []).map(addon => {
                      const isSel = !!addedBundles[addon.id];
                      const saving = addon.origPrice - addon.price;
                      return (
                        <div
                          key={addon.id}
                          className={`cart-bundle-card${isSel ? ' selected' : ''}`}
                          onClick={() => toggleAddon(addon.id)}
                        >
                          <div className="cart-bundle-img-wrap">
                            <img className="cart-bundle-img" src={addon.img} alt={addon.name} />
                            <span className={`cart-bundle-badge ${addon.badge}`}>{addon.badgeText}</span>
                          </div>
                          <div className="cart-bundle-body">
                            <div className="cart-bundle-name">{addon.name}</div>
                            <div className="cart-bundle-benefit">{addon.benefit}</div>
                            <div className="cart-bundle-pricing">
                              <span className="cart-bundle-orig">${addon.origPrice.toLocaleString()}</span>
                              <span className="cart-bundle-disc">${addon.price.toLocaleString()}</span>
                              {saving > 0 && <span className="cart-bundle-save">Save ${saving.toLocaleString()}</span>}
                            </div>
                            <button className="cart-add-btn">{isSel ? '✓ Added' : '+ Add to Cart'}</button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="cart-sticky-panel">
              <div className="cart-order-card">
                <div className="cart-order-heading">Order Summary</div>

                {/* Order Items */}
                {courseDeselected ? (
                  <p style={{ fontSize: '13px', color: '#94a3b8', padding: '.75rem 0', textAlign: 'center' }}>
                    No course selected
                  </p>
                ) : (
                  <>
                    <div className="cart-order-item">
                      <img className="cart-order-thumb" src={main.img} alt={main.name} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="cart-order-item-name">{main.name}</div>
                        {main.origPrice > main.price && (
                          <div className="cart-order-item-orig">${main.origPrice.toLocaleString()}</div>
                        )}
                      </div>
                      <div className="cart-order-item-price">${main.price.toLocaleString()}</div>
                    </div>
                    {addons.map(a => (
                      <div key={a.id} className="cart-order-item">
                        <img className="cart-order-thumb" src={a.img} alt={a.name} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="cart-order-item-name">{a.name}</div>
                          <div className="cart-order-item-orig">${a.origPrice.toLocaleString()}</div>
                        </div>
                        <div className="cart-order-item-price">${a.price.toLocaleString()}</div>
                      </div>
                    ))}
                  </>
                )}

                {/* Summary Rows */}
                <div className="cart-summary-rows">
                  <div className="cart-s-row subtotal">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {bundleSavings > 0 && (
                    <div className="cart-s-row discount">
                      <span>Bundle Savings</span>
                      <span>-${bundleSavings.toLocaleString()}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && appliedCoupon && (
                    <div className="cart-s-row discount">
                      <span>Coupon ({appliedCoupon.code})</span>
                      <span>-${couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="cart-s-row total">
                    <span>Total</span>
                    <span>${finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Savings Banner */}
                {totalSavings > 0 && (
                  <div className="cart-savings-banner">
                    <div className="cart-savings-amt">${totalSavings.toLocaleString()}</div>
                    <div className="cart-savings-lbl">Total savings on this order 🎉</div>
                  </div>
                )}

                {/* Coupon */}
                <div className="cart-coupon-section">
                  <div className="cart-coupon-label">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="4" width="11" height="6" rx="1.5" stroke="#4a5568" strokeWidth="1.2" />
                      <path d="M4 4V3a2.5 2.5 0 015 0v1" stroke="#4a5568" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Promo Code
                  </div>
                  <div className="cart-coupon-row">
                    <input
                      className={`cart-coupon-input${couponInputState === 'error' ? ' error' : couponInputState === 'success' ? ' success' : ''}`}
                      placeholder="Enter promo code"
                      maxLength={20}
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      disabled={!!appliedCoupon}
                      onKeyDown={e => { if (e.key === 'Enter') applyCouponHandler(); }}
                    />
                    <button
                      className="cart-coupon-apply-btn"
                      onClick={applyCouponHandler}
                      disabled={!!appliedCoupon}
                    >
                      {appliedCoupon ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                  {couponFeedback && (
                    <div className={`cart-coupon-feedback ${couponFeedback.isOk ? 'ok' : 'err'}`}>
                      {couponFeedback.isOk ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="4.5" stroke="#166534" strokeWidth="1.2" />
                          <polyline points="3.5,6 5.5,8 8.5,4" stroke="#166534" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="4.5" stroke="#dc2626" strokeWidth="1.2" />
                          <path d="M4 4l4 4M8 4l-4 4" stroke="#dc2626" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      )}
                      {couponFeedback.msg}
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="cart-coupon-applied-tag">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="#166534" strokeWidth="1.3" />
                        <polyline points="4,7 6.5,9.5 10,5" stroke="#166534" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{appliedCoupon.label}</span>
                      <button className="cart-coupon-remove-btn" onClick={removeCouponHandler}>Remove</button>
                    </div>
                  )}
                </div>

                {/* Payment Tabs */}
                <div className="cart-payment-tabs">
                  <button
                    className={`cart-ptab${payTab === 'card' ? ' active' : ''}`}
                    onClick={() => setPayTab('card')}
                  >
                    💳 Credit Card
                  </button>
                  <button
                    className={`cart-ptab${payTab === 'paypal' ? ' active' : ''}`}
                    onClick={() => setPayTab('paypal')}
                  >
                    🅿️ PayPal
                  </button>
                </div>

                {/* Card Form */}
                {payTab === 'card' && (
                  <div>
                    <div className="cart-input-group">
                      <label className="cart-input-label">Cardholder Name</label>
                      <input className="cart-input-field" type="text" placeholder="Jane Smith" />
                    </div>
                    <div className="cart-input-group">
                      <label className="cart-input-label">Card Number</label>
                      <input className="cart-input-field" type="text" placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div className="cart-card-row">
                      <div className="cart-input-group">
                        <label className="cart-input-label">Expiry</label>
                        <input className="cart-input-field" type="text" placeholder="MM / YY" maxLength={7} />
                      </div>
                      <div className="cart-input-group">
                        <label className="cart-input-label">CVV</label>
                        <input className="cart-input-field" type="text" placeholder="•••" maxLength={4} />
                      </div>
                    </div>
                    <button
                      className="cart-pay-btn"
                      onClick={completePurchase}
                      disabled={courseDeselected}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="5" width="14" height="9" rx="1.5" stroke="#fff" strokeWidth="1.5" />
                        <path d="M1 8h14" stroke="#fff" strokeWidth="1.5" />
                      </svg>
                      Complete Purchase
                    </button>
                  </div>
                )}

                {/* PayPal Form */}
                {payTab === 'paypal' && (
                  <div>
                    <div className="cart-paypal-box">
                      <div className="cart-pp-logo">🅿️</div>
                      <div className="cart-pp-title">Pay with PayPal</div>
                      <div className="cart-pp-sub">You'll be redirected to PayPal to complete your purchase securely.</div>
                    </div>
                    <button
                      className="cart-pay-btn paypal"
                      onClick={completePurchase}
                      disabled={courseDeselected}
                    >
                      Continue to PayPal
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="cart-ssl-note">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="2" y="5" width="8" height="6" rx="1" stroke="#94a3b8" strokeWidth="1.2" />
                    <path d="M4 5V3.5a2 2 0 014 0V5" stroke="#94a3b8" strokeWidth="1.2" />
                  </svg>
                  256-bit SSL encrypted checkout
                </div>

                <div className="cart-trust-bar">
                  <div className="cart-trust-item">
                    <div className="cart-trust-icon">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 1.5L8.3 5.2l4.1.6-2.95 2.87.7 4.06L6.5 10.7l-3.65 1.93.7-4.06L.5 5.8l4.1-.6z" stroke="#4fb783" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Industry Certified
                  </div>
                  <div className="cart-trust-item">
                    <div className="cart-trust-icon">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <circle cx="6.5" cy="6.5" r="5" stroke="#4fb783" strokeWidth="1.2" />
                        <path d="M4 6.5l2 2 3-3" stroke="#4fb783" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    30-Day Money Back
                  </div>
                  <div className="cart-trust-item">
                    <div className="cart-trust-icon">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 1.5v10M1.5 6.5h10" stroke="#4fb783" strokeWidth="1.2" strokeLinecap="round" />
                        <circle cx="6.5" cy="6.5" r="5" stroke="#4fb783" strokeWidth="1.2" />
                      </svg>
                    </div>
                    Instant Access
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
