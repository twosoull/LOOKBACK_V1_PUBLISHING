document.addEventListener('DOMContentLoaded', () => {
    const moreBtn = document.getElementById('more-btn');
    const popup = document.getElementById('more-popup');

    // "더 보기" 버튼 클릭 이벤트
    moreBtn.addEventListener('click', (event) => {
      event.stopPropagation(); // 이벤트 전파 방지
      popup.classList.toggle('show'); // 팝업 표시/숨김 토글
    });

    // 팝업 외부 클릭 시 닫기
    document.addEventListener('click', (event) => {
      if (!popup.contains(event.target) && event.target !== moreBtn) {
        popup.classList.remove('show'); // 팝업 숨기기
      }
    });

    //삭제팝업
    const deletePopup = document.getElementById('delete-popup');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const overlay = document.createElement('div'); // 오버레이 생성
  
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = 1000;
    overlay.style.display = 'none';
  
    document.body.appendChild(overlay);
  
    // "운동기록 삭제" 버튼 클릭 이벤트
    const deletePopupTrigger = document.querySelector('.detail-popup-item:nth-child(3)'); // "운동기록 삭제" 항목
    deletePopupTrigger.addEventListener('click', () => {
      deletePopup.classList.add('show');
      overlay.style.display = 'block';
    });
  
    // "취소" 버튼 클릭 이벤트
    cancelBtn.addEventListener('click', () => {
      closeDeletePopup();
    });
  
    // 팝업 외부 클릭 시 닫기
    overlay.addEventListener('click', () => {
      closeDeletePopup();
    });
  
    // 팝업 닫기 함수
    function closeDeletePopup() {
      deletePopup.classList.remove('show');
      overlay.style.display = 'none';
    }
  
    // "삭제" 버튼 클릭 이벤트 (여기서는 알림만 표시)
    confirmDeleteBtn.addEventListener('click', () => {
      alert('운동기록이 삭제되었습니다!');
      closeDeletePopup();
    });
  });