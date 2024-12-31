// گرفتن عنصر canvas برای رسم نمودار
const ctx = document.getElementById('expenseChart').getContext('2d');

// ایجاد نمودار دایره‌ای (Doughnut Chart)
const expenseChart = new Chart(ctx, {
    type: 'doughnut', // نوع نمودار
    data: {
        labels: ['Food', 'Rent', 'Entertainment', 'Utilities'], // برچسب‌ها
        datasets: [{
            label: 'Expenses', // نام مجموعه داده
            data: [300, 500, 200, 100], // داده‌ها
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // رنگ‌ها
            hoverOffset: 4 // جابجایی هنگام هاور
        }]
    },
    options: {
        responsive: true, // نمودار واکنش‌گرا باشد
        plugins: {
            legend: {
                display: true, // نمایش راهنما
                position: 'bottom' // موقعیت راهنما
            },
            tooltip: {
                enabled: true // فعال‌سازی توضیحات هنگام هاور
            }
        }
    }
});

// اضافه کردن متن به مرکز نمودار
Chart.register({
    id: 'centerText', // شناسه پلاگین
    beforeDraw(chart) {
        const {width} = chart; // گرفتن عرض نمودار
        const ctx = chart.ctx; // گرفتن context برای رسم متن

        ctx.save();
        ctx.font = '16px Arial'; // فونت متن
        ctx.textAlign = 'center'; // متن وسط‌چین
        ctx.textBaseline = 'middle'; // متن وسط از نظر عمودی

        const text = 'Total: $1100'; // متن وسط نمودار
        const x = width / 2; // موقعیت X متن
        const y = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2; // موقعیت Y متن

        ctx.fillStyle = '#333'; // رنگ متن
        ctx.fillText(text, x, y); // رسم متن
    }
});
