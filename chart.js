document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('exerciseChart').getContext('2d');
  
    // 데이터 정의
    const chartData = {
      all: [60, 120, 90, 45, 75, 30, 60], // 전체 데이터
      upper: [20, 40, 30, 15, 25, 10, 20], // 상체 데이터
      lower: [15, 30, 25, 10, 20, 8, 15],  // 하체 데이터
      core: [10, 20, 15, 8, 12, 5, 10],    // 코어 데이터
      stretch: [15, 30, 20, 12, 18, 7, 15] // 스트레칭 데이터
    };
  
    // 차트 초기화
    const exerciseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['12/21', '12/22', '12/23', '12/24', '12/25', '12/26', '12/27'], // 날짜 라벨
        datasets: [
          {
            label: '전체',
            data: chartData.all,
            backgroundColor: 'rgba(0, 0, 0, 1)', // 검은색 (전체 데이터)
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            barThickness: 15, // 막대 두께 고정
            maxBarThickness: 15 // 최대 두께 고정
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // 비율 고정 해제
        layout: {
          padding: {
            top: 10 // 차트 상단 여백 추가
          }
        },
        plugins: {
          legend: {
            display: false // 범례 숨기기
          }
        },
        scales: {
          x: {
            stacked: true, // X축 스택 활성화
            grid: {
              display: false
            },
            title: {
              display: true,
              color: '#757575',
              font: {
                size: 12
              }
            }
          },
          y: {
            stacked: true, // Y축 스택 활성화
            position: 'right', // Y축 오른쪽으로 이동
            ticks: {
              stepSize: 60, // 1시간 단위
              callback: (value) => `${value / 60}h`, // 시간 형식으로 변환
              color: '#757575',
              font: {
                size: 12
              }
            },
            grid: {
              color: '#EAEAEA', // 점선 색상
              borderDash: [1, 1],
              lineWidth: 1
            }
          }
        }
      }
    });
  
    // 전역 함수로 chart.js 업데이트를 common.js에서 호출 가능하게 등록
    window.updateChart = (category) => {
      if (category === 'all') {
        // "전체" 선택 시
        exerciseChart.data.datasets = [
          {
            label: '전체',
            data: chartData.all,
            backgroundColor: 'rgba(0, 0, 0, 1)', // 검은색 막대
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            barThickness: 15, // 막대 두께 고정
            maxBarThickness: 15
          }
        ];
      } else {
        // 특정 카테고리 선택 시
        exerciseChart.data.datasets = [
          {
            label: category,
            data: chartData[category],
            backgroundColor: getCategoryColor(category), // 카테고리 색상
            borderColor: getCategoryColor(category, true),
            borderWidth: 1,
            barThickness: 15, // 막대 두께 고정
            maxBarThickness: 15
          },
          {
            label: '전체',
            data: chartData.all,
            backgroundColor: '#EAEAEA', // 회색
            borderColor: '#EAEAEA',
            borderWidth: 1,
            barThickness: 15, // 막대 두께 고정
            maxBarThickness: 15
          }
        ];
      }
  
      exerciseChart.update(); // 차트 업데이트
    };
  
    // 카테고리별 색상을 반환하는 함수
    const getCategoryColor = (category, isBorder = false) => {
      const colors = {
        upper: ['#E03E1A', '#E03E1A'], // 빨강
        lower: ['#6532E9', '#6532E9'], // 보라
        core: ['#41B06E', '#41B06E'], // 초록
        stretch: ['#FF9843', '#FF9843'] // 초록
      };
      return colors[category] ? colors[category][isBorder ? 1 : 0] : 'rgba(0, 0, 0, 0.7)';
    };

  });
  