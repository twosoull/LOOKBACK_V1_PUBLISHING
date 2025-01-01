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
  const addToModal = (id, title, imageSrc, button) => {
    // 이미 모달에 같은 ID의 항목이 있는지 확인
    if (document.querySelector(`.modal-item[data-id="${id}"]`)) return;

    const modalItem = document.createElement('div');
    modalItem.classList.add('modal-item');
    modalItem.dataset.id = id; // 고유 식별자 저장
    modalItem.innerHTML = `
      <div class="modal-image-container">
        <img src="${imageSrc}" alt="${title}">
        <button class="close-btn" data-id="${id}">×</button>
      </div>
      <div class="item-text">${title.slice(0, 3)}...</div>
    `;

    // 모달 닫기 버튼 동작
    modalItem.querySelector('.close-btn').addEventListener('click', (e) => {
      e.stopPropagation(); // 이벤트 전파 방지
      const targetId = e.target.dataset.id;

      removeFromModal(targetId); // 모달에서 항목 제거
      const relatedButton = Array.from(selectButtons).find(btn => {
        const parent = btn.closest('.exercise-item-container');
        return parent.dataset.id === targetId;
      });
      if (relatedButton) {
        relatedButton.textContent = '선택'; // 버튼 텍스트 복원
        relatedButton.classList.remove('selected'); // 스타일 초기화
      }
      updateModalVisibility(); // 모달 상태 업데이트
    });

    modalContainer.appendChild(modalItem);
    updateModalVisibility(); // 모달 상태 업데이트
  };

  // 모달에서 항목 제거 함수
  const removeFromModal = (id) => {
    const modalItem = document.querySelector(`.modal-item[data-id="${id}"]`);
    if (modalItem) modalItem.remove();
    updateModalVisibility(); // 모달 상태 업데이트
  };

  // 콘텐츠의 선택/취소 버튼 동작
  selectButtons.forEach(button => {
    const parent = button.closest('.exercise-item-container');
    const id = parent.dataset.id; // 고유 식별자
    const title = parent.querySelector('.exercise-title').textContent.trim();
    const imageSrc = parent.querySelector('.exercise-image img').src;

    button.addEventListener('click', () => {
      if (!button.classList.contains('selected')) {
        // 선택 상태로 전환
        addToModal(id, title, imageSrc, button);
        button.textContent = '취소'; // 버튼 텍스트 변경
        button.classList.add('selected'); // 스타일 활성화
      } else {
        // 취소 상태로 전환
        removeFromModal(id); // 모달에서 항목 제거
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
