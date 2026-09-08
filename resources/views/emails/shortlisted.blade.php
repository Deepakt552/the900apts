<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Shortlisted for Interview</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px 0;">
        <tr>
            <td align="center">

                <table width="650" cellpadding="0" cellspacing="0"
                    style="background:#ffffff;border-radius:8px;overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background:#16a34a;padding:25px;text-align:center;">
                            <h1 style="margin:0;color:#ffffff;font-size:28px;">
                                Congratulations!
                            </h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:35px;">

                            <p style="font-size:16px;color:#333;">
                                Dear <strong>{{ $send_data['full_name'] ?? 'Candidate' }}</strong>,
                            </p>

                            <p style="font-size:15px;color:#555;line-height:1.8;">
                                We are pleased to inform you that your application for the position of
                                <strong>{{ $job_title }}</strong>
                                has been <strong style="color:#16a34a;">shortlisted</strong>.
                            </p>

                            <p style="font-size:15px;color:#555;line-height:1.8;">
                                After reviewing your qualifications and experience, we believe your profile is a
                                strong match for our requirements.
                            </p>

                            <table width="100%" cellpadding="8" cellspacing="0"
                                style="border:1px solid #e5e7eb;border-collapse:collapse;margin:25px 0;">
                                <!-- <tr style="background:#f8fafc;">
                                    <td width="180"><strong>Application ID</strong></td>
                                    <td>{{ $send_data['application_id'] ?? '-' }}</td>
                                </tr> -->
                                <tr>
                                    <td><strong>Job Position</strong></td>
                                    <td>{{ $job_title }}</td>
                                </tr>
                                <tr style="background:#f8fafc;">
                                    <td><strong>Name</strong></td>
                                    <td>{{ $send_data['full_name'] ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email</strong></td>
                                    <td>{{ $send_data['email'] ?? '-' }}</td>
                                </tr>
                                <tr style="background:#f8fafc;">
                                    <td><strong>Phone</strong></td>
                                    <td>{{ $send_data['phone'] ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Applied On</strong></td>
                                    <td>{{ $send_data['applied_at'] ?? '-' }}</td>
                                </tr>
                            </table>

                            <p style="font-size:15px;color:#555;line-height:1.8;">
                                Our recruitment team will contact you soon regarding the next stage of the hiring
                                process, which may include an interview and further assessment.
                            </p>

                            <p style="font-size:15px;color:#555;line-height:1.8;">
                                Please keep an eye on your email and phone for further communication.
                            </p>

                            <p style="font-size:15px;color:#555;">
                                We appreciate your interest in joining our team and wish you the best of luck.
                            </p>

                            <br>

                            <p style="margin:0;color:#333;">
                                Best Regards,
                            </p>

                            <p style="margin-top:5px;font-weight:bold;color:#16a34a;">
                                HR Recruitment Team
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f8fafc;padding:20px;text-align:center;font-size:13px;color:#777;">
                            This is an automated email. Please do not reply directly to this message.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>