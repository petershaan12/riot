export const deleteTemplate = `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
	 <style>
        body {
            background-color: #fff;
            font-family: 'Open Sans', Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
        }
        .text {
            font-size: 14px;
            color: #000;
            line-height: 1.5;
        }
        .button {
            background-color: #cbff37;
            color: #000000;
            font-weight: bold;
            padding: 10px 20px;
            cursor: pointer;
            border: none;
            border-radius: 20px;
            width: 40%;
            margin-top: 10px;
            text-decoration: none;
            display: inline-block;
            text-decoration: none;
        }
        .footer-text {
            font-size: 12px;
            color: #717171;
            line-height: 1.5;
            margin-top: 20px;
        }
        .social-icons img {
            vertical-align: middle;
            margin: 0 5px;
        }
        .social-icons a {
            text-decoration: none;
            color: #000;
        }
        hr {
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://raw.githubusercontent.com/petershaan12/riot/2b0c9b6c9745efc08f512d5b37efcd05b2f9e56b/public/assets/images/riot_white.png" alt="Riot Logo" height="150" width="150" />
        <p class="text">Mohon Maaf  <strong> {{name}}</strong>,</p>
        <p class="text">Anda telah dihapus dari event <strong>{{judul}}</strong>.</p>
        <p class="footer-text">Email ini dibuat otomatis. Mohon tidak mengirimkan balasan ke email ini. Jika membutuhkan bantuan, silahkan hubungi <a href="https://riot.com/kontak" target="_blank" style="text-decoration: underline; color: #cbff37;">Kontak Kami</a>.</p>
        <p class="footer-text">Ikuti kami di:</p>
        <div class="social-icons" style="margin: 10px 0;">
            
            <a href="https://www.facebook.com/riot.indonesia/" target="_blank" >
                <img src="https://raw.githubusercontent.com/petershaan12/riot/main/public/assets/icons/fb.png" alt="Instagram" width="10px" />
            </a>
            <a href="https://www.twitter.com/riot.indonesia/" target="_blank">
                <img src="https://raw.githubusercontent.com/petershaan12/riot/main/public/assets/icons/twitter.png" alt="Instagram" width="13px" />
            </a>
            <a href="https://www.instagram.com/riot.indonesia/" target="_blank">
                <img src="https://raw.githubusercontent.com/petershaan12/riot/main/public/assets/icons/ig.png" alt="Instagram" width="16px" />
            </a>
            <a href="https://www.tiktok.com/riot.indonesia/" target="_blank">
                <img src="https://raw.githubusercontent.com/petershaan12/riot/main/public/assets/icons/tiktok.png" alt="Instagram" height="15" />
            </a>
          
        </div>
        <hr />
    </div>
</body>
</html>
`;
