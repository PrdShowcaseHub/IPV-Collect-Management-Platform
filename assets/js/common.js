/* ===== IPV采集管理平台 - 通用脚本 ===== */

// SVG icon 集 (Lucide style)
const ICONS = {
  采集配置: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
  数据类: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
  文本类: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
  异常数据: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  报告中心: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h6"/><path d="M16 13h0"/></svg>',
};

// 菜单配置
const MENU_CONFIG = [
  { key: '采集配置', label: '采集配置', icon: ICONS.采集配置, href: '../pages/采集配置.html' },
  {
    group: '采集信息维护',
    items: [
      { key: '采集信息维护-数据', label: '数据类', icon: ICONS.数据类, href: '../pages/采集信息维护-数据.html' },
      { key: '采集信息维护-文本', label: '文本类', icon: ICONS.文本类, href: '../pages/采集信息维护-文本.html' },
    ],
  },
  { key: '异常数据', label: '异常数据', icon: ICONS.异常数据, href: '../pages/异常数据.html' },
  { key: '报告中心', label: '报告中心', icon: ICONS.报告中心, href: '../pages/报告中心.html' },
];

/**
 * 渲染侧边栏
 * @param {string} activeKey 当前激活的菜单 key
 */
function renderSidebar(activeKey) {
  let html = `
    <div class="sidebar">
      <div class="sidebar-logo">
        <span class="logo-icon">IPV</span>
        <span class="logo-text">IPV采集管理平台</span>
      </div>
      <div class="sidebar-menu">
  `;

  MENU_CONFIG.forEach(item => {
    if (item.group) {
      html += `<div class="menu-group-title">${item.group}</div>`;
      item.items.forEach(sub => {
        const active = sub.key === activeKey ? 'active' : '';
        html += `
          <a class="menu-item ${active}" href="${sub.href}">
            <span class="menu-icon">${sub.icon}</span>
            <span>${sub.label}</span>
          </a>
        `;
      });
    } else {
      const active = item.key === activeKey ? 'active' : '';
      html += `
        <a class="menu-item ${active}" href="${item.href}">
          <span class="menu-icon">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      `;
    }
  });

  html += `
      </div>
      <div class="sidebar-footer">
        IPV Admin v1.0.0
      </div>
    </div>
  `;
  return html;
}

/**
 * 渲染顶部栏
 * @param {string[]} breadcrumb 面包屑路径
 */
