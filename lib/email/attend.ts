export const attendTemplate = `
<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <title></title>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        th.column {
            padding: 0
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        @media (max-width:520px) {
            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }
        }

    </style>
</head>
<body style="background-color: #fff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
    style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff;" width="100%">
    <tbody>
        <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                    role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
                    <tbody>
                        <tr>
                            <td>
                                <table align="center" border="0" cellpadding="0" cellspacing="0"
                                    class="row-content stack" role="presentation"
                                    style="mso-table-lspace: 0; mso-table-rspace: 0;" width="500">
                                    <tbody>
                                        <tr>
                                            <th class="column"
                                                style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;"
                                                width="100%">
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    class="image_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                                    width="100%">
                                                    <tr>
                                                        <td style="width:100%; padding: 5px; text-align: center;">
                                                            <div style="line-height: 10px;">
                                                                <img height="150" width="150"
                                                                src="https://api.peduly.com/icon/icon/peduly_icon_new.png"
                                                                style="display: inline-block;" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    class="text_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;"
                                                    width="100%">
                                                    <tr>
                                                        <td
                                                            style="padding-top:32px;padding-right:10px;padding-bottom:24px;padding-left:10px;">
                                                            <div style="font-family: Arial, sans-serif">
                                                                <div
                                                                    style="font-size: 14px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000000; line-height: 1.2;">
                                                                    <p style="margin: 0;">Terima kasih
                                                                        <strong>{{ $nama_donatur }}</strong>,
                                                                    </p>
                                                                    <br>
                                                                    <p style="margin: 0;">Pemabayaran berhasil
                                                                        diterima untuk
                                                                        <strong>{{ $judul }} </strong>
                                                                    </p>
                                                                    <p
                                                                        style="margin: 0; mso-line-height-alt: 16.8px;">
                                                                        <br />
                                                                    </p>
                                                                    <p style="margin: 0;"><strong>Rincian
                                                                            Pembayaran:</strong></p>
                                                                    <p
                                                                        style="margin: 0; mso-line-height-alt: 16.8px;">
                                                                        <br />
                                                                    </p>
                                                                    <p
                                                                        style="margin: 0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px 15px;">
                                                                        <span
                                                                            style="display: inline-block; width: 50%;">Nominal:</span>
                                                                        <span
                                                                            style="display: inline-block; text-align: right;">Rp
                                                                            {{ number_format(floatval(str_replace(',', '', $nominal)), 0, ',', '.') }},00</span>
                                                                    </p>
                                                                    <p
                                                                        style="margin: 0; border-bottom: 1px solid #ccc; padding: 10px 15px;">
                                                                        <span
                                                                            style="display: inline-block; width: 50%;">Metode
                                                                            pembayaran:</span>
                                                                        <span
                                                                            style="display: inline-block; text-align: right;">{{ strtoupper($metode) }}</span>
                                                                    </p>
                                                                </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="10" cellspacing="0"
                                                    class="divider_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                                    width="100%">
                                                    <tr>
                                                        <td>
                                                            <div align="center">
                                                                <table border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td class="divider_inner"
                                                                            style="font-size: 1px; line-height: 1px;">
                                                                            <span></span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    class="text_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;"
                                                    width="100%">
                                                    <tr>
                                                        <td
                                                            style="padding-top:10px;padding-right:10px;padding-bottom:26px;padding-left:10px;">
                                                            <div style="font-family: Arial, sans-serif">
                                                                <div
                                                                    style="font-size: 14px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000000; line-height: 1.2;">
                                                                    <p style="margin: 0;"><span
                                                                            style="font-size:14px;">Silahkan join
                                                                            grup whatsapp dengan klik tombol dibawah
                                                                            ini untuk informasi lebih lanjut </span>
                                                                    </p>
                                                                </div>
                                                                <a href={{ $tautan }}>
                                                                    <button class="button"
                                                                        style="background-color: #c51230; color: #fff; padding: 10px 20px; cursor: pointer; border: none; border-radius: 20px; width: 100%; padding: 10px 15px; margin-top: 10px">Masuk
                                                                        Grub WA</button>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    class="text_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;"
                                                    width="100%">
                                                    <tr>
                                                        <td
                                                            style="padding-top:10px;padding-right:10px;padding-bottom:26px;padding-left:10px;">
                                                            <div style="font-family: Arial, sans-serif">
                                                                <div
                                                                    style="font-size: 14px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #717171; line-height: 1.2;">
                                                                    <p style="margin: 0; font-size: 14px;"><span
                                                                            style="font-size:12px;">Email dibuat
                                                                            otomatis. Mohon tidak mengirimkan
                                                                            balasan ke email ini. Jika membutuhkan
                                                                            bantuan silahkan hubungi <a
                                                                                href="https://peduly.com/kontak"
                                                                                rel="noopener"
                                                                                style="text-decoration: underline; color: #c51230;"
                                                                                target="_blank">Kontak
                                                                                Kami</a>. </span></p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="10" cellspacing="0"
                                                    class="text_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;"
                                                    width="100%">
                                                    <tr>
                                                        <td>
                                                            <div style="font-family: Arial, sans-serif">
                                                                <div
                                                                    style="font-size: 14px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #717171; line-height: 1.2;">
                                                                    <p style="margin: 0; text-align: center;">Ikuti
                                                                        kami</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="10" cellspacing="0"
                                                    class="social_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                                    width="100%">
                                                    <tr>
                                                        <td>
                                                            <table align="center" border="0" cellpadding="0"
                                                                cellspacing="0" class="social-table"
                                                                role="presentation"
                                                                style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                width="20px">
                                                                <tr>
                                                                    <td style="padding:0 2px 0 2px;"><a
                                                                        href="https://x.com/peduly_id"
                                                                        target="_blank"><img alt="Twitter"
                                                                            height="32"
                                                                            src="https://api.peduly.com/icon/icon/email/twitter2x.png"
                                                                            style="display: block; height: auto; border: 0;"
                                                                            title="Twitter"
                                                                            width="32" /></a>
                                                                </td>
                                                                <td style="padding:0 2px 0 2px;"><a
                                                                        href="https://www.instagram.com/peduly_id/"
                                                                        target="_blank"><img alt="Instagram"
                                                                            height="32"
                                                                            src="https://api.peduly.com/icon/icon/email/instagram2x.png"
                                                                            style="display: block; height: auto; border: 0;"
                                                                            title="Instagram"
                                                                            width="32" /></a>
                                                                </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="10" cellspacing="0"
                                                    class="divider_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                                    width="100%">
                                                    <tr>
                                                        <td>
                                                            <div align="center">
                                                                <table border="0" cellpadding="0"
                                                                    cellspacing="0" role="presentation"
                                                                    style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td class="divider_inner"
                                                                            style="font-size: 1px; line-height: 1px; border-top: 1px solid #C4C4C4;">
                                                                            <span></span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    class="text_block" role="presentation"
                                                    style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;"
                                                    width="100%">
                                                    <tr>
                                                        <td
                                                            style="padding-top:10px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
                                                            <div style="font-family: sans-serif">
                                                                <div
                                                                    style="font-size: 14px; color: #717171; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                    <p
                                                                        style="margin: 0; font-size: 14px; text-align: center;">
                                                                        <span style="font-size:12px;">© 2022-2024
                                                                            Peduly. All Right
                                                                            Reserved</span><br /><span
                                                                            style="font-size:12px;">Gedung Siola,
                                                                            Koridor Co-working Space, Jl. Tunjungan
                                                                            No.1, Kec. Genteng, Kota SBY, Jawa Timur
                                                                            60275</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </td>
        </tr>
    </tbody>
</table><!-- End -->
</body>`;
