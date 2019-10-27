let time = 70;
let name = '香蕉';
let maxNum = 10;
let maxPre = 99;
let sum = 0;
let preSum = 0;

// 主流程：
$(function () {
    // 畫面初始化
    $('#time').text(`倒數時間：${time}秒`);
    $('#name').text(`商品名稱：${name}`);
    $('#num').text(`剩餘數量：${maxNum}`);
    // 秒數倒數
    setInterval(function () {
        if (time <= 0) {
            clearInterval();
        } else {
            frameColor();
            time -= 1;
            $('#time').text(`倒數時間：${time}秒`);
        }
    }, 1000);
})

// 判斷秒數使倒數框變色
function frameColor() {
    if (time > 60) {
        $('#time').css('border-color', 'green')
    } else if (time > 1) {
        $('#time').css('border-color', 'orange')
    } else {
        // 秒數歸0時停售，數量視窗、監聽器關閉
        $('#time').css('border-color', 'gray');
        $('#btn').text('停售');
        init();
        $('.popUp').hide();
    }

}

// 監聽器關閉(按鈕)
function init() {
    $('.icon').off();
    $('.ok').off();
    $('.less').off();
    $('.add').off();
}

// 購買/預購按鈕：判斷何種按鈕，去觸發方法
function get() {
    init();
    let turn = $('#btn').html();
    if (turn == '購買') {
        buy()
    } else if (turn == '預購') {
        preOrder()
    } else if (turn == '停售') {
        // 停售無法進行任何動作
        return
    }
    // 監聽器-數量視窗關閉按鈕
    $('.icon').click(function () {
        $('.popUp').hide();
    })
}

// 購買：顯示數量視窗=>啟動加減按鈕監聽器=>啟動確認按鈕監聽器
function buy() {
    $('.popUp').show();
    $('.popUp > h2').text('我要購買');
    // 加減按鈕監聽器，帶入參數：最大購買數10
    sumCheck(maxNum);

    // 確認按鈕監聽器
    $('.ok').click(function () {
        // 結算數據=>顯示畫面(剩餘數量歸零，購買按鈕改為預售)=>關閉數量視窗
        maxNum -= sum;
        $('#num').text(`剩餘數量：${maxNum}`);
        if (maxNum <= 0) {
            $('#btn').text('預購');
        }
        $('.popUp').hide();
    })
}

// 預購：顯示數量視窗=>啟動加減按鈕監聽器=>啟動確認按鈕監聽器
function preOrder() {
    sum = 0;
    $('.popUp').show();
    $('.popUp > h2').text('我要預購');
    // 加減按鈕監聽器，帶入參數：最大預購數99
    sumCheck(maxPre);
    
    // 確認按鈕監聽器
    $('.ok').click(function () {
        maxPre -= sum;
        preSum += sum;
        $('#preOrder').text(`預購數量：${preSum}`);
        $('.popUp').hide();
    })
}

// 數量視窗：帶入參數為最大數限(購買:10;預購:99)
function sumCheck(max) {
    sum = 0;
    $('.sum').text(sum);
    // 減按鈕：數量大於0才有作用
    $('.less').click(function () {
        if (sum > 0) {
            sum -= 1;
            $('.sum').text(sum);
        }
    });
    // 加按鈕：數量小低於最大數限才有作用
    $('.add').click(function () {
        if (sum < max) {
            sum += 1;
            $('.sum').text(sum);
        }
    })
}


