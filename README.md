# UWC 2.0

Đây là bài tập lớn nhóm "7 con quỷ" - môn Công nghệ phần mềm HK221.

> Lưu ý:
>
> Yêu cầu mọi người đọc tất cả hướng dẫn sau.
>
> Mọi sự không tuân thủ sẽ bị chỉ trích công khai

# Đối với nhóm dev (cả Frontend lẫn Backend)

## Yêu cầu hệ thống:

Cần đảm bảo các yêu cầu sau:

1. Đã cài đặt NodeJS (khuyến khích sử dụng phiên bản v16.18.0 để dễ dàng hỗ trợ sửa lỗi)
2. Đã cài đặt Docker (khuyến khích sử dụng bản mới nhất)
3. Đã cài đặt Git

## Setup môi trường dev

Clone dự án này về bằng câu lệnh:

```shell
git clone https://github.com/ducthuy-ng/uwc2
```

Sau khi clone dự án về, ta chạy câu lệnh sau để cài đặt môi trường:

```shell
npm run setup-dev
```

> Lưu ý:
>
> KHÔNG CHẠY câu lệnh: `npm install --save-dev`
>
> Vì việc cài đặt đã được tích hợp vào câu lệnh trên.

## Bắt đầu lập trình

> Lưu ý:
>
> Cần đảm bảo port (cổng) 3000 đang không sử dụng

Mỗi khi muốn bắt đầu lập trình, ta chạy câu lệnh:

```shell
npm run dev
```

Hệ thống sẽ tự động khởi tạo CSDL cần thiết và server.
Lúc này, terminal của các bạn sẽ hiện thị các dòng log của server.
Các bạn TUYỆT ĐỐI không được thao tác gì trên log này.

## Kết thúc lập trình

Nếu các bạn muốn ngừng làm việc:

1. Nhấn nút `Ctrl + C` để ngưng server đang chạy
2. Chạy câu lệnh sau:

```shell
npm run stop-dev
```

## Git - lấy những cập nhật mới nhất

Để có thể lấy được những cập nhật mới nhất, chạy câu lệnh:

```shell
git fetch
```

## Git - Tạo nhánh mới

Mỗi khi nhận công việc, các bạn làm thao tác sau:

```shell
git checkout main

git fetch
git pull

git checkout -b dev/<tên tính năng>
```

## Git - Commit code (làm mỗi ngày):

Mỗi cuối ngày, các bạn phải commit code để mình check tiến độ.
Việc commit bao gồm 2 thao tác sau:
gi
```shell
git add .
git commit -m "<Tin nhắn của các bạn>"
```
