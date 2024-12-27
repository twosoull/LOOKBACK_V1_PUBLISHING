document.addEventListener('DOMContentLoaded', () => {
    // 카테고리 버튼 동작
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  
    // 셀렉트 박스 동작
    const selectBtn = document.querySelector('.select-btn');
    const selectOptions = document.querySelector('.select-options');
    const categoryColors = {
      all: { border: '#ddd', text: '#333' }, // 기본 회색 테두리, 검정 텍스트
      upper: { border: '#E03E1A', text: '#E03E1A' }, // 빨강
      lower: { border: '#6532E9', text: '#6532E9' }, // 보라
      core: { border: '#41B06E', text: '#41B06E' }, // 초록
      stretch: { border: '#FF9843', text: '#FF9843' } // 주황
    };
  
    selectBtn.addEventListener('click', () => {
      selectOptions.style.display =
        selectOptions.style.display === 'block' ? 'none' : 'block';
    });
  
    selectOptions.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const category = e.target.dataset.category; // 선택한 카테고리
        selectBtn.querySelector('span').textContent = e.target.textContent; // 버튼 텍스트 변경
        selectOptions.style.display = 'none'; // 드롭다운 숨기기
  
        // 버튼 테두리와 텍스트 색상 변경
        const selectedColor = categoryColors[category];
        selectBtn.style.borderColor = selectedColor.border;
        selectBtn.style.color = selectedColor.text;
  
        // 선택된 카테고리를 chart.js로 전달
        if (window.updateChart) {
          window.updateChart(category); // chart.js의 함수 호출
        }
      }
    });
  
    // 스위치 버튼 동작
    const switchButtons = document.querySelectorAll('.switch-option');
    switchButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        switchButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
  