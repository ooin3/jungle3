var loadData; //json파일의 정보를 담기위한 전역 변수


$(function () {
    // 첫 인트로 버튼 영역 실행
    introfn();

    // 인트로 버튼 클릭 이벤트 정의
    $(".btn_setting").click(function () {
        $(".section.box_intro").removeClass("on");
        ajaxfn()
        // $(".section.reservation").addClass("on");
    });

    // 자리선택 섹션의 완료 버튼 클릭 이벤트 정의 
    $(".btn_submit").click(function () {
        $(".section.reservation").removeClass("on");
        $(".section.complete").addClass("on");
        // 개발자가 서버에 내용 전달하는 과정을 담는 부분
    });
})

// 첫 인트로 버튼 영역
function introfn() {
    $(".section.box_intro").addClass("on");
}

// ajax를 통해 json파일 불러온 후 append로 자리 세팅하기 함수 정의
function ajaxfn() {
    $.ajax({
        url: "js/data.json",
        dataType: "json",
        success: function (result) {
            //변수 저장
            loadData = result.seatInfo;

            //자리세팅 (index(순번) : i - 0~11 )
            for (var i = 0; i < loadData.length; i++) {
                var _n = loadData[i].name;
                var _p = loadData[i].price;
                var _r = loadData[i].reserve;
                $(".section.reservation > ol").append('<li class="unit"><button data-price="' + _p + '" ' + _r + '>' + _n + '</button></li>')
                // console.log(_n, _p, _r);
            }

            // 자리 선택 섹션 노출 
            $(".section.reservation").addClass("on");

            // 배열 선언or초기화
            var selected = [];

            // 동적으로 셋팅된 버튼에 클릭 이벤트를 선언
            $(".section.reservation > ol > li > button").click(function () {
                // 배열 초기화
                selected = [];
                // 클릭을 하는 순간 자신에게 셀렉트 유무에 따라 select클래스를 추가or삭제처리
                $(this).toggleClass("select");


                //    자리 길이 만큼 for문 반복
                for (var i = 0; i < loadData.length; i++) {
                    //    각각 자리별 버튼에 select 클래스가 있는지 확인 후 있으면 true, 없으면 false
                    var _has = $(".section.reservation > ol > li").eq(i).find("button").hasClass("select")

                    // select클래스를 갖고 있다면 배일에 intex값 저장
                    if (_has == true) {
                        selected.push(i);
                    }
                    // true   
                    // console.log(i, _has);

                }
                var selectedSeat = ""; //선택자리명 저장용 변수 선언과 초기화
                var selectedCost = 0; //선택값 총합 저장용 변수 선언과 초기화

                // 저장된 인덱스를 활용한 하단 결과값 업데이트 
                for (var i = 0; i < selected.length; i++) {

                    var _si = selected[i]; //선택된 index값만 저장

                    // 선택자리 누적, 빈값에 빈값을 더하고 동시에 첫번째 선택된 자리에 이름을 넣어준다 그러면 첫번째 돌때는 값이 저장된다.
                    //자기자신에게 이전값과 새로운 값을 더함
                    // selectedSeat = selectedSeat + loadData[_si].name + " ";
                    selectedSeat += loadData[_si].name + " ";

                    // 총합 누적(자기 자신에게 이전값과 새로운 값을 더함)
                    selectedCost = selectedCost + Number(loadData[_si].price);
                    selectedCost += Number(loadData[_si].price);
                }

                // 선택정보를 html상 각 영역에 업데이트(text) 
                $(".txt_info_number").text(selectedSeat);
                $(".txt_info_total").text(selectedCost);
                // 최종 결과창의 선택정보를 html상 각 영역에 업데이트
                $(".section.complete .txt_number").text(selectedSeat);
                $(".section.complete .txt_price > strong").text(selectedCost);
            });
        }
    })
}
