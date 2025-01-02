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


function renderEvents() {
    try {
        const events = loadEvents();
        const eventList = document.getElementById('events');
        const template = document.getElementById('event-template');  // دریافت template

        eventList.innerHTML = ''; // پاک کردن لیست موجود

        if (events.length === 0) {
            eventList.innerHTML = '<p>هیچ رویدادی وجود ندارد!</p>';
            return;
        }

        events.forEach((event, index) => {
            const clone = template.content.cloneNode(true);  // ایجاد یک کپی از template

            // پر کردن مقادیر در template
            clone.querySelector('.event-title').textContent = event.title;
            clone.querySelector('.event-date').textContent = event.date;
            clone.querySelector('.event-time').textContent = event.time;
            clone.querySelector('.event-description').textContent = event.description;

            // تنظیم داده‌های حذف
            const deleteBtn = clone.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteEvent(index);
            });

            eventList.appendChild(clone);  // اضافه کردن به لیست
        });
    } catch (error) {
        console.error('Error rendering events:', error);
    }
}

// تابع برای حذف رویداد
function deleteEvent(index) {
    const events = loadEvents();
    events.splice(index, 1);  // حذف رویداد
    saveEvents(events);
    renderEvents();  // به‌روزرسانی نمایش رویدادها
}

function saveEvents(events) {
    try {
        localStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
        console.error('Error saving events:', error);
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
