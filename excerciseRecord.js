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
    const controlIcon = document.getElementsByClassName('control-icon'); // SVG 아이콘 선택

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
        Array.from(controlIcon).forEach((o)=>{
          o.style.stroke=selectedColor.text;
        })

        // 선택된 카테고리를 chart.js로 전달
        if (window.updateChart) {
          window.updateChart(category); // chart.js의 함수 호출
        }
      }
    });
  
    // 스위치 버튼 동작
    const switchButtons = document.querySelectorAll('.switch-option');
    // 주/월 전환
    switchButtons.forEach(button => {
      button.addEventListener('click', () => {
          // 버튼 활성화 상태 업데이트
          switchButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          // 컨테이너 표시/숨기기
          if (button.textContent === '주') {
              chartContainer.style.display = 'block';
              calendarContainer.style.display = 'none';
              calendarLegend.style.display = 'none'
              
          } else {
              chartContainer.style.display = 'none';
              calendarContainer.style.display = 'block';
              calendarLegend.style.display = 'flex'
          }
      });
  });
  const chartData = {
    upper: [1, 0, 1, 1, 0, 0, 1], // 임의의 데이터
    lower: [1, 1, 0, 0, 1, 1, 0], // 임의의 데이터
    core: [1, 0, 1, 1, 0, 1, 1], // 임의의 데이터
    stretch: [1, 1, 0, 0, 1, 0, 0], // 임의의 데이터
  };


  const calendar = new FullCalendar.Calendar(calendarContainer, {
    initialView: 'dayGridMonth',
    headerToolbar: false, // 월표시, today, 이전/다음 버튼 제거
    locale: 'ko', // 한국어로 설정
    dayHeaders: true, // 요일 헤더 사용
    dayHeaderContent({ date }) {
      const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
      return weekdays[date.getUTCDay()];
    },
    initialDate: new Date(), // 현재 날짜를 기준으로 해당 월만 표시
    events: [], // 큰 이벤트를 표시할 데이터
    contentHeight: 'auto', // 높이 자동 조정
    dayCellContent(info) {
      const dayNumber = info.date.getDate(); // 날짜 가져오기
      return { html: `<div>${dayNumber}</div>` }; // 날짜를 숫자로 표시
    },
    dayCellDidMount(info) {
      const dots = [];
      const day = info.date.getDate() - 1; // 0부터 시작하는 데이터 인덱스 맞춤
  
      if (chartData.upper[day]) dots.push('upper');
      if (chartData.lower[day]) dots.push('lower');
      if (chartData.core[day]) dots.push('core');
      if (chartData.stretch[day]) dots.push('stretch');
  
      if (dots.length > 0) {
        const dotContainer = document.createElement('div');
        dotContainer.className = 'dot-container';
  
        dots.forEach(dotType => {
          const dot = document.createElement('div');
          dot.className = `dot ${dotType}`;
          dotContainer.appendChild(dot);
        });
  
        info.el.appendChild(dotContainer);
      }
    },
  });
  
    // 달력 초기화
    calendar.render();
  
  
    calendarContainer.style.display = 'none'; // 기본적으로 달력 숨기기

      
  });
  