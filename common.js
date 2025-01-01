document.addEventListener('DOMContentLoaded', () => {
    // 카테고리 버튼 동작
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  
      
  });
  