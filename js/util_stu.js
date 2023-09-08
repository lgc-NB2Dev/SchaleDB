function utilStuLoad(name) {
  loadModule('students');
  loadStudent(name);
}

/**
 * @param {string} selector
 * @param {number} val，设为 max 留空（undefined, null）或填 0
 */
function utilStuSetProgress(selector, val) {
  /** @type {HTMLInputElement} */
  const obj = $(selector)[0];
  if (!(obj && obj.tagName === 'INPUT' && obj.type === 'range')) {
    console.warn(`utilStuSetProgress: invalid selector "${selector}"`);
    return;
  }

  const min = Number(obj.min) || 1;
  const max = Number(obj.max) || 1;
  obj.value = val && val >= min && val <= max ? val : max;
  obj.dispatchEvent(new Event('input'));
}

function utilStuSetStatLvl(lvl) {
  utilStuSetProgress('#ba-statpreview-levelrange', lvl);
}

function utilStuSetExSkillLvl(lvl) {
  utilStuSetProgress('#ba-skillpreview-exrange', lvl);
}

function utilStuSetSkillLvl(lvl) {
  utilStuSetProgress('#ba-skillpreview-range', lvl);
}

function utilStuSetWeaponLvl(lvl) {
  utilStuSetProgress('#ba-weaponpreview-levelrange', lvl);
}

function utilStuSetWeaponSkillLvl(lvl) {
  utilStuSetProgress('#ba-weapon-skillpreview-range', lvl);
}

function utilStuSetGearLvl(lvl) {
  utilStuSetProgress('#ba-gear-skillpreview-range', lvl);
}

function utilStuSetAllProgressMax() {
  utilStuSetStatLvl();
  utilStuSetExSkillLvl();
  utilStuSetSkillLvl();
  utilStuSetWeaponLvl();
  utilStuSetWeaponSkillLvl();
  utilStuSetGearLvl();
}

// 设置爱用品自动收缩展开
// profile加载在gear之后
$('#ba-student-fullname').bind('DOMNodeInserted', () => {
  // 0s timeout以防检测可见出错
  setTimeout(() => {
    const gearObj = $('#ba-student-page-gear');
    if ($('#ba-student-tab-gear').is(':visible'))
      gearObj.addClass('show active');
    else gearObj.removeClass('show active');
  });
});
