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
    timeElement.textContent = ' ' + frenchTime; // جدا کردن تاریخ و ساعت با خط فاصله
}

// به‌روزرسانی هر ثانیه
setInterval(updateFrenchDateTime, 1000);

// نمایش اولیه
updateFrenchDateTime();

// تابع برای بارگذاری رویدادها از localStorage
function loadEvents() {
    try {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        return events;
    } catch (error) {
        console.error('Error loading events:', error);
        return [];
    }
}

// تابع برای ذخیره‌سازی رویدادها در localStorage
function saveEvents(events) {
    try {
        localStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
        console.error('Error saving events:', error);
    }
}

// تابع برای حذف یک رویداد
function deleteEvent(event) {
    const index = event.target.getAttribute('data-index'); // گرفتن ایندکس رویداد
    const events = loadEvents();  // بارگذاری رویدادها

    // حذف رویداد از آرایه
    events.splice(index, 1);

    // ذخیره مجدد رویدادها در localStorage
    saveEvents(events);
    renderEvents(); // بارگذاری مجدد رویدادها و نمایش آن‌ها
}

// بارگذاری و نمایش رویدادها در صفحه
function renderEvents() {
    try {
        const events = loadEvents();
        const eventList = document.getElementById('events');
        eventList.innerHTML = ''; // پاک کردن لیست موجود

        if (events.length === 0) {
            eventList.innerHTML = '<p>هیچ رویدادی وجود ندارد!</p>';
            return;
        }

        events.forEach((event, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>تیتر:</strong> ${event.title} <br>
                            <strong>تاریخ:</strong> ${event.date} <br>
                            <strong>ساعت:</strong> ${event.time} <br>
                            <strong>توضیحات:</strong> ${event.description} <br>
                            <button class="delete-btn" data-index="${index}">حذف</button>`;
            eventList.appendChild(li);
        });

        // اضافه کردن رویداد به دکمه حذف
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteEvent);
        });
    } catch (error) {
        console.error('Error rendering events:', error);
    }
}

// اضافه کردن رویداد جدید به لیست
document.getElementById('add-event-btn').addEventListener('click', function () {
    const title = document.getElementById('event-title').value.trim();
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value.trim();

    const today = new Date();
    const selectedDate = new Date(date);

    if (!title || !date || !time || !description) {
        alert('لطفاً تمام فیلدها را پر کنید!');
        return;
    }

    if (selectedDate < today) {
        alert('تاریخ وارد شده نباید از امروز کمتر باشد.');
        return;
    }

    const events = loadEvents();
    events.push({ title, date, time, description });
    saveEvents(events);
    renderEvents();

    // پاک کردن فرم
    document.getElementById('event-title').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-time').value = '';
    document.getElementById('event-description').value = '';
});

// بارگذاری اولیه رویدادها
renderEvents();
