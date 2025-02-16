document.addEventListener('DOMContentLoaded', () => {
    // 카테고리 버튼 동작
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  
    const footerItems = document.querySelectorAll(".footer-item");
  
    footerItems.forEach(item => {
      item.addEventListener("click", () => {
        // 모든 항목의 active 제거
        footerItems.forEach(el => el.classList.remove("active"));
        // 클릭한 항목에 active 추가
        item.classList.add("active");
      });
    });
    
    const dateInput = document.getElementById("record-date");
    const dateDisplay = document.getElementById("record-display");

    const startTimeInput = document.getElementById("start-time");
    const startTimeDisplay = document.getElementById("start-time-display");

    const endTimeInput = document.getElementById("end-time");
    const endTimeDisplay = document.getElementById("end-time-display");

    // 기본값: 오늘 날짜
    const today = new Date();
    dateInput.value = today.toISOString().split("T")[0];
    dateDisplay.value = formatDate(today);

    // 기본값: 1시간 전 ~ 현재 시간
    const oneHourBefore = new Date();
    oneHourBefore.setHours(today.getHours() - 1);

    startTimeInput.value = oneHourBefore.toTimeString().slice(0, 5);
    endTimeInput.value = today.toTimeString().slice(0, 5);

    startTimeDisplay.value = formatTime(oneHourBefore);
    endTimeDisplay.value = formatTime(today);

    // 클릭하면 Date Picker 표시
    dateDisplay.addEventListener("click", function () {
      dateInput.showPicker();
    });

    dateInput.addEventListener("change", function () {
      dateDisplay.value = formatDate(this.value);
    });

    // 클릭하면 Time Picker 표시
    startTimeDisplay.addEventListener("click", function () {
      startTimeInput.showPicker();
    });

    endTimeDisplay.addEventListener("click", function () {
      endTimeInput.showPicker();
    });

    startTimeInput.addEventListener("change", function () {
      const date = new Date();
      const [hours, minutes] = this.value.split(":");
      date.setHours(hours, minutes);
      startTimeDisplay.value = formatTime(date);
    });

    endTimeInput.addEventListener("change", function () {
      const date = new Date();
      const [hours, minutes] = this.value.split(":");
      date.setHours(hours, minutes);
      endTimeDisplay.value = formatTime(date);
    });

    
    
      
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }

  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours >= 12 ? "오후" : "오전";
    hours = hours % 12 || 12;
    return `${period} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  