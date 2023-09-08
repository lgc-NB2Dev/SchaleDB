function utilStuLoad(name) {
  loadModule('students');
  loadStudent(name);
}

/**
 * @param {string} selector
 * @param {number} val，设为 max 留空（undefined, null）或填 0
 */
function utilStuSetProgress(selector, val) {
  const obj = $(selector);
  if (!obj.is('input[type="range"]')) {
    console.warn(`utilStuSetProgress: invalid selector "${selector}"`);
    return;
  }
  const min = Number(obj.attr('min')) || 1;
  const max = Number(obj.attr('max')) || 1;
  obj.val(val && val >= min && val <= max ? val : max).trigger('input');
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
// profile 加载在 gear 之后
$('#ba-student-fullname').on('DOMNodeInserted', () => {
  // 0s timeout 以防检测可见出错
  setTimeout(() => {
    const gearObj = $('#ba-student-page-gear');
    if ($('#ba-student-tab-gear').is(':visible'))
      gearObj.addClass('show active');
    else gearObj.removeClass('show active');
  });
});

$(() => {
  const cardHeaderElem = $('.card-header');
  const cardBodyElem = $('.card-body');
  const stuPageChildren = cardBodyElem.children('.tab-content').children();

  // extract nav object end remove itself
  const navElem = cardHeaderElem.children('nav#ba-item-list-tabs');
  navElem.children().removeClass('active');
  navElem.remove();

  // move card header elements to card body and remove card header
  const headerChildren = cardHeaderElem.children();
  cardBodyElem.prepend(headerChildren);
  cardHeaderElem.remove();

  // append nav to stu page children
  stuPageChildren.each((_, elem) => {
    const navClone = navElem.clone();
    const pageName = elem.id.replace('ba-student-page-', '');
    navClone.children(`#ba-student-tab-${pageName}`).addClass('active');

    $(elem).prepend(navClone);
    elem.classList.add('show', 'active');
  });
});
