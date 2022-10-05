$(function () {

    //セリフフラグ
    var talkCapacity = 0;
    //サウンドフラグ
    var soundFlag = false;

    //ランダム
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    //サウンドフラグ管理
    $('#soundEnable,#play').on('click',function(){
        soundFlag = true;
    })
    $('#mute').on('click',function(){
        soundFlag = false;
    })

    //読み込み完了後
    $('#soundEnable,#soundDisable').on('click', function () {
        setTimeout(function(){
            var text1 = 'ナビゲーターを起動します。';
            var text2 = '…起動完了';
            var text3 = 'インターフェースを表示します。'
            if (talkCapacity == 0) {
                talkCapacity = 1;

                $('#brain .word').text(text1);
                $('.eachTextAnime').html(setAndroidText('#brain .word'));
                TextFadeInAnime();
                $('.cube div').addClass('startup');
                if(soundFlag){
                    media = document.getElementById('audio-StartUp1');
                    media.volume = 0.3;
                    media.play();
                }
                setTimeout(function () {
                    $('#brain .word').text(text2);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    if(soundFlag){
                        media = document.getElementById('audio-StartUp2');
                        media.volume = 0.3;
                        media.play();
                    }
                }, 6000);
                setTimeout(function () {
                    $('.cube div').removeClass('startup').removeClass('black');
                    $('#brain .word').text(text3);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    if(soundFlag){
                        media = document.getElementById('audio-StartUp3');
                        media.volume = 0.3;
                        media.play();
                    }
                }, 12000);
                setTimeout(function () {
                    talkCapacity = 0;
                    $('.interface').fadeIn();
                    $('.message').each(function (i, e) {
                        $(e).delay(i * 500).queue(function () {
                            $(this).addClass('show')
                        });
                    });
                }, 18000)
            }
        },2000)
    });


    //セリフキャンセル用変数
    var talkTimer1;
    var talkTimer2;

    //発言クリック時の発言
    $('#write').on('click', function () {
        pattern = getRandomInt(0, 3);
        if (pattern == 0) {
            var text1 = 'あなたの言葉は皆を導くことができる…';
            var text2 = '良い方にも悪い方にも。';
            media = document.getElementById('audio-Write-p1');
        } else if (pattern == 1) {
            var text1 = '楽しかったこと、辛かったこと…';
            var text2 = '他愛もない話が誰かの希望に。';
            media = document.getElementById('audio-Write-p2');
        } else {
            var text1 = '言葉が繋がりを生み出す…';
            var text2 = 'あなたの言葉を届けるのが私の役目…。';
            media = document.getElementById('audio-Write-p3');
        }
        if (talkCapacity == 0) {
            talkCapacity = 1;

            $('#brain .word').text(text1);
            $('.eachTextAnime').html(setAndroidText('#brain .word'));
            TextFadeInAnime();
            $('.cube div').addClass('talk');
            if(soundFlag){
                media.volume = 0.5;
                media.play();
            }
            talkTimer1 = setTimeout(function () {
                $('#brain .word').text(text2);
                $('.eachTextAnime').html(setAndroidText('#brain .word'));
                TextFadeInAnime();
            }, 6000);
            talkTimer2 = setTimeout(function () {
                talkCapacity = 0;
                $('.cube div').removeClass('talk');
            }, 12000);
        }

    });


    //メッセージリロード時の発言
    $(document).on('click','#messageReload', function () {
        pattern = getRandomInt(0, 3);
        if (pattern == 0) {
            var text1 = '発言を再読込します。';
            media = document.getElementById('audio-Reload-p1');
        } else if (pattern == 1) {
            var text1 = 'あなたに響く言葉はあるかしら…';
            media = document.getElementById('audio-Reload-p2');
        } else {
            var text1 = '言葉たちはあなたの返答を待っている…';
            media = document.getElementById('audio-Reload-p3');
        }
        if (talkCapacity == 0) {
            talkCapacity = 1;

            $('#brain .word').text(text1);
            $('.eachTextAnime').html(setAndroidText('#brain .word'));
            TextFadeInAnime();
            $('.cube div').addClass('talk');
            if(soundFlag){
                media.volume = 0.5;
                media.play();
            }
            talkTimer1 = setTimeout(function () {
                talkCapacity = 0;
                $('.cube div').removeClass('talk');
            }, 6000);
        }

    });


    //連鎖クリック時の発言
    $('#response').on('click', function () {
        var text1 = '貴方の言葉に反応はあるかしら…';
        if (talkCapacity == 0) {
            talkCapacity = 1;

            $('#brain .word').text(text1);
            $('.eachTextAnime').html(setAndroidText('#brain .word'));
            $('.cube div').addClass('talk');
            TextFadeInAnime();
            if(soundFlag){
                media = document.getElementById('audio-Response');
                media.volume = 0.5;
                media.play();
            }
            setTimeout(function () {
                talkCapacity = 0;
                $('.cube div').removeClass('talk');
            }, 6000);
        }
    });


     //影響クリック時の発言
     $('#effect').on('click', function () {
        pattern = getRandomInt(0, 3);
        if (pattern == 0) {
            var text1 = '言葉と感情は私たちに変化をもたらす…';
            media = document.getElementById('audio-Effect-p1');
        } else if (pattern == 1) {
            var text1 = '影響…それはあなたに限ったことではない';
            media = document.getElementById('audio-Effect-p2');
        } else {
            var text1 = 'この空間のデータを表示します。';
            media = document.getElementById('audio-Effect-p3');
        }
        if (talkCapacity == 0) {
            talkCapacity = 1;

            $('#brain .word').text(text1);
            $('.eachTextAnime').html(setAndroidText('#brain .word'));
            $('.cube div').addClass('talk');
            TextFadeInAnime();
            if(soundFlag){
                media.volume = 0.5;
                media.play();
            }
            setTimeout(function () {
                talkCapacity = 0;
                $('.cube div').removeClass('talk');
            }, 6000);
        }
    });


    //発言送信
    $('#sendMessage').on('click', function () {
        text = $('#id_text').val();
        clearInterval(talkTimer1)
        clearInterval(talkTimer2)
        $.ajax({
            //POST通信
            type: "post",
            //ここでデータの送信先URLを指定します。
            url: '/app/ajax/store_message/',
            dataType: "json",
            data: {
                text: text,
            },
        })
            //通信が成功したとき
            .then((res) => {
                if (res.code == 0) { // 保存成功
                    if (res.emotion == -3) {  // NegativeLevel2
                        text1 = '発險?を取得';
                        text2 = '縺ｨ…ても強い負の感情を?じる…';
                        text3 = '全て私に吐き出して。助け縺ｦくれる者が必ず居るから…';
                        className = 'NegaLvMax';
                        media = document.getElementById('audio-Nega3');
                    } else if (res.emotion == -2) {  // NegativeLevel1
                        text1 = '発言を取得';
                        text2 = 'この発言からは負の感情が読み取れる…';
                        text3 = 'きっとここに集う者たちがあなたに元気を与えてくれる。';
                        className = 'NegaLv2';
                        media = document.getElementById('audio-Nega2');
                    } else if (res.emotion == -1) {  // NegativeLevel1
                        text1 = '発言を取得';
                        text2 = 'この発言は少し暗いけど遠慮しないで聞かせて。';
                        text3 = '私は共感者を探すのが役目だもの…';
                        className = 'NegaLv1';
                        media = document.getElementById('audio-Nega1');
                    } else if (res.emotion == 0) {  // Newtral
                        text1 = '発言を取得';
                        text2 = '…私にはこの発言の意味が理解できないみたい。';
                        text3 = 'ただ、理解を示す者も居るはずよ。'
                        className = 'Newtral';
                        media = document.getElementById('audio-Newtral');
                    } else if (res.emotion == 1) {  // PositiveLevel1
                        text1 = '発言を取得';
                        text2 = 'なんだか明るい気分になる言葉…';
                        text3 = '同じ感情を抱く者同士繋がりが生まれますように…';
                        className = 'PosiLv1';
                        media = document.getElementById('audio-Posi1');
                    } else if (res.emotion == 2) {  // PositiveLevel1
                        text1 = '発言を取得';
                        text2 = '心温まるいい言葉ね…ありがとう。';
                        text3 = 'これからもあなたの発言に期待してるわ…。';
                        className = 'PosiLv2';
                        media = document.getElementById('audio-Posi2');
                    } else if (res.emotion == 3) {  // PositiveLevel2
                        text1 = '発言を取得';
                        text2 = 'とても素晴らしい発言をありがとう。';
                        text3 = 'あなたの言葉は幸せに満ちている…。';
                        className = 'PosiLvMax';
                        media = document.getElementById('audio-Posi3');
                    }

                    talkCapacity = 1;


                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass(className);
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    $('#id_text').val('');
                    if(soundFlag){
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        $('.cube div').removeClass(className);
                        $('#brain .word').text(text3);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 12000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('#sendMessage').prop('disabled',false).val('発言');
                    }, 18000)
                } else if (res.code == 1) { // GETメソッド
                    var text1 = 'エラー発生';
                    var text2 = 'ナビゲーターとの通信に失敗しました。';
                    talkCapacity = 1;

                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass('ptError');
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    if(soundFlag){
                        media = document.getElementById('audio-Error1');
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('.cube div').removeClass('ptError');
                        $('#sendMessage').prop('disabled',false).val('発言');
                    }, 12000);
                } else if (res.code == 2) { // 発言内容未入力
                    var text1 = 'エラー発生';
                    var text2 = '発言インターフェースに入力不備があります。';
                    talkCapacity = 1;

                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass('ptError');
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    if(soundFlag){
                        media = document.getElementById('audio-Error2');
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('.cube div').removeClass('ptError');
                        $('#sendMessage').prop('disabled',false).val('発言');
                    }, 12000);
                } else if (res.code == 3) { // 連携識別ID不正値
                    var text1 = 'エラー発生';
                    var text2 = '不正な値を検知しました。';
                    talkCapacity = 1;

                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass('ptError');
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    if(soundFlag){
                        media = document.getElementById('audio-Error3');
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('.cube div').removeClass('ptError');
                        $('#sendMessage').prop('disabled',false).val('発言');
                    }, 12000);
                }
                else if (res.code == 4) { // 不適切なワード
                    var text1 = '不適切な発言と診断';
                    var text2 = '…発言内容には気をつけて。';
                    talkCapacity = 1;

                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass('ptError');
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    if(soundFlag){
                        media = document.getElementById('audio-Error4');
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('.cube div').removeClass('ptError');
                        $('#sendMessage').prop('disabled',false).val('発言');
                    }, 12000);
                }
            })
            //通信が失敗したとき
            .fail((error) => {
                console.log(error.statusText);
            });
    })


    //　リプライ送信
    $('#chainMessage').on('click', function () {
        text = $('#id_reply').val();
        parent_id = $('#id_parent').val();
        last_id = $('#lastID').val();

        $('#details').removeClass('open');
        clearInterval(talkTimer1)
        clearInterval(talkTimer2)
        $.ajax({
            //POST通信
            type: "post",
            //ここでデータの送信先URLを指定します。
            url: '/app/ajax/store_reply/',
            dataType: "json",
            data: {
                text: text,
                parent: message_id,
                last_id: last_id,
            },
        })
            //通信が成功したとき
            .then((res) => {
                if (res.code == 0) { // 保存成功
                    if (res.emotion == -3) {  // NegativeLevel2
                        text1 = '発險?を取得';
                        text2 = '縺ｨ…ても強い負の感情を?じる…';
                        text3 = '全て私に吐き出して。助け縺ｦくれる者が必ず居るから…';
                        className = 'NegaLvMax';
                        media = document.getElementById('audio-Nega3');
                    } else if (res.emotion == -2) {  // NegativeLevel1
                        text1 = '発言を取得';
                        text2 = 'この発言からは負の感情が読み取れる…';
                        text3 = 'きっとここに集う者たちがあなたに元気を与えてくれる。';
                        className = 'NegaLv2';
                        media = document.getElementById('audio-Nega2');
                    } else if (res.emotion == -1) {  // NegativeLevel1
                        text1 = '発言を取得';
                        text2 = 'この発言は少し暗いけど遠慮しないで聞かせて。';
                        text3 = '私は共感者を探すのが役目だもの…';
                        className = 'NegaLv1';
                        media = document.getElementById('audio-Nega1');
                    } else if (res.emotion == 0) {  // Newtral
                        text1 = '発言を取得';
                        text2 = '…私にはこの発言の意味が理解できないみたい。';
                        text3 = 'ただ、理解を示す者も居るはずよ。'
                        className = 'Newtral';
                        media = document.getElementById('audio-Newtral');
                    } else if (res.emotion == 1) {  // PositiveLevel1
                        text1 = '発言を取得';
                        text2 = 'なんだか明るい気分になる言葉…';
                        text3 = '同じ感情を抱く者同士繋がりが生まれますように…';
                        className = 'PosiLv1';
                        media = document.getElementById('audio-Posi1');
                    } else if (res.emotion == 2) {  // PositiveLevel1
                        text1 = '発言を取得';
                        text2 = '心温まるいい言葉ね…ありがとう。';
                        text3 = 'これからもあなたの発言に期待してるわ…。';
                        className = 'PosiLv2';
                        media = document.getElementById('audio-Posi2');
                    } else if (res.emotion == 3) {  // PositiveLevel2
                        text1 = '発言を取得';
                        text2 = 'とても素晴らしい発言をありがとう。';
                        text3 = 'あなたの言葉は幸せに満ちている…。';
                        className = 'PosiLvMax';
                        media = document.getElementById('audio-Posi3');
                    }

                    talkCapacity = 1;


                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass(className);
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    $('#id_text').val('');
                    if(soundFlag){
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        $('.cube div').removeClass(className);
                        $('#brain .word').text(text3);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 12000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('#sendMessage').prop('disabled',false).val('発言');
                    }, 18000)
                } else if (res.code == 1) { // GETメソッド
                    var text1 = 'エラー発生';
                    var text2 = 'ナビゲーターとの通信に失敗しました。';
                    talkCapacity = 1;

                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass('ptError');
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    if(soundFlag){
                        media = document.getElementById('audio-Error1');
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('.cube div').removeClass('ptError');
                        $('#sendMessage').prop('disabled',false).val('発言');
                        $('#details').addClass('open');
                    }, 12000);
                } else if (res.code == 2) { // 返答内容未入力
                    var text1 = 'エラー発生';
                    var text2 = '返答インターフェースに入力不備があります。';
                    talkCapacity = 1;

                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass('ptError');
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    if(soundFlag){
                        media = document.getElementById('audio-Error2');
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('.cube div').removeClass('ptError');
                        $('#sendMessage').prop('disabled',false).val('発言');
                        $('#details').addClass('open');
                    }, 12000);
                } else if (res.code == 3) { // 連携識別ID不正値
                    var text1 = 'エラー発生';
                    var text2 = '不正な値を検知しました。';
                    talkCapacity = 1;

                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass('ptError');
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    if(soundFlag){
                        media = document.getElementById('audio-Error3');
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('.cube div').removeClass('ptError');
                        $('#sendMessage').prop('disabled',false).val('発言');
                        $('#details').addClass('open');
                    }, 12000);
                }
                else if (res.code == 4) { // 不適切なワード
                    var text1 = '不適切な発言と診断';
                    var text2 = '…発言内容には気をつけて。';
                    talkCapacity = 1;

                    $('#brain .word').text(text1);
                    $('.eachTextAnime').html(setAndroidText('#brain .word'));
                    TextFadeInAnime();
                    $('.cube div').addClass('ptError');
                    $('#sendMessage').prop('disabled',true).val('処理中');
                    if(soundFlag){
                        media = document.getElementById('audio-Error4');
                        media.volume = 0.5;
                        media.play();
                    }
                    setTimeout(function () {
                        $('#brain .word').text(text2);
                        $('.eachTextAnime').html(setAndroidText('#brain .word'));
                        TextFadeInAnime();
                    }, 6000);
                    setTimeout(function () {
                        talkCapacity = 0;
                        $('.cube div').removeClass('ptError');
                        $('#sendMessage').prop('disabled',false).val('発言');
                        $('#details').addClass('open');
                    }, 12000);
                }
            })
            //通信が失敗したとき
            .fail((error) => {
                console.log(error.statusText);
            });
    })


    // テキストフェードイン
    function TextFadeInAnime() {
        $('.eachTextAnime').each(function () {
            $(this).addClass("appeartext");
        });
    }

    // テキスト配置
    function setAndroidText(name) {
        var element = $(name)
        var textbox = "";
        element.each(function () {
            var text = $(this).text();
            text.split('').forEach(function (t, i) {
                if (t !== " ") {
                    if (i < 10) {
                        textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
                    } else {
                        var n = i / 10;
                        textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
                    }
                } else {
                    textbox += t;
                }
            });
        });
        return textbox;
    }
})