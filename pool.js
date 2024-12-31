
// گرفتن فرم و لیست تراکنش‌ها از صفحه
const form = document.querySelector('.transaction-form2');
const transactionsList = document.getElementById('transactions-list');
const submitAmountBtn = document.getElementById('submit-amount-btn');
const totalAmountInput = document.getElementById('total-amount');

// بازیابی تراکنش‌ها از localStorage و نمایش آن‌ها
function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.name}: €${transaction.amount}`;

        // ایجاد دکمه حذف
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.classList.add('delete-btn');

        // اضافه کردن دکمه حذف به آیتم
        li.appendChild(deleteButton);

        // افزودن آیتم به لیست
        transactionsList.appendChild(li);

        // افزودن رویداد برای دکمه حذف
        deleteButton.addEventListener('click', function() {
            removeTransaction(transaction.name); // حذف تراکنش از localStorage و لیست
            li.remove(); // حذف آیتم از لیست
        });
    });
}

// بارگذاری تراکنش‌ها از localStorage وقتی که صفحه بارگذاری می‌شود
window.onload = function () {
    loadTransactions();
    // نمایش فرم ثبت تراکنش و لیست تراکنش‌ها فقط زمانی که مبلغ کل وارد شده باشد
    const totalAmount = localStorage.getItem('totalAmount');
    if (totalAmount) {
        document.querySelector('.transaction-form2').style.display = 'block';
        document.querySelector('.transactions-list').style.display = 'block';
    }
};

// ثبت مبلغ کل
submitAmountBtn.addEventListener('click', function () {
    const totalAmount = totalAmountInput.value;
    if (totalAmount && totalAmount > 0) {
        // ذخیره مبلغ کل در localStorage
        localStorage.setItem('totalAmount', totalAmount);
        // بدون نمایش پیغام هشدار
        // نمایش فرم ثبت تراکنش و لیست تراکنش‌ها
        document.querySelector('.transaction-form2').style.display = 'block';
        document.querySelector('.transactions-list').style.display = 'block';
    }
});

// افزودن رویداد برای ارسال فرم
form.addEventListener('submit', function(event) {
    event.preventDefault(); // جلوگیری از ارسال فرم و بارگذاری مجدد صفحه

    // گرفتن مقادیر از فیلدهای ورودی
    const transactionName = document.getElementById('transaction-name').value;
    const transactionAmount = document.getElementById('transaction-amount').value;

    // اگر فیلدها پر شده باشند، اطلاعات را به لیست اضافه کن
    if (transactionName && transactionAmount) {
        const transaction = { name: transactionName, amount: transactionAmount };

        // اضافه کردن تراکنش جدید به localStorage
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        const li = document.createElement('li');
        li.textContent = `${transactionName}: €${transactionAmount}`;

        // ایجاد دکمه حذف
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.classList.add('delete-btn');

        // اضافه کردن دکمه حذف به آیتم
        li.appendChild(deleteButton);

        // اضافه کردن آیتم به لیست
        transactionsList.appendChild(li);

        // افزودن رویداد برای دکمه حذف
        deleteButton.addEventListener('click', function() {
            removeTransaction(transactionName); // حذف تراکنش از localStorage و لیست
            li.remove(); // حذف آیتم از لیست
        });

        // پاک کردن فیلدهای ورودی پس از ارسال
        document.getElementById('transaction-name').value = '';
        document.getElementById('transaction-amount').value = '';
    }
});

// حذف تراکنش از localStorage
function removeTransaction(transactionName) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = transactions.filter(transaction => transaction.name !== transactionName);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
}

// نمایش هشدار هنگام رفرش کردن صفحه
window.addEventListener('beforeunload', function (event) {
    // بررسی اینکه آیا داده‌ها در localStorage موجود هستند یا خیر
    const transactions = localStorage.getItem('transactions');
    const totalAmount = localStorage.getItem('totalAmount');

    // اگر داده‌ها موجود باشند، نمایش پیغام هشدار
    if (transactions || totalAmount) {
        const message = "تمام داده‌هایتان از بین خواهد رفت. مطمئنید که می‌خواهید صفحه را رفرش کنید؟";
        
        // این خط در بعضی مرورگرها الزامی است تا پیغام نشان داده شود
        event.returnValue = message;

        // در مرورگرهای دیگر
        return message;
    }
});

// پاک کردن تمام داده‌ها هنگام تایید رفرش
window.addEventListener('unload', function () {
    localStorage.removeItem('transactions');
    localStorage.removeItem('totalAmount');
});