function renderHeader(breadcrumb) {
  return `
    <div class="header">
      <div></div>
      <div class="header-right">
        <div class="header-icon" title="通知">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <div class="header-icon" title="设置">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </div>
        <div class="user-info">
          <span class="avatar">MZ</span>
          <span class="username">momo.zxy</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * 渲染页脚
 */
function renderFooter() {
  return `
    <div class="app-footer">
      <div class="footer-links">
        <a href="javascript:;">帮助</a>
        <a href="javascript:;">隐私</a>
        <a href="javascript:;">条款</a>
      </div>
      <div>copyright &copy; 2026 IPV采集管理平台</div>
    </div>
  `;
}

/**
 * 初始化页面布局
 * @param {object} options
 * @param {string} options.activeKey 当前激活菜单
 * @param {string[]} options.breadcrumb 面包屑
 * @param {string} options.contentHtml 内容HTML
 */
function initPage(options) {
  const { activeKey, breadcrumb, contentHtml } = options;
  const layoutHtml = `
    <div class="layout">
      ${renderSidebar(activeKey)}
      <div class="main">
        ${renderHeader(breadcrumb)}
        <div class="content">
          ${contentHtml}
        </div>
        ${renderFooter()}
      </div>
    </div>
    <div id="modal-root"></div>
  `;
  document.body.innerHTML = layoutHtml;
  document.body.setAttribute('data-page', activeKey);
  // 触发页面初始化钩子
  if (typeof onPageReady === 'function') {
    onPageReady();
  }
}

/* ===== 弹窗辅助函数 ===== */
function openModal(html) {
  const root = document.getElementById('modal-root');
  root.innerHTML = html;
  const mask = root.querySelector('.modal-mask');
  // 触发动画
  requestAnimationFrame(() => mask.classList.add('visible'));
  // 绑定关闭
  mask.addEventListener('click', e => {
    if (e.target === mask) closeModal();
  });
  mask.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  return mask;
}

function closeModal() {
  const root = document.getElementById('modal-root');
  const mask = root.querySelector('.modal-mask');
  if (mask) {
    mask.classList.remove('visible');
    setTimeout(() => { root.innerHTML = ''; }, 200);
  }
}

function openConfirm(options) {
  const {
    title = '确认操作',
    desc = '',
    okText = '确定',
    cancelText = '取消',
    okType = 'danger',
    onOk = () => {},
  } = options;
  const html = `
    <div class="modal-mask">
      <div class="modal confirm-modal">
        <div class="modal-body">
          <div class="confirm-icon">!</div>
          <div class="confirm-content">
            <div class="confirm-title">${title}</div>
            <div class="confirm-desc">${desc}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button data-close>${cancelText}</button>
          <button class="${okType}" id="confirm-ok">${okText}</button>
        </div>
      </div>
    </div>
  `;
  openModal(html);
  document.getElementById('confirm-ok').addEventListener('click', () => {
    closeModal();
    onOk();
  });
}

/* ===== 表格分页辅助 ===== */
function renderPagination(total, current = 1, pageSize = 10) {
  const totalPages = Math.ceil(total / pageSize);
  const pages = [];
  const maxBtns = 7;

  if (totalPages <= maxBtns) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return `
    <div class="pagination">
      <span class="total">共 ${total} 条记录</span>
      <div class="page-size">
        <span>第 ${current} / ${totalPages} 页</span>
      </div>
      <div class="page-list">
        <button class="page-btn" ${current === 1 ? 'disabled' : ''} data-page="${current - 1}">&lt;</button>
        ${pages.map(p => p === '...'
          ? `<button class="page-btn" disabled>...</button>`
          : `<button class="page-btn ${p === current ? 'active' : ''}" data-page="${p}">${p}</button>`
        ).join('')}
        <button class="page-btn" ${current === totalPages ? 'disabled' : ''} data-page="${current + 1}">&gt;</button>
      </div>
      <div class="page-jump">
        <span>跳至</span>
        <input type="number" min="1" max="${totalPages}" value="${current}" />
        <span>页</span>
      </div>
    </div>
  `;
}

/* ===== 工具函数 ===== */
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(date, withTime = true) {
  const d = new Date(date);
  const pad = n => String(n).padStart(2, '0');
  const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  if (!withTime) return dateStr;
  return `${dateStr} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * 信息分类联级数据（一/二/三级）
 */
const CATEGORY_TREE = [
  {
    value: '客观信息', label: '客观信息',
    children: [
      {
        value: '宏观环境', label: '宏观环境',
        children: [
          { value: '经济基础与购买力', label: '经济基础与购买力' },
          { value: '基础设施建设', label: '基础设施建设' },
          { value: '人口与劳动力', label: '人口与劳动力' },
        ],
      },
      {
        value: '技术参数', label: '技术参数',
        children: [
          { value: '电池', label: '电池' },
          { value: '电机', label: '电机' },
          { value: '电控', label: '电控' },
          { value: '整车性能', label: '整车性能' },
        ],
      },
      {
        value: '社会环境', label: '社会环境',
        children: [
          { value: '政策法规', label: '政策法规' },
          { value: '市场动态', label: '市场动态' },
          { value: '行业事件', label: '行业事件' },
        ],
      },
    ],
  },
  {
    value: '统计信息', label: '统计信息',
    children: [
      {
        value: '产销数据', label: '产销数据',
        children: [
          { value: '产量', label: '产量' },
          { value: '销量', label: '销量' },
          { value: '出口量', label: '出口量' },
        ],
      },
      {
        value: '企业信息', label: '企业信息',
        children: [
          { value: '企业规模', label: '企业规模' },
          { value: '财务指标', label: '财务指标' },
        ],
      },
    ],
  },
];

/**
 * 创建联级选择器
 * @param {string} placeholder 占位文字
 * @param {Function} onSelect(selectedPath) 选中回调，参数为 ['一级','二级','三级']
 * @returns {string} HTML 字符串（需后续绑定事件）
 */
function createCascader(placeholder, onSelect) {
  const id = 'cascader-' + Math.random().toString(36).substring(2, 9);
  const html = `
    <div class="cascader" id="${id}">
      <div class="cascader-trigger placeholder" onclick="toggleCascader('${id}')">
        <span class="cascader-text">${placeholder}</span>
        <span class="cascader-arrow">&#9662;</span>
      </div>
      <div class="cascader-dropdown"></div>
    </div>
  `;
  // 保存回调
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el._onSelect = onSelect;
    el._selected = [null, null, null];
    renderCascaderCols(id);
    // 点击外部关闭
    document.addEventListener('click', e => {
      if (!el.contains(e.target)) el.classList.remove('open');
    });
  }, 0);
  return html;
}

