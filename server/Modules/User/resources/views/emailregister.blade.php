<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Email</title>
    <style>
        .content {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        .wrap-content {
            display: block;
        }

        .header {
            margin: 30px 0;
        }

        .header p {
            font-size: 15px;
            color: rgb(76, 75, 75);
        }

        .btn {
            background-color: #2b1dee;  
            color: white;
            font-size: 15px;
            font-weight: 700;
            padding: 8px 15px 10px 15px;
            border-radius: 10px;
            text-transform: uppercase;
            text-decoration: none;
        }

        .logo {
            text-align: center;
            text-transform: uppercase;
        }

        footer {
            text-align: center;
            margin-top: 50px;
            color: rgb(75, 71, 71);
        }
    </style>
</head>
<body>
    <div class="content">
        <div class="wrap-content">
            <p class="logo">Disini Logo Aplikasi</p>
        <div class="header">
            <p >
                Selamat Datang <strong>{{ $users->email }}</strong> di <strong>UMKM DIGITAL</strong>, Senang anda bisa bergabung di platform kami.
                Sebelum anda bisa bergabung, silahkan klik tombol di bawah ini untuk aktivasi akun anda. Terima kasih
            </p>
        </div>
        <a class="btn" href={{ 'http://127.0.0.1:8000/user/email/activate/' . $token }}>Aktivasi Akun</a>
        </div>
    </div>
    <footer>
        <p style="font-size: 13px;">Powered by <strong>UMKM DIGITAL</strong></p>
    </footer>
</body>
</html>