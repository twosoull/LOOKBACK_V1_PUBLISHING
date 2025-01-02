const addButton = document.querySelector('.add-btn');
const actionMenu = document.querySelector('#actionMenu');

// + 버튼 클릭 이벤트
addButton.addEventListener('click', () => {
  actionMenu.classList.toggle('show'); // 메뉴 표시/숨기기 토글
});

// 문서 다른 곳 클릭 시 메뉴 숨기기
document.addEventListener('click', (e) => {
  if (!addButton.contains(e.target) && !actionMenu.contains(e.target)) {
    actionMenu.classList.remove('show');
  }
});