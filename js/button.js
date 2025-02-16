// 모든 필터 버튼을 관리하는 함수
function setupFilterButtons() {
    // 각 필터 그룹에서 버튼을 찾아 처리
    const filterGroups = document.querySelectorAll('.filter-buttons'); // 필터 그룹
    
    filterGroups.forEach(group => {
      const buttons = group.querySelectorAll('.filter-btn'); // 그룹 내 모든 버튼
      
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          // 이전에 활성화된 버튼에서 active 클래스 제거
          group.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          
          // 클릭된 버튼에 active 클래스 추가
          button.classList.add('active');
        });
      });
    });
  }
  
  // 페이지가 로드된 후 스크립트 초기화
  document.addEventListener('DOMContentLoaded', () => {
    setupFilterButtons();

    // 최근/자주 버튼 클릭 이벤트
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
        tab.classList.toggle('active'); // 각 버튼 개별 활성화/비활성화
        });
    });

    const sortBtn = document.querySelector('.sort-btn');
    const sortModal = document.getElementById('sortModal');
    const sortOptions = document.querySelectorAll('.sort-option');
    const sortBtnText = sortBtn.querySelector('span');
  
    // 정렬 버튼 클릭 시 모달 표시/숨기기
    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // 이벤트 전파 방지
      sortModal.classList.toggle('show');
    });
  
    // 옵션 클릭 이벤트
    sortOptions.forEach(option => {
      option.addEventListener('click', () => {
        // 모든 옵션의 선택 상태 초기화
        sortOptions.forEach(opt => opt.classList.remove('selected'));
  
        // 현재 선택된 옵션에 선택 상태 추가
        option.classList.add('selected');
  
        // 정렬 버튼 텍스트 변경
        sortBtnText.textContent = option.textContent;
  
        // 모달 닫기
        sortModal.classList.remove('show');
      });
    });
  
    // 모달 외부 클릭 시 닫기
    document.addEventListener('click', () => {
      sortModal.classList.remove('show');
    });

    // 별 버튼 클릭 이벤트
    const starButtons = document.querySelectorAll('.exercise-star-btn');
    starButtons.forEach(star => {
        star.addEventListener('click', () => {
        star.classList.toggle('active'); // 활성화 상태 토글
        });
    });

  });
  