document.addEventListener('DOMContentLoaded', () => {
    const selectButtons = document.querySelectorAll('.exercise-select-btn');
    const modal = document.getElementById('exerciseModal');
    const modalContainer = document.querySelector('.modal-items-container');
  
    // 모달 상태 업데이트 함수
    const updateModalVisibility = () => {
      if (modalContainer.children.length > 0) {
        modal.classList.add('show'); // 항목이 있으면 모달 표시
      } else {
        modal.classList.remove('show'); // 항목이 없으면 모달 숨김
      }
    };
  
    // 모달에 항목 추가 함수
    const addToModal = (title, imageSrc, button) => {
      const modalItem = document.createElement('div');
      modalItem.classList.add('modal-item');
      modalItem.dataset.title = title; // 고유 식별자용 데이터 속성
      modalItem.innerHTML = `
        <div class="modal-image-container">
          <img src="${imageSrc}" alt="운동 이미지">
          <button class="close-btn" data-title="${title}">×</button>
        </div>
        <div class="item-text">${title.slice(0, 3)}...</div>
      `;
      modalContainer.appendChild(modalItem);
  
      // 모달 내 닫기 버튼 동작
      modalItem.querySelector('.close-btn').addEventListener('click', (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        const targetTitle = e.target.dataset.title;
        removeFromModal(targetTitle); // 모달에서 해당 항목 제거
        button.textContent = '선택'; // 버튼 상태 초기화
        button.classList.remove('selected'); // 버튼 스타일 초기화
        updateModalVisibility(); // 모달 상태 업데이트
      });
  
      updateModalVisibility(); // 모달 상태 업데이트
    };
  
    // 모달에서 항목 제거 함수
    const removeFromModal = (title) => {
      Array.from(modalContainer.children).forEach(item => {
        if (item.dataset.title === title) {
          item.remove(); // 정확히 일치하는 항목만 삭제
        }
      });
      updateModalVisibility(); // 모달 상태 업데이트
    };
  
    // 콘텐츠의 선택/취소 버튼 동작
    selectButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        const parent = button.closest('.exercise-item-container');
        const title = parent.querySelector('.exercise-title').textContent.trim();
        const imageSrc = parent.querySelector('.exercise-image img').src;
  
        if (button.textContent === '선택') {
          // 선택 상태로 전환
          addToModal(title, imageSrc, button);
          button.textContent = '취소'; // 버튼 텍스트 변경
          button.classList.add('selected'); // 스타일 변경
        } else {
          // 취소 상태로 전환
          removeFromModal(title); // 모달에서 항목 제거
          button.textContent = '선택'; // 버튼 텍스트 복원
          button.classList.remove('selected'); // 스타일 복원
        }
      });
    });
  
    // 모달 외부 클릭으로 닫히는 로직 제거
    modal.addEventListener('click', (e) => {
      e.stopPropagation(); // 모달 내부 클릭은 이벤트 전파 방지
    });
  });
  