function toggleCascader(id) {
  const el = document.getElementById(id);
  el.classList.toggle('open');
}

function renderCascaderCols(id) {
  const el = document.getElementById(id);
  const selected = el._selected;
  const dropdown = el.querySelector('.cascader-dropdown');
  let html = '';
  // 第一列
  html += renderCascaderCol(CATEGORY_TREE, selected[0], 0, id);
  // 第二列
  if (selected[0]) {
    const lv1 = CATEGORY_TREE.find(n => n.value === selected[0]);
    if (lv1 && lv1.children) {
      html += renderCascaderCol(lv1.children, selected[1], 1, id);
    }
  }
  // 第三列
  if (selected[0] && selected[1]) {
    const lv1 = CATEGORY_TREE.find(n => n.value === selected[0]);
    const lv2 = lv1 && lv1.children.find(n => n.value === selected[1]);
    if (lv2 && lv2.children) {
      html += renderCascaderCol(lv2.children, selected[2], 2, id);
    }
  }
  dropdown.innerHTML = html;
}

function renderCascaderCol(options, selectedValue, level, id) {
  let html = '<div class="cascader-col">';
  options.forEach(opt => {
    const active = opt.value === selectedValue ? 'active' : '';
    const hasChildren = opt.children && opt.children.length > 0;
    const arrow = hasChildren ? '<span class="cascader-option-arrow">&#9656;</span>' : '';
    html += `<div class="cascader-option ${active}" onclick="selectCascaderOption('${id}', ${level}, '${opt.value}', ${hasChildren ? 'true' : 'false'})">
      <span>${opt.label}</span>${arrow}
    </div>`;
  });
  html += '</div>';
  return html;
}

function selectCascaderOption(id, level, value, hasChildren) {
  const el = document.getElementById(id);
  const selected = el._selected;
  selected[level] = value;
  // 清空下级
  if (level === 0) { selected[1] = null; selected[2] = null; }
  if (level === 1) { selected[2] = null; }

  renderCascaderCols(id);

  // 选中第三级或没有子级时触发回调
  if (level === 2 || !hasChildren) {
    // 若选中的层级不到第三级，但该项无子级，也算选中
    const trigger = el.querySelector('.cascader-trigger');
    const text = el.querySelector('.cascader-text');
    const path = [];
    if (selected[0]) path.push(selected[0]);
    if (selected[1]) path.push(selected[1]);
    if (selected[2]) path.push(selected[2]);
    text.textContent = path.join(' / ');
    trigger.classList.remove('placeholder');
    el.classList.remove('open');
    if (el._onSelect) el._onSelect(path);
  }
}
