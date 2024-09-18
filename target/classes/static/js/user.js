var ctx = $("#ctx").val();
$(function () {
    // 查询第一页数据
    getPage(1);
    // 新增
    $("#add").click(function () {
        reset();
        $('#modify').modal('show');
    });

    // 搜索
    $("#search").click(function () {
        getPage(1);
    });

    // 回车触发查询
    $("#username").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#search").trigger("click");
        }
    });
});

// 获取指定页码的数据
function getPage(pageNo) {
    var dataRow = "";
    $.ajax({
            url: ctx + "/user/list",
            type: "post",
            data: {
                "username": $("#username").val(),
                "pageNo": pageNo
            },
            dataType: "json",
            success: function (response) {
                dataRow = "";
                if (response.data.records.length > 0) {
                    $.each(response.data.records, function (i, r) {
                        dataRow += '<tr>'
                            + '<td>'
                            + r.username
                            + '</td>'
                            + '<td>'
                            + r.email
                            + '</td><td>'
                            + r.truename + '</td>'
                        ;

                        dataRow += '<td>' + new Date(r.createTime).Format("yyyy-MM-dd hh:mm:ss") + '</td><td><a href="javascript:remove(' + r.id + ')" style="color: #CA0C16;">删除' +
                            '</a>&nbsp;&nbsp;<a href="javascript:edit(' + r.id + ')">编辑</a></td></tr>';
                    });
                }

                // console.log(dataRow);
                $("#dataTable tbody").empty();
                $("#dataTable tbody").append(dataRow);
                // 分页按钮
                var element = $('#pageButton');
                var options = {
                    bootstrapMajorVersion: 4,
                    currentPage: pageNo, // 当前页数
                    numberOfPages: 5, // 显示按钮的数量
                    totalPages: response.data.pages, // 总页数
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    // 点击事件，用于通过Ajax来刷新整个list列表
                    onPageClicked: function (event, originalEvent, type, page) {
                        getPage(page);
                    }
                };

                element.bootstrapPaginator(options);
            }
        }
    )
}

//删除
function remove(id) {
        if (confirm("确定删除数据？")) {
            $.ajax({
                type: "POST",
                url: ctx + "/user/remove",
                traditional: true,
                data: {
                    id: id
                },
                success: function (data) {
                    getPage(1);
                },
                error: function (e) {
                    //alert("ERROR: ", e);
                    console.log("ERROR: ", e);
                }
            });
        }
}
//发起修改
function edit(id) {
        $.ajax({
            url: ctx + "/user/" + id,
            type: "GET",
            success: function (result) {
                if (result.success) {
                    //向模态框中传值
                    $('#m_id').val(id);
                    $('#m_username').val(result.data.username);
                    $('#m_password').val(result.data.password);
                    $('#m_email').val(result.data.email);
                    $('#m_truename').val(result.data.truename);
                } else {
                    alert(result.data.message);
                }
            }
        });

        $('#modify').modal('show');
}

//提交修改
function modify() {
    //获取模态框数据
        var id = $("#m_id").val();
        var username = $("#m_username").val();
        var password = $("#m_password").val();
        var email = $("#m_email").val();
        var truename = $("#m_truename").val();

        var param = {"id": id, username: username, password:password, email: email, truename: truename};

        $.ajax({
            url: ctx + "/user/modify",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                if (data.success) {
                    // 清空表单
                    reset();
                    $('#modify').modal('hide');
                    getPage(1);
                } else {
                    alert(data.message);
                }
            }
        });
}

//所有表单清空
function reset() {
        $("#m_id").val("");
        $("#m_username").val("");
        $("#m_password").val("");
        $("#m_email").val("");
        $("#m_truename").val("");
}