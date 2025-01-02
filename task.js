// تابع به‌روزرسانی تاریخ و زمان به زبان فرانسوی
function updateFrenchDateTime() {
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    const now = new Date();

    // تنظیمات نمایش تاریخ به زبان فرانسوی
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const frenchDate = new Intl.DateTimeFormat('fr-FR', dateOptions).format(now);

    // تنظیمات نمایش ساعت
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const frenchTime = new Intl.DateTimeFormat('fr-FR', timeOptions).format(now);

    // نمایش تاریخ و ساعت
    dateElement.textContent = frenchDate;
    timeElement.textContent = ' - ' + frenchTime; // جدا کردن تاریخ و ساعت با خط فاصله
}

// به‌روزرسانی هر ثانیه
setInterval(updateFrenchDateTime, 1000);

// نمایش اولیه
updateFrenchDateTime();

// اضافه کردن رویداد جدید به لیست
document.getElementById('add-event-btn').addEventListener('click', function () {
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value;

    if (title && date && time && description) {
        const eventList = document.getElementById('events');
        const li = document.createElement('li');

        li.innerHTML = `<strong>تیتر:</strong> ${title} <br>
                        <strong>تاریخ:</strong> ${date} <br>
                        <strong>ساعت:</strong> ${time} <br>
                        <strong>توضیحات:</strong> ${description}`;

        eventList.appendChild(li);

        // پاک کردن فرم
        document.getElementById('event-title').value = '';
        document.getElementById('event-date').value = '';
        document.getElementById('event-time').value = '';
        document.getElementById('event-description').value = '';
    } else {
        alert('لطفاً تمام فیلدها را پر کنید!');
    }
});
