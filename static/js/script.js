$(function () {

    //サウンド選択画面
    $('#soundEnable').on('click', function () {
        $('.audioModal').fadeOut();
        var media = document.getElementById('audio');
        media.volume = 0.1;
        media.play();
        $('#play').hide();
        $('#mute').show();
    });
    $('#soundDisable').on('click', function () {
        $('.audioModal').fadeOut();
    });

    //発言ボタンクリック
    $('#write').on('click', function () {
        $('.effect-wrap').removeClass('open');
        $('.response-wrap').removeClass('open');
        $('.write-wrap').addClass('open');
        $('.callMenu').removeClass('active');
        $(this).addClass('active');
    });

    //連鎖ボタンクリック
    $('#response').on('click', function () {
        $('.effect-wrap').removeClass('open');
        $('.write-wrap').removeClass('open');
        $('.response-wrap').addClass('open');
        $('.callMenu').removeClass('active');
        $(this).addClass('active');
    });

    //影響ボタンクリック
    $('#effect').on('click', function () {
        $('.write-wrap').removeClass('open');
        $('.response-wrap').removeClass('open');
        $('.effect-wrap').addClass('open');
        $('.callMenu').removeClass('active');
        $(this).addClass('active');
    });

    //領域外クリック
    $(document).on('click', function (e) {
        //発言操作時
        if (!$(e.target).closest('.write-wrap,#write,#play,#mute,#messageReload').length) {
            $('.callMenu').removeClass('active');
            $('.write-wrap').removeClass('open');
            $('.write-wrap .desc strong').removeClass('link');
        }
        //連鎖操作時
        if (!$(e.target).closest('.response-wrap,#response,#play,#mute,#messageReload').length) {
            $('.callMenu').removeClass('active');
            $('.response-wrap').removeClass('open');
        }
        //影響操作時
        if (!$(e.target).closest('.effect-wrap,#effect,#play,#mute,#messageReload').length) {
            $('.callMenu').removeClass('active');
            $('.effect-wrap').removeClass('open');
        }
        //返答操作時
        if (!$(e.target).closest('#details,.message,#play,#mute').length) {
            $('.callMenu').removeClass('active');
            $('#details').removeClass('open');
            $('.message-wrap').removeClass('move');
            $('#id_parent').val('');
        }
    });

    //メッセージクリック
    $(document).on('click', 'li.message', function () {
        const id = $(this).children('input').val();
        $.ajax({
            //POST通信
            type: "post",
            //ここでデータの送信先URLを指定します。
            url: '/app/ajax/details_message/',
            data: {
                id: id,
            }
        })
            //通信が成功したとき
            .then((res) => {
                $('.chain').html(res);
                $('#details').addClass('open');
                $('.message-wrap').addClass('move');
                $('#details').addClass('open');
                if($('#lastID').val() > 0){
                    $('#chainMessage').prop('disabled', false);
                    $('#id_reply').prop('disabled', false);
                }else{
                    $('#chainMessage').prop('disabled', true);
                    $('#id_reply').prop('disabled', true);
                }
            })
            //通信が失敗したとき
            .fail((error) => {
                console.log(error.statusText);
            });
    });

    //メッセージを閉じる
    $(document).on('click', '#closeDetails', function () {
        $('#details').removeClass('open');
        $('.message-wrap').removeClass('move');
    });


    //ログアウトボタンクリック
    $('#logoutbtn').on('click', function () {
        $('#logoutModal').fadeIn();
    })

    //ログアウトキャンセル
    $('#logoutModal .background, #logoutCancel').on('click', function () {
        $('#logoutModal').fadeOut();
    })

    //スピーカーON
    $('#play').on('click', function () {
        var media = document.getElementById('audio');
        media.volume = 0.1;
        media.play();
        $(this).hide();
        $('#mute').show();
    });

    //スピーカーOFF
    $('#mute').on('click', function () {
        var media = document.getElementById('audio');
        media.pause();
        media.currentTime = 0;
        $(this).hide();
        $('#play').show();
    });

    //言葉リロード
    $(document).on('click', '#messageReload', function () {
        $.ajax({
            //POST通信
            type: "post",
            //ここでデータの送信先URLを指定します。
            url: '/app/ajax/reload_message/',
        })
            //通信が成功したとき
            .then((res) => {
                $('.message-wrap').html(res);
                $('.message').each(function (i, e) {
                    $(e).delay(i * 500).queue(function () {
                        $(this).addClass('show')
                    });
                });
            })
            //通信が失敗したとき
            .fail((error) => {
                console.log(error.statusText);
            });
    })

});
