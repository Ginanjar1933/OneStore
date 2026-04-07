/* =====================================================
   ONE STORE — Auth JS
   Login & Register form validation, password toggle
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Determine page type ───────────────────────── */
  const isLogin    = document.getElementById('login-form')    !== null;
  const isRegister = document.getElementById('register-form') !== null;

  /* ─── Password Toggle Visibility ───────────────── */
  document.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.innerHTML = isText
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    });
  });

  /* ─── Password Strength Meter ───────────────────── */
  const passwordInput = document.getElementById('password');
  const strengthFill  = document.querySelector('.strength-fill');
  const strengthText  = document.querySelector('.strength-text');

  if (passwordInput && strengthFill) {
    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      const score = calcPasswordStrength(val);
      const colors = ['#EF4444', '#F59E0B', '#10B981', '#059669'];
      const labels = ['Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
      const widths = ['25%', '50%', '75%', '100%'];

      strengthFill.style.width      = val ? widths[score] : '0%';
      strengthFill.style.background = val ? colors[score] : '';
      if (strengthText) strengthText.textContent = val ? labels[score] : '';
      if (strengthText) strengthText.style.color = val ? colors[score] : '';
    });
  }

  function calcPasswordStrength(pw) {
    let score = 0;
    if (pw.length >= 8)  score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score - 1, 3);
  }

  /* ─── LOGIN FORM ────────────────────────────────── */
  if (isLogin) {
    const form = document.getElementById('login-form');

    form?.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateLoginForm()) return;

      const btn = document.getElementById('login-btn');
      setBtnLoading(btn, true);

      // Simulate API call
      await delay(1500);

      const email    = document.getElementById('login-email').value.trim();
      const name     = email.split('@')[0]
        .replace(/\./g, ' ')
        .replace(/^\w/, c => c.toUpperCase());

      loginUser(email, name);
      setBtnLoading(btn, false);

      showToast('Login Berhasil!', `Selamat datang, ${name}! 👋`, 'success');

      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 1000);
    });

    // Real-time validation
    document.getElementById('login-email')?.addEventListener('blur', () => {
      validateField('login-email', 'ig-login-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    });
    document.getElementById('login-password')?.addEventListener('blur', () => {
      validateField('login-password', 'ig-login-password', v => v.length >= 6);
    });
  }

  function validateLoginForm() {
    const email = validateField('login-email',    'ig-login-email',    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    const pw    = validateField('login-password', 'ig-login-password', v => v.length >= 6);
    return email && pw;
  }

  /* ─── REGISTER FORM ─────────────────────────────── */
  if (isRegister) {
    const form = document.getElementById('register-form');

    form?.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateRegisterForm()) return;

      const btn = document.getElementById('register-btn');
      setBtnLoading(btn, true);

      await delay(1600);

      const name  = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();

      loginUser(email, name);
      setBtnLoading(btn, false);

      showToast('Akun Berhasil Dibuat!', `Selamat datang di One Store, ${name}! 🎉`, 'success');

      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 1000);
    });

    // Real-time
    ['reg-name','reg-email','reg-password','reg-confirm'].forEach(id => {
      document.getElementById(id)?.addEventListener('blur', () => validateRegisterField(id));
    });
  }

  function validateRegisterForm() {
    const r1 = validateRegisterField('reg-name');
    const r2 = validateRegisterField('reg-email');
    const r3 = validateRegisterField('reg-password');
    const r4 = validateRegisterField('reg-confirm');

    const termsEl = document.getElementById('reg-terms');
    if (termsEl && !termsEl.checked) {
      showToast('Syarat & Ketentuan', 'Kamu harus menyetujui syarat & ketentuan.', 'error');
      return false;
    }
    return r1 && r2 && r3 && r4;
  }

  function validateRegisterField(id) {
    const rules = {
      'reg-name':    { groupId: 'ig-reg-name',    rule: v => v.length >= 2,   msg: 'Nama minimal 2 karakter' },
      'reg-email':   { groupId: 'ig-reg-email',   rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Format email tidak valid' },
      'reg-password':{ groupId: 'ig-reg-password', rule: v => v.length >= 8,  msg: 'Password minimal 8 karakter' },
      'reg-confirm': {
        groupId: 'ig-reg-confirm',
        rule: v => {
          const pw = document.getElementById('password')?.value;
          return v === pw && v.length >= 8;
        },
        msg: 'Konfirmasi password tidak cocok'
      },
    };
    const cfg = rules[id];
    if (!cfg) return true;
    const valid = validateField(id, cfg.groupId, cfg.rule);
    if (!valid) {
      const errEl = document.querySelector(`#${cfg.groupId} .input-error`);
      if (errEl) errEl.textContent = cfg.msg;
    }
    return valid;
  }

  /* ─── Shared Validation Helper ──────────────────── */
  function validateField(inputId, groupId, rule) {
    const input = document.getElementById(inputId);
    const group = document.getElementById(groupId);
    if (!input || !group) return true;
    const valid = rule(input.value.trim());
    group.classList.toggle('has-error', !valid);
    return valid;
  }

  /* ─── Button Loading State ──────────────────────── */
  function setBtnLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    if (loading) {
      btn.classList.add('loading');
    } else {
      btn.classList.remove('loading');
    }
  }

  /* ─── Utility ────────────────────────────────────── */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* ─── Social Login (simulated) ──────────────────── */
  document.querySelectorAll('.social-login-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      showToast('Segera Hadir', 'Fitur login sosial akan segera tersedia!', 'info');
    });
  });

  /* ─── Redirect if already logged in ─────────────── */
  const user = getCurrentUser?.();
  if (user && (isLogin || isRegister)) {
    const redirectMsg = document.getElementById('already-logged-in');
    if (redirectMsg) redirectMsg.style.display = 'flex';
  }

});
