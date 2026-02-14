document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Market Analysis Charts (Chart.js) ---

    // Chart 1: Individual (1:2) Cost Comparison (Tuition + Maintenance)
    const ctxIndEl = document.getElementById('individualChart');
    if (ctxIndEl) {
        new Chart(ctxIndEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['全国相場', '徳島相場', '明光義塾(目安)', 'ITTO(目安)', 'スクールIE(目安)'],
                datasets: [{
                    label: '月謝総額目安 (授業料+諸費)',
                    data: [
                        [32000, 36000], // 全国 (授業料+諸費込に補正)
                        [32000, 36000], // 徳島 (授業料+諸費込に補正)
                        [31900, 34100], // 明光 (28600+3300諸費 〜 30800+3300)
                        [31350, 33880], // ITTO (28050+3300諸費 〜 30580+3300)
                        [32780, 34930]  // IE   (29480+3300諸費 〜 30630+4300)
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: '中学生 個別指導(1:2) 週2回 総額目安（授業料+諸費）' },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const raw = context.raw;
                                return `${context.label}: ${(raw[0] / 10000).toFixed(1)}万 〜 ${(raw[1] / 10000).toFixed(1)}万円`;
                            },
                            afterLabel: function () {
                                return '※各社、維持費・諸経費（約3,300〜4,000円）を加算した目安';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 25000,
                        max: 45000
                    }
                }
            }
        });
    } else {
        console.error("Canvas element 'individualChart' not found.");
    }

    // Chart 2: Cost Performance Strategy (5 Subjects)
    const ctxGroupEl = document.getElementById('groupChart');
    if (ctxGroupEl) {
        new Chart(ctxGroupEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['徳島大手集団(本科)', '徳島合計相場(個別+集団)', '個別指導相場(2科)', '当塾新プラン(5科)'],
                datasets: [{
                    label: '月謝レンジ (円)',
                    data: [
                        [37000, 62000], // 大手集団 (単体)
                        [62000, 92000], // 市場合計 (個別+集団)
                        [32000, 36000], // 個別相場 (諸費込に修正)
                        [30346, 31780]  // 当塾(週1+G)
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)', // 大手(赤)
                        'rgba(201, 203, 207, 0.5)', // 合計(グレー)
                        'rgba(54, 162, 235, 0.5)', // 個別(青)
                        'rgba(75, 192, 192, 0.8)'  // 当塾(緑)
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(201, 203, 207, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: '5教科対応時の月謝・総額比較' },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const raw = context.raw;
                                return `${context.label}: ${(raw[0] / 10000).toFixed(1)}万 〜 ${(raw[1] / 10000).toFixed(1)}万円`;
                            },
                            afterLabel: function (context) {
                                if (context.label === '徳島大手集団(本科)') {
                                    return '※集団単体の価格（合計相場は別）';
                                }
                                return '';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '月謝 (円)' }
                    }
                }
            }
        });
    } else {
        console.error("Canvas element 'groupChart' not found.");
    }

    // --- 2. Adjustment Fee Simulator ---
    const studentCountAdjInput = document.getElementById('student-count-adj');
    const adjResultBox = document.getElementById('adj-result');
    const ADJ_FEE_AVG = 4800; // 平均調整費

    function updateAdjSimulation() {
        if (!studentCountAdjInput || !adjResultBox) return;
        const students = parseInt(studentCountAdjInput.value) || 0;
        const monthlyRevenue = students * ADJ_FEE_AVG;
        const yearlyRevenue = monthlyRevenue * 12;

        adjResultBox.innerHTML = `
            <p>月間増収見込: <span class="highlight">¥${monthlyRevenue.toLocaleString()}</span></p>
            <p>年間増収見込: <span class="highlight">¥${yearlyRevenue.toLocaleString()}</span></p>
        `;
    }

    if (studentCountAdjInput) {
        studentCountAdjInput.addEventListener('input', updateAdjSimulation);
        updateAdjSimulation();
    }

    // --- 3. Group Lesson Simulator ---
    const groupStudentsInput = document.getElementById('group-students');
    const groupStudentsVal = document.getElementById('group-students-val');
    const groupPriceInput = document.getElementById('group-price');
    const teacherWageInput = document.getElementById('teacher-wage');
    const lessonHoursInput = document.getElementById('lesson-hours');
    const weeklyFreqInput = document.getElementById('weekly-frequency');

    const groupRevenueEl = document.getElementById('group-revenue');
    const groupCostEl = document.getElementById('group-cost');
    const groupProfitEl = document.getElementById('group-profit');
    const groupMarginEl = document.getElementById('group-margin');

    function updateGroupSimulation() {
        if (!groupStudentsInput) return;

        // Get values
        const students = parseInt(groupStudentsInput.value) || 0;
        const pricePerStudent = parseInt(groupPriceInput.value) || 0;
        const wage = parseInt(teacherWageInput.value) || 0;
        const hours = parseFloat(lessonHoursInput.value) || 0;
        const weeklyFreq = parseFloat(weeklyFreqInput.value) || 0;

        // UI Update for slider value
        if (groupStudentsVal) groupStudentsVal.textContent = students;

        // Calculations
        const monthlyRevenue = students * pricePerStudent;
        const monthlyCost = wage * hours * weeklyFreq * 4;
        const monthlyProfit = monthlyRevenue - monthlyCost;
        const margin = monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;

        // Update DOM
        if (groupRevenueEl) groupRevenueEl.textContent = `¥${monthlyRevenue.toLocaleString()}`;
        if (groupCostEl) groupCostEl.textContent = `¥${monthlyCost.toLocaleString()}`;
        if (groupProfitEl) {
            groupProfitEl.innerHTML = `¥${monthlyProfit.toLocaleString()}`;
            groupProfitEl.style.color = monthlyProfit >= 0 ? '#005c97' : '#d32f2f';
        }
        if (groupMarginEl) groupMarginEl.textContent = `${margin.toFixed(1)}%`;
    }

    const groupInputs = [groupStudentsInput, groupPriceInput, teacherWageInput, lessonHoursInput, weeklyFreqInput];
    groupInputs.forEach(input => {
        if (input) input.addEventListener('input', updateGroupSimulation);
    });

    updateGroupSimulation();

});
