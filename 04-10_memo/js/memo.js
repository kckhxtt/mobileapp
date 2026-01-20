"use strict";

//ページ全体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {

        //1.localStorageが使えるか確認
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage(); //1.get data from LocalStroge
            saveLocalStorage(); //2.localStorageへの保存
            delLocalStorage(); //3.delete item1 from LocalStorage
            allClearLocalStorage();//4.clear all from LocalStorage
            selectTable();//5.select data
        }
    }, false
);

//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            //値の入力チェック  
            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app"
                    , html: "Key、Memoはいずれも必須です。"
                    , type: "error"
                    , allowOutsideClick: false
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存 (save) しますか？";
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    //確認ダイアログで「OK]を押されたとき保存する version-up1 add          
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );

}

//3 delete selected data from local storage //ver3
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");//version-up3 add
            const table1 = document.getElementById("table1");//version-up3 add
            let w_cnt = "0";//version-up3 chg w_sel->w_cnt
            w_cnt = selectCheckBox(del);//select data from table version-up2 chg selectRadioBtn->selectCheckBox

            if (w_cnt >= 1) {
                let w_confirm = "LocalStorageから選択されている" + w_cnt + "件を削除 (delete) しますか？"

                Swal.fire({
                    title: "Memo app"
                    , html: w_confirm
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage();
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除 (delete) しました。";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );

    //version-up5 add-str
 
        const table1 = document.getElementById("table1");
        table1.addEventListener("click", 
        function (e) {
          if (e.target.classList.contains("trash") === true) {
            let index = e.target.parentNode.parentNode.rowIndex;               
            const key = table1.rows[index].cells[1].firstChild.data;  
            const value = table1.rows[index].cells[2].firstChild.data;          
            let w_delete = "LocalStorageから\n「" + key + " " + value +  "」\nを削除 (delete) しますか？"
            Swal.fire({
               title: "Memo app"
              ,html: w_delete
              ,type: "question"
              ,showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = "LocalStorageから\n" + key + " " + value +  "\nを削除 (delete) しました!"
                Swal.fire({
                   title: "Memo app"
                  ,html: w_msg
                  ,type: "success"
                  ,allowOutsideClick: false
                });
      
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
              }
            });
          }
        });   
};//version-up5 add-end

//4.Clear All from LocalStorage
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = "LocalStorageのデータをすべて削除 (all clear) します。\nよろしいですか？"
            Swal.fire({
                title: "Memo app"
                , html: w_confirm
                , type: "question"
                , showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.clear();
                    viewStorage();

                    let w_msg = "LocalStorageのデータをすべて削除 (all clear) しました。";
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }, false
    );
};

//5.select data
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox(select);
        }, false
    );
};

//select data from table
function selectCheckBox(mode) {
    //let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = ""; //work version-up2 add
    let w_textMemo = ""; //work version-up2 add


    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
                //return w_sel = "1";
            }//version-up2 add
            w_cnt++;
        }
    }

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode.id === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo App"
                , html: "1つ選択 (select) してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }
    if (mode.id === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo App"
                , html: "1つ以上選択(select) してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }
};


//localStorageからの取得とテーブルへ表示
function viewStorage() {
    const list = document.getElementById("list");
    //htmlのテーブル初期化
    while (list.rows[0]) list.deleteRow(0);

    //localStorageすべての情報の取得
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        //localStorageのキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";

    }

    //jQueryのplugin tablesorterを使ってテーブルのソート
    //sortList:引数1...最初からソートしておく列を指定、引数2...0..昇順,1..降順
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    $("#table1").trigger("update");//tablesort add